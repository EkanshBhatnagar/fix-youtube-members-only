// Function to check if a video element is member-only
function isMemberOnlyVideo(element) {
  // Get all text content including nested elements
  const textContent = element.innerText || '';
  const lowerText = textContent.toLowerCase();

  // Check for various member-only indicators in text
  if (lowerText.includes('members only') ||
      lowerText.includes('members-only') ||
      lowerText.includes('members first') ||
      lowerText.includes('member only')) {
    return true;
  }

  // Check HTML content as well (sometimes text isn't captured by innerText)
  const htmlContent = element.innerHTML || '';
  const lowerHTML = htmlContent.toLowerCase();
  if (lowerHTML.includes('members only') ||
      lowerHTML.includes('members first') ||
      lowerHTML.includes('member-only')) {
    return true;
  }

  // Check for member-only badges/indicators by aria-label
  const memberBadges = element.querySelectorAll(
    '[aria-label*="Members only" i], ' +
    '[aria-label*="Members first" i], ' +
    '[aria-label*="Member" i], ' +
    '.badge-style-type-members-only, ' +
    'ytd-badge-supported-renderer[aria-label*="Members" i]'
  );

  if (memberBadges.length > 0) {
    return true;
  }

  // Check for specific YouTube member badge classes and spans
  const badges = element.querySelectorAll('ytd-badge-supported-renderer, span.badge, .ytd-badge-supported-renderer, .badge');
  for (const badge of badges) {
    const label = badge.getAttribute('aria-label') || '';
    const badgeText = badge.innerText || '';
    const badgeHTML = badge.innerHTML || '';

    if (label.toLowerCase().includes('member') ||
        badgeText.toLowerCase().includes('member') ||
        badgeHTML.toLowerCase().includes('member')) {
      return true;
    }
  }

  // Check all span elements thoroughly
  const spans = element.querySelectorAll('span');
  for (const span of spans) {
    const spanText = (span.innerText || '').toLowerCase();
    const spanHTML = (span.innerHTML || '').toLowerCase();

    if (spanText.includes('members first') ||
        spanText.includes('members only') ||
        spanHTML.includes('members first') ||
        spanHTML.includes('members only')) {
      return true;
    }
  }

  // Check for metadata spans (YouTube uses these for badges)
  const metadataLines = element.querySelectorAll('#metadata-line, .metadata-line, ytd-video-meta-block');
  for (const metadata of metadataLines) {
    const metaText = (metadata.innerText || '').toLowerCase();
    if (metaText.includes('members') || metaText.includes('member')) {
      return true;
    }
  }

  return false;
}

// Function to remove member-only videos
function removeMemberOnlyVideos() {
  // Selectors for video elements on YouTube
  const videoSelectors = [
    'ytd-rich-item-renderer',           // Homepage grid videos
    'ytd-compact-video-renderer',       // Sidebar recommendations (old)
    'ytd-video-renderer',               // Search results and other lists
    'ytd-grid-video-renderer',          // Grid view videos
    'ytd-playlist-video-renderer',      // Playlist videos
    'ytd-reel-item-renderer',           // Shorts
    'yt-lockup-view-model',             // New YouTube sidebar videos
    'ytm-shorts-lockup-view-model',     // Shorts in sidebar (new)
    'ytm-shorts-lockup-view-model-v2'   // Shorts in sidebar v2 (new)
  ];

  videoSelectors.forEach(selector => {
    const videos = document.querySelectorAll(selector);

    videos.forEach(video => {
      // Skip if already processed
      if (video.hasAttribute('data-member-check')) {
        return;
      }

      // Mark as processed
      video.setAttribute('data-member-check', 'true');

      if (isMemberOnlyVideo(video)) {
        video.style.display = 'none';
        video.remove();
      }
    });
  });
}

// Run on initial load
removeMemberOnlyVideos();

// Create a MutationObserver to watch for dynamically loaded content
const observer = new MutationObserver((mutations) => {
  removeMemberOnlyVideos();
});

// Start observing the document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also run periodically as a fallback (YouTube's dynamic loading can be tricky)
setInterval(removeMemberOnlyVideos, 2000);
