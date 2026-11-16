import { API_URL } from './api';

export function mediaUrl(value) {
  if (!value) return value;

  try {
    const url = new URL(value, API_URL || window.location.origin);

    // Older records may have saved an upload URL using the development host.
    if (
      (url.hostname === 'localhost' || url.hostname === '127.0.0.1') &&
      url.pathname.startsWith('/uploads/')
    ) {
      return `${API_URL}${url.pathname}${url.search}`;
    }

    if (url.origin === window.location.origin && url.pathname.startsWith('/uploads/')) {
      return `${API_URL}${url.pathname}${url.search}`;
    }

    return url.href;
  } catch {
    return value;
  }
}
