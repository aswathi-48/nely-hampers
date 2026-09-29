'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { requireCustomerLogin } from '../utils/auth';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleProtectedAction = (path) => {
    const isAllowed = requireCustomerLogin(router, path, {
      message: 'Please log in to continue with your order.',
      fallbackPath: '/',
    });

    return isAllowed;
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    router.push('/login');
  };

  if (pathname && pathname.startsWith('/admin')) {
    return null; // Hide on admin routes
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Nely Hampers</Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/category">Hampers</Link>
        <Link href="/contact">Contact Us</Link>
      </div>
      <div className={styles.authLinks}>
        {user ? (
          <>
            <span className={styles.userName}>Hello, {user.name}</span>
            <Link href="/account">My Account</Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleProtectedAction('/category')}
        >
          Order Now
        </button>
      </div>
    </nav>
  );
}
