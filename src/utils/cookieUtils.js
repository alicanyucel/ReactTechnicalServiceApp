// Minimal cookie helpers
export function setCookie(name, value, days = 30) {
  try {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  } catch (e) {
    // ignore in SSR or restricted contexts
  }
}

export function getCookie(name) {
  try {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  } catch (e) {
    return null;
  }
}

export function deleteCookie(name) {
  try {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  } catch (e) {
    // ignore
  }
}

export function setJsonCookie(name, obj, days = 30) {
  try {
    setCookie(name, JSON.stringify(obj), days);
  } catch (e) {
    // ignore
  }
}

export function getJsonCookie(name) {
  try {
    const val = getCookie(name);
    return val ? JSON.parse(val) : null;
  } catch (e) {
    return null;
  }
}
