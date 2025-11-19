import Cookies from 'js-cookie';

const AUTH_COOKIE = 'finance-dashboard-auth';
const USER_COOKIE = 'finance-dashboard-user';

export interface User {
  email: string;
  name: string;
}

/**
 * Mock authentication - accepts any email/password combination
 */
export function login(email: string, password: string): User | null {
  // Simple validation
  if (!email || !password || password.length < 3) {
    return null;
  }

  // Create a mock user
  const user: User = {
    email,
    name: email.split('@')[0] || 'User',
  };

  // Store auth token and user info in cookies
  Cookies.set(AUTH_COOKIE, 'authenticated', { expires: 7 }); // 7 days
  Cookies.set(USER_COOKIE, JSON.stringify(user), { expires: 7 });

  return user;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return Cookies.get(AUTH_COOKIE) === 'authenticated';
}

/**
 * Get current user from cookies
 */
export function getCurrentUser(): User | null {
  const userCookie = Cookies.get(USER_COOKIE);
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie) as User;
  } catch {
    return null;
  }
}

/**
 * Logout user
 */
export function logout(): void {
  Cookies.remove(AUTH_COOKIE);
  Cookies.remove(USER_COOKIE);
}

