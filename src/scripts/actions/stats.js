export function loadStats(site_stats) {
  return {
    type: 'LOAD_STATS',
    stats: site_stats,
  };
}

export function updateCurrentUrl(url) {
  return {
    type: 'UPDATE_CURRENT_URL',
    currentUrl: url,
  };
}

