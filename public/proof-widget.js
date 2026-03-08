(function() {
  'use strict';

  var PROOF_API = 'https://proof.show';

  function createWidget(el) {
    var proofId = el.getAttribute('data-proof-id');
    if (!proofId) return;

    var theme = el.getAttribute('data-theme') || 'dark';
    var size = el.getAttribute('data-size') || 'default';

    var isDark = theme === 'dark';
    var isCompact = size === 'compact';

    var bg = isDark ? '#111827' : '#f8fafc';
    var border = isDark ? '#1E2A3A' : '#e2e8f0';
    var text = isDark ? '#fff' : '#1e293b';
    var muted = isDark ? '#94A3B8' : '#64748b';
    var accent = '#007AFF';
    var successBg = isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)';
    var successColor = '#10B981';
    var dangerBg = isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)';
    var dangerColor = '#EF4444';

    var container = document.createElement('div');
    container.style.cssText = 'font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;background:' + bg + ';border:1px solid ' + border + ';border-radius:12px;padding:' + (isCompact ? '12px 16px' : '20px 24px') + ';display:inline-flex;align-items:center;gap:' + (isCompact ? '10px' : '14px') + ';cursor:pointer;transition:border-color 0.2s;max-width:100%;';

    var shield = document.createElement('div');
    shield.style.cssText = 'width:' + (isCompact ? '32px' : '40px') + ';height:' + (isCompact ? '32px' : '40px') + ';border-radius:' + (isCompact ? '8px' : '10px') + ';background:rgba(0,122,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;';
    shield.innerHTML = '<svg width="' + (isCompact ? '16' : '20') + '" height="' + (isCompact ? '16' : '20') + '" viewBox="0 0 24 24" fill="none" stroke="' + accent + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';

    var content = document.createElement('div');
    content.style.cssText = 'flex:1;min-width:0;';

    var label = document.createElement('div');
    label.style.cssText = 'font-size:' + (isCompact ? '11px' : '12px') + ';font-weight:600;color:' + muted + ';text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;';
    label.textContent = 'Proof.show Verified';

    var key = document.createElement('div');
    key.style.cssText = 'font-size:' + (isCompact ? '13px' : '15px') + ';font-weight:700;color:' + accent + ';font-family:"SF Mono","Fira Code",monospace;letter-spacing:2px;';
    key.textContent = proofId;

    content.appendChild(label);
    content.appendChild(key);

    var btn = document.createElement('div');
    btn.style.cssText = 'font-size:' + (isCompact ? '11px' : '13px') + ';font-weight:600;color:#fff;background:' + accent + ';padding:' + (isCompact ? '6px 12px' : '8px 16px') + ';border-radius:8px;white-space:nowrap;flex-shrink:0;';
    btn.textContent = 'Click to Verify';

    var result = document.createElement('div');
    result.style.cssText = 'display:none;margin-top:12px;padding:12px 16px;border-radius:8px;font-size:13px;line-height:1.5;';

    container.appendChild(shield);
    container.appendChild(content);
    container.appendChild(btn);

    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:inline-block;max-width:100%;';
    wrapper.appendChild(container);
    wrapper.appendChild(result);

    container.addEventListener('mouseenter', function() {
      container.style.borderColor = accent;
    });
    container.addEventListener('mouseleave', function() {
      container.style.borderColor = border;
    });

    container.addEventListener('click', function() {
      btn.textContent = 'Verifying...';
      btn.style.opacity = '0.7';

      var apiBase = el.getAttribute('data-api') || PROOF_API;
      var url = apiBase + '/api/v1/widget/' + encodeURIComponent(proofId);

      fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(data) {
          result.style.display = 'block';
          if (data.verified) {
            result.style.background = successBg;
            result.style.border = '1px solid ' + successColor;
            result.style.color = successColor;
            result.innerHTML = '<strong>Verified</strong> &mdash; Captured ' + new Date(data.capturedAt).toLocaleString() + '<br><span style="font-size:11px;opacity:0.8;">Capture: ' + (data.captureType || 'unknown') + '</span>';
            btn.textContent = 'Verified';
            btn.style.background = successColor;
            btn.style.opacity = '1';
          } else {
            result.style.background = dangerBg;
            result.style.border = '1px solid ' + dangerColor;
            result.style.color = dangerColor;
            result.textContent = 'Not found. This Proof Key does not exist.';
            btn.textContent = 'Not Found';
            btn.style.background = dangerColor;
            btn.style.opacity = '1';
          }
        })
        .catch(function() {
          result.style.display = 'block';
          result.style.background = dangerBg;
          result.style.border = '1px solid ' + dangerColor;
          result.style.color = dangerColor;
          result.textContent = 'Verification failed. Please try again.';
          btn.textContent = 'Click to Verify';
          btn.style.opacity = '1';
        });
    });

    el.innerHTML = '';
    el.appendChild(wrapper);
  }

  function init() {
    var widgets = document.querySelectorAll('[data-proof-widget]');
    for (var i = 0; i < widgets.length; i++) {
      createWidget(widgets[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (typeof window !== 'undefined') {
    window.ProofWidget = { init: init, create: createWidget };
  }
})();
