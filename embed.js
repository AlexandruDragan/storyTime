(function() {
    function createScaledIframe() {
      const container = document.querySelector('.iframe-container[data-url]');
      if (!container) {
        return;
      }
      const iframeUrl = container.getAttribute('data-url');
      if (!iframeUrl) {
        return;
      }
      const simulatedWidth = 1800;
      const simulatedHeight = 1012;
      const containerWidth = container.offsetWidth;
      const scaleFactor = containerWidth / simulatedWidth;
      const iframe = document.createElement('iframe');
      iframe.src = iframeUrl;
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('fetchpriority', 'high');
      iframe.setAttribute('rel', 'preload');
      iframe.style.width = `${simulatedWidth}px`;
      iframe.style.height = `${simulatedHeight}px`;
      iframe.style.transform = `scale(${scaleFactor})`;
      iframe.style.transformOrigin = '0 0';
      iframe.style.border = 'none';
      container.innerHTML = '';
      container.appendChild(iframe);
    }
    document.addEventListener('DOMContentLoaded', createScaledIframe);
    window.addEventListener('resize', createScaledIframe);
  })();