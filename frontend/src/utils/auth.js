export function isCustomerLoggedIn() {
  if (typeof window === 'undefined') return false;

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  return !!userInfo && userInfo.role === 'customer';
}

export function requireCustomerLogin(router, redirectPath, options = {}) {
  const {
    message = 'Please log in to continue with your order.',
    fallbackPath = '/',
  } = options;

  if (isCustomerLoggedIn()) return true;

  const shouldLogin = window.confirm(`${message}\n\nWould you like to log in now?`);

  if (shouldLogin) {
    const targetPath = redirectPath ? `/login?redirect=${encodeURIComponent(redirectPath)}` : '/login';
    router.push(targetPath);
  } else if (fallbackPath) {
    router.push(fallbackPath);
  }

  return false;
}
