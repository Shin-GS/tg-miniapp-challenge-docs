/**
 * QA Test Checklist Renderer (통합 뷰어)
 * test-manifest.js의 카테고리/기능 드롭다운 → 선택 시 해당 .js 동적 로드 → 체크리스트 렌더링
 * URL hash로 상태 유지 (새로고침/공유 가능): index.html#admin/admin-login.js
 * 체크 상태는 localStorage에 저장
 */

(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var app = document.getElementById('app');
  var manifest = window.__TEST_MANIFEST__;

  if (!manifest) {
    app.innerHTML = '<div style="text-align:center;padding:40px;color:#ef4444;"><h2>매니페스트 없음</h2><p>window.__TEST_MANIFEST__가 정의되지 않았습니다.</p></div>';
    return;
  }

  var currentCategory = null;
  var currentFile = null;
  var currentFilter = 'all';
  var loadedScript = null;

  // --- Hash Routing ---

  function parseHash() {
    var hash = location.hash.replace(/^#/, '');
    if (!hash) return { category: null, file: null };

    // hash 형태: "admin/admin-login.js" → category=admin, file=admin/admin-login.js
    var parts = hash.split('/');
    if (parts.length < 2) return { category: parts[0], file: null };

    var category = parts[0];
    // manifest에서 해당 카테고리 존재 확인
    if (!manifest[category]) return { category: null, file: null };

    var file = hash; // 전체 hash가 file 경로
    // manifest에서 해당 file 존재 확인
    var found = false;
    manifest[category].items.forEach(function (item) {
      if (item.file === file) found = true;
    });

    return { category: category, file: found ? file : null };
  }

  function updateHash() {
    if (currentFile) {
      history.replaceState(null, '', '#' + currentFile);
    } else if (currentCategory) {
      history.replaceState(null, '', '#' + currentCategory);
    } else {
      history.replaceState(null, '', location.pathname);
    }
  }

  function restoreFromHash() {
    var parsed = parseHash();
    currentCategory = parsed.category;
    currentFile = parsed.file;
    // 기본값: miniapp 카테고리
    if (!currentCategory) {
      currentCategory = 'miniapp';
    }
  }

  // --- Navigation ---

  function renderNav() {
    var categories = Object.keys(manifest);
    var html = '<div class="nav-container">';
    html += '<div class="nav-header"><a href="../index.html" class="back-link">← Docs Hub</a><h1>QA Test Checklist</h1></div>';
    html += '<div class="nav-selects">';

    // Category dropdown
    html += '<select id="category-select" class="nav-select">';
    html += '<option value="">— Category —</option>';
    categories.forEach(function (key) {
      var selected = key === currentCategory ? ' selected' : '';
      html += '<option value="' + key + '"' + selected + '>' + manifest[key].label + '</option>';
    });
    html += '</select>';

    // Feature dropdown
    html += '<select id="feature-select" class="nav-select"' + (!currentCategory ? ' disabled' : '') + '>';
    html += '<option value="">— Feature —</option>';
    if (currentCategory && manifest[currentCategory]) {
      manifest[currentCategory].items.forEach(function (item) {
        var selected = item.file === currentFile ? ' selected' : '';
        html += '<option value="' + item.file + '"' + selected + '>' + item.feature + '</option>';
      });
    }
    html += '</select>';

    html += '</div></div>';
    nav.innerHTML = html;

    document.getElementById('category-select').addEventListener('change', function (e) {
      currentCategory = e.target.value || null;
      currentFile = null;
      currentFilter = 'all';
      updateHash();
      renderNav();
      renderContent();
    });

    document.getElementById('feature-select').addEventListener('change', function (e) {
      currentFile = e.target.value || null;
      currentFilter = 'all';
      updateHash();
      if (currentFile) {
        loadTestData(currentFile);
      } else {
        renderContent();
      }
    });
  }

  // --- Dynamic Script Loading ---

  function loadTestData(file) {
    // 이전 스크립트 제거
    if (loadedScript && loadedScript.parentNode) {
      loadedScript.parentNode.removeChild(loadedScript);
    }
    window.__TEST_DATA__ = null;

    var script = document.createElement('script');
    script.src = file;
    script.onload = function () {
      loadedScript = script;
      renderContent();
    };
    script.onerror = function () {
      app.innerHTML = '<div style="text-align:center;padding:40px;color:#ef4444;"><h2>로드 실패</h2><p>' + file + ' 파일을 불러올 수 없습니다.</p></div>';
    };
    document.body.appendChild(script);
  }

  // --- Content ---

  function renderContent() {
    var testData = window.__TEST_DATA__;
    if (!currentCategory) {
      app.innerHTML = '<div class="empty-state"><p>카테고리를 선택하세요.</p></div>';
      return;
    }
    if (!currentFile) {
      app.innerHTML = '<div class="empty-state"><p>기능을 선택하세요.</p></div>';
      return;
    }
    if (!testData) {
      app.innerHTML = '<div class="empty-state"><p>데이터를 불러오는 중...</p></div>';
      return;
    }
    renderChecklist(testData);
  }

  // --- State Management ---

  function loadStates(screen) {
    try {
      return JSON.parse(localStorage.getItem('qa-test-state:' + screen)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveStates(screen, states) {
    localStorage.setItem('qa-test-state:' + screen, JSON.stringify(states));
  }

  // --- Checklist Render ---

  function renderChecklist(testData) {
    var states = loadStates(testData.screen);

    function getState(id) {
      return states[id] || 'pending';
    }

    function setState(id, status) {
      if (status === 'pending') {
        delete states[id];
      } else {
        states[id] = status;
      }
      saveStates(testData.screen, states);
      renderChecklist(testData);
    }

    function resetAll() {
      if (confirm('모든 체크 상태를 초기화하시겠습니까?')) {
        states = {};
        saveStates(testData.screen, states);
        renderChecklist(testData);
      }
    }

    // Stats
    var total = testData.cases.length;
    var pass = 0, fail = 0, skip = 0;
    testData.cases.forEach(function (c) {
      var s = getState(c.id);
      if (s === 'pass') pass++;
      else if (s === 'fail') fail++;
      else if (s === 'skip') skip++;
    });
    var pending = total - pass - fail - skip;

    // Filter
    function filterCases(cases) {
      if (currentFilter === 'all') return cases;
      if (currentFilter === 'normal') return cases.filter(function (c) { return c.type === 'normal'; });
      if (currentFilter === 'exception') return cases.filter(function (c) { return c.type === 'exception'; });
      if (currentFilter === 'regression') return cases.filter(function (c) { return c.regression; });
      if (currentFilter === 'pending') return cases.filter(function (c) { return getState(c.id) === 'pending'; });
      if (currentFilter === 'fail') return cases.filter(function (c) { return getState(c.id) === 'fail'; });
      return cases;
    }

    var filteredCases = filterCases(testData.cases);
    var normalCases = filteredCases.filter(function (c) { return c.type === 'normal'; });
    var exceptionCases = filteredCases.filter(function (c) { return c.type === 'exception'; });

    // Build HTML
    var html = '';

    // Header
    html += '<div class="test-header">';
    html += '<h1>' + testData.feature + '</h1>';
    html += '<div class="test-meta">';
    html += '<span class="priority-badge priority-' + testData.priority + '">' + testData.priority + '</span>';
    html += '<span>마지막 업데이트: ' + testData.lastUpdated + '</span>';
    html += '<span>화면: ' + testData.screen + '</span>';
    html += '</div></div>';

    // Progress
    var passWidth = (pass / total * 100).toFixed(1);
    var failWidth = (fail / total * 100).toFixed(1);
    var skipWidth = (skip / total * 100).toFixed(1);
    html += '<div class="progress-container">';
    html += '<div class="progress-stats"><span>진행률: ' + (pass + fail + skip) + '/' + total + '</span>';
    html += '<span><span style="color:var(--color-pass)">✓ ' + pass + '</span> · <span style="color:var(--color-fail)">✗ ' + fail + '</span> · <span style="color:var(--color-skip)">⊘ ' + skip + '</span> · <span style="color:var(--color-pending)">○ ' + pending + '</span></span></div>';
    html += '<div class="progress-bar"><div class="progress-pass" style="width:' + passWidth + '%"></div><div class="progress-fail" style="width:' + failWidth + '%"></div><div class="progress-skip" style="width:' + skipWidth + '%"></div></div></div>';

    // Controls
    var filters = [
      { key: 'all', label: '전체' },
      { key: 'normal', label: '정상' },
      { key: 'exception', label: '예외' },
      { key: 'regression', label: '회귀' },
      { key: 'pending', label: '미완료' },
      { key: 'fail', label: '실패만' }
    ];
    html += '<div class="controls">';
    filters.forEach(function (f) {
      html += '<button class="btn ' + (currentFilter === f.key ? 'btn-active' : '') + '" data-filter="' + f.key + '">' + f.label + '</button>';
    });
    html += '<button class="btn btn-reset" data-action="reset">Reset All</button>';
    html += '</div>';

    // Sections
    if (normalCases.length > 0) {
      html += '<div class="test-section"><h2>정상 케이스 (' + normalCases.length + ')</h2>';
      normalCases.forEach(function (c) { html += renderItem(c, getState(c.id)); });
      html += '</div>';
    }
    if (exceptionCases.length > 0) {
      html += '<div class="test-section"><h2>예외 케이스 (' + exceptionCases.length + ')</h2>';
      exceptionCases.forEach(function (c) { html += renderItem(c, getState(c.id)); });
      html += '</div>';
    }
    if (filteredCases.length === 0) {
      html += '<p style="text-align:center;color:#6b7280;padding:40px;">필터 조건에 맞는 항목이 없습니다.</p>';
    }

    app.innerHTML = html;

    // Bind events
    app.querySelectorAll('.status-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var id = e.target.dataset.id;
        var status = e.target.dataset.status;
        var current = getState(id);
        setState(id, current === status ? 'pending' : status);
      });
    });

    app.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        currentFilter = e.target.dataset.filter;
        renderChecklist(testData);
      });
    });

    var resetBtn = app.querySelector('[data-action="reset"]');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetAll);
    }
  }

  function renderItem(testCase, state) {
    var statusClass = state !== 'pending' ? 'status-' + state : '';
    return '<div class="test-item ' + statusClass + '" data-id="' + testCase.id + '">' +
      '<div class="test-item-header">' +
        '<span class="test-id">' + testCase.id + '</span>' +
        '<span class="test-scenario">' + testCase.scenario + '</span>' +
        (testCase.regression ? '<span class="regression-badge">REGRESSION</span>' : '') +
        '<div class="status-toggle">' +
          '<button class="status-btn ' + (state === 'pass' ? 'active-pass' : '') + '" data-id="' + testCase.id + '" data-status="pass">Pass</button>' +
          '<button class="status-btn ' + (state === 'fail' ? 'active-fail' : '') + '" data-id="' + testCase.id + '" data-status="fail">Fail</button>' +
          '<button class="status-btn ' + (state === 'skip' ? 'active-skip' : '') + '" data-id="' + testCase.id + '" data-status="skip">Skip</button>' +
        '</div>' +
      '</div>' +
      '<dl class="test-details">' +
        '<dt>전제 조건</dt><dd>' + testCase.precondition + '</dd>' +
        '<dt>조작</dt><dd>' + testCase.action + '</dd>' +
        '<dt>기대 결과</dt><dd>' + testCase.expected + '</dd>' +
        '<dt>DB 확인</dt><dd><code class="db-check">' + testCase.dbCheck + '</code></dd>' +
        (testCase.regression && testCase.regressionNote ? '<dt>회귀 메모</dt><dd>' + testCase.regressionNote + '</dd>' : '') +
      '</dl>' +
    '</div>';
  }

  // --- Hash Change Listener ---

  window.addEventListener('hashchange', function () {
    restoreFromHash();
    currentFilter = 'all';
    renderNav();
    if (currentFile) {
      loadTestData(currentFile);
    } else {
      renderContent();
    }
  });

  // --- Init ---
  restoreFromHash();
  renderNav();
  if (currentFile) {
    loadTestData(currentFile);
  } else {
    renderContent();
  }
})();
