// Block trackers
const trackers = ["tracker.com", "analytics.com"]; // Add more trackers as needed
trackers.forEach(tracker => {
  const scriptTags = document.querySelectorAll(`script[src*="${tracker}"]`);
  scriptTags.forEach(tag => tag.remove());
});

// Block ads
const adSelectors = ['.ad', '.ads', '.advertisement']; // Add more selectors as needed
adSelectors.forEach(selector => {
  const ads = document.querySelectorAll(selector);
  ads.forEach(ad => ad.remove());
});

// Provide users with information about trackers
const trackerInfo = document.createElement('div');
trackerInfo.id = 'trackerInfo';
trackerInfo.textContent = 'Trackers blocked: ' + trackers.join(', ');
document.body.appendChild(trackerInfo);
