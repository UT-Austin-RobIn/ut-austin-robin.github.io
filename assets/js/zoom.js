// Initialize medium zoom with gallery navigation and a caption.
$(document).ready(function() {
  medium_zoom = mediumZoom('[data-zoomable]', {
    background: getComputedStyle(document.documentElement)
        .getPropertyValue('--global-bg-color') + 'ee',  // + 'ee' for transparency.
  });

  const caption = document.createElement('div');
  caption.className = 'zoom-caption';
  caption.setAttribute('aria-hidden', 'true');
  document.body.appendChild(caption);

  let currentImage = null;
  let navigating = false;

  const zoomableImages = () => Array.from(document.querySelectorAll('[data-zoomable]'));

  const imageTitle = (img) => img.getAttribute('alt') || img.getAttribute('title') || '';

  const setCaption = (img) => {
    caption.replaceChildren();
    if (!img) {
      caption.classList.remove('is-visible');
      return;
    }

    const images = zoomableImages();
    const index = images.indexOf(img);
    const title = imageTitle(img);
    let hasContent = false;

    if (title) {
      const titleEl = document.createElement('span');
      titleEl.className = 'zoom-caption-title';
      titleEl.textContent = title;
      caption.appendChild(titleEl);
      hasContent = true;
    }
    if (images.length > 1 && index !== -1) {
      const metaEl = document.createElement('span');
      metaEl.className = 'zoom-caption-meta';
      metaEl.textContent = `${index + 1} / ${images.length} · ← →`;
      caption.appendChild(metaEl);
      hasContent = true;
    }

    caption.classList.toggle('is-visible', hasContent);
  };

  const showImage = (img) => {
    if (!img || img === currentImage || navigating) {
      return;
    }
    navigating = true;
    medium_zoom.close().finally(() => {
      medium_zoom.open({ target: img }).finally(() => {
        navigating = false;
      });
    });
  };

  const step = (delta) => {
    const images = zoomableImages();
    if (!currentImage || images.length < 2) {
      return;
    }
    const index = images.indexOf(currentImage);
    if (index === -1) {
      return;
    }
    const next = images[(index + delta + images.length) % images.length];
    showImage(next);
  };

  medium_zoom.on('open', (event) => {
    currentImage = event.target;
    setCaption(currentImage);
  });

  medium_zoom.on('close', () => {
    if (navigating) {
      return;
    }
    currentImage = null;
    setCaption(null);
  });

  document.addEventListener('keydown', (event) => {
    if (!currentImage) {
      return;
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      step(-1);
    }
  });
});
