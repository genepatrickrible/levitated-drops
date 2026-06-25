(() => {
  const dropdown = document.querySelector('.cite-dropdown');
  if (!dropdown) return;

  const trigger = dropdown.querySelector('.dropdown-trigger button');
  const copyItem = dropdown.querySelector('[data-cite-text]');
  const copyLabel = copyItem && copyItem.querySelector('.cite-label');

  const close = () => dropdown.classList.remove('is-active');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('is-active');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  async function copyCitation(text, html) {
    // Preferred: write both text/plain and text/html so paste targets that
    // support rich text (Word, Google Docs, Notes, email) get italics & bold,
    // while plain-text contexts get the unformatted string.
    try {
      if (navigator.clipboard && typeof window.ClipboardItem !== 'undefined') {
        const item = new ClipboardItem({
          'text/plain': new Blob([text], { type: 'text/plain' }),
          'text/html': new Blob([html], { type: 'text/html' })
        });
        await navigator.clipboard.write([item]);
        return;
      }
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Older browsers: hidden textarea + execCommand. Loses formatting.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }

  if (copyItem) {
    copyItem.addEventListener('click', async (e) => {
      e.preventDefault();
      const text = copyItem.dataset.citationText || '';
      const html = copyItem.dataset.citationHtml || text;
      await copyCitation(text, html);
      if (copyLabel) {
        const original = copyLabel.textContent;
        copyLabel.textContent = 'Copied!';
        setTimeout(() => { copyLabel.textContent = original; close(); }, 1200);
      } else {
        close();
      }
    });
  }
})();

// Lightbox: click any figure image to enlarge it in a full-screen overlay.
// Click the backdrop, the image, the close button, or press Escape to dismiss.
(function () {
  const imgs = document.querySelectorAll('figure.image img');
  if (!imgs.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
    '<img class="lightbox-img" alt="">';
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lightbox-img');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.removeAttribute('src');
  }

  imgs.forEach((img) => {
    img.addEventListener('click', () => open(img.currentSrc || img.src, img.alt));
  });

  // Any click inside the overlay (backdrop, image, or close button) dismisses it.
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
})();
