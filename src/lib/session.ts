/**
 * SURAKSHA Platform Security Utility
 * Enforces 7-Day Mandatory Re-Login Policy & Secure Cookie Persistence for all Users, Admins, and OPS Officers.
 */

export const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // 7 Days in Milliseconds (604,800,000 ms)
export const SEVEN_DAYS_SEC = 7 * 24 * 60 * 60; // 7 Days in Seconds (604,800 sec)

// --- Cookie Helpers ---
export function setCookie(name: string, value: string, days = 7) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      } catch (e) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }
  return null;
}

export function eraseCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// --- Save Auth Session (7-Day Cookies + localStorage) ---
export function saveAuthSession(token: string, user: any) {
  if (typeof window === 'undefined') return;

  const loginTime = Date.now().toString();
  const userStr = typeof user === 'string' ? user : JSON.stringify(user);

  // 1. Save to 7-Day Cookies
  setCookie('suraksha_token', token, 7);
  setCookie('suraksha_user', userStr, 7);
  setCookie('suraksha_login_time', loginTime, 7);

  // 2. Save to localStorage
  localStorage.setItem('suraksha_token', token);
  localStorage.setItem('suraksha_user', userStr);
  localStorage.setItem('suraksha_login_time', loginTime);
}

// --- Clear Auth Session ---
export function clearAuthSession() {
  if (typeof window === 'undefined') return;

  // Clear Cookies
  eraseCookie('suraksha_token');
  eraseCookie('suraksha_user');
  eraseCookie('suraksha_login_time');

  try {
    document.cookie = 'suraksha_token=; Max-Age=0; path=/; SameSite=Lax';
    document.cookie = 'suraksha_user=; Max-Age=0; path=/; SameSite=Lax';
    document.cookie = 'suraksha_login_time=; Max-Age=0; path=/; SameSite=Lax';
  } catch (e) {}

  // Clear localStorage & sessionStorage completely
  try {
    localStorage.removeItem('suraksha_token');
    localStorage.removeItem('suraksha_user');
    localStorage.removeItem('suraksha_login_time');
    sessionStorage.clear();
  } catch (e) {}
}

// --- Get Auth Session (from Cookies or localStorage) ---
export function getAuthSession() {
  if (typeof window === 'undefined') return { token: null, user: null, loginTime: null };

  let token = getCookie('suraksha_token') || localStorage.getItem('suraksha_token');
  let userStr = getCookie('suraksha_user') || localStorage.getItem('suraksha_user');
  let loginTimeStr = getCookie('suraksha_login_time') || localStorage.getItem('suraksha_login_time');

  let user = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      user = null;
    }
  }

  // Ensure cookie <-> localStorage synchronization
  if (token && userStr && loginTimeStr) {
    saveAuthSession(token, userStr);
  }

  return { token, user, loginTime: loginTimeStr };
}

// --- Enforce 7-Day Session Expiration Check ---
export function checkAndEnforce7DaySession(): boolean {
  if (typeof window === 'undefined') return false;

  const { token, user, loginTime } = getAuthSession();

  if (!token || !user) {
    return false;
  }

  if (loginTime) {
    const timeNum = parseInt(loginTime, 10);
    const sessionAge = Date.now() - timeNum;

    if (isNaN(sessionAge) || sessionAge > SEVEN_DAYS_MS) {
      // Clear expired session from Cookies + localStorage
      clearAuthSession();
      return true; // Expired!
    }
  } else {
    // Set timestamp baseline if missing
    const nowStr = Date.now().toString();
    setCookie('suraksha_login_time', nowStr, 7);
    localStorage.setItem('suraksha_login_time', nowStr);
  }

  return false; // Session valid & within 7 days
}
