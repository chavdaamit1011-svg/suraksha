/**
 * SURAKSHA Platform Security Utility
 * Enforces 7-Day Mandatory Re-Login Policy for all Users & Admins.
 */

export const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // 7 Days in Milliseconds

export function checkAndEnforce7DaySession(): boolean {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('suraksha_token');
  const userStr = localStorage.getItem('suraksha_user');
  const loginTimeStr = localStorage.getItem('suraksha_login_time');

  if (!token || !userStr) {
    return false;
  }

  // If login timestamp is missing or session age exceeds 7 days (604,800,000 ms)
  if (loginTimeStr) {
    const loginTime = parseInt(loginTimeStr, 10);
    const sessionAge = Date.now() - loginTime;

    if (isNaN(sessionAge) || sessionAge > SEVEN_DAYS_MS) {
      // Clear expired session data
      localStorage.removeItem('suraksha_token');
      localStorage.removeItem('suraksha_user');
      localStorage.removeItem('suraksha_login_time');
      return true; // Expired
    }
  } else {
    // Legacy session without timestamp -> Set current time as baseline
    localStorage.setItem('suraksha_login_time', Date.now().toString());
  }

  return false; // Valid session
}
