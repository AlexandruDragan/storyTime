(function() {
    let isMobile = window.innerWidth <= 991;

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

      let iframe = container.querySelector('iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.src = iframeUrl;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('fetchpriority', 'high');
        iframe.setAttribute('rel', 'preload');
        iframe.style.border = 'none';
        iframe.className = 'storybook_iframe';
        iframe.style.maxWidth = 'unset';
        
        // Listen for the iframe's load event to resize the container
        iframe.onload = () => {
          if (!isMobile) {
            // Recalculate and set the container height after the iframe loads
            const scaleFactor = containerWidth / simulatedWidth;
            const scaledHeight = simulatedHeight * scaleFactor;
            container.style.height = `${scaledHeight}px`;
            container.style.maxHeight = `${scaledHeight}px`;
          }
        };

        container.innerHTML = '';
        container.appendChild(iframe);
      }
      
      const isMobileNow = window.innerWidth <= 991;

      if (isMobileNow) {
        if (!isMobile) {
          iframe.src = iframeUrl;
        }
        iframe.style.transform = 'none';
        container.style.height = '80dvh';
        container.style.maxHeight = '80dvh';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
      } else {
        if (isMobile) {
          iframe.src = iframeUrl;
        }
        const scaleFactor = containerWidth / simulatedWidth;
        const scaledHeight = simulatedHeight * scaleFactor;

        iframe.style.width = `${simulatedWidth}px`;
        iframe.style.height = `${simulatedHeight}px`;
        iframe.style.transform = `scale(${scaleFactor})`;
        iframe.style.transformOrigin = '0 0';
        container.style.height = `${scaledHeight}px`;
        container.style.maxHeight = `${scaledHeight}px`;
      }
      
      isMobile = isMobileNow;
    }
    
    document.addEventListener('DOMContentLoaded', createScaledIframe);
    window.addEventListener('resize', createScaledIframe);
  })();
