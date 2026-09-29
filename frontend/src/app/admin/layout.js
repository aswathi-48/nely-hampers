'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './adminLayout.module.css';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.role === 'admin') {
        setAdmin(parsed);
      } else {
        router.push('/login');
      }
    } else if (pathname !== '/login') {
      router.push('/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setAdmin(null);
    router.push('/login');
  };

  if (pathname === '/login') {
    return <>{children}</>;
  }

  if (!admin) return <div>Loading...</div>;

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Nely Admin</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin/dashboard" className={pathname === '/admin/dashboard' ? styles.active : ''}>Dashboard</Link>
          <Link href="/admin/orders" className={pathname.startsWith('/admin/orders') ? styles.active : ''}>Orders</Link>
          <Link href="/admin/enquiries" className={pathname.startsWith('/admin/enquiries') ? styles.active : ''}>Enquiries</Link>
          <Link href="/admin/hampers" className={pathname.startsWith('/admin/hampers') ? styles.active : ''}>Hampers</Link>
          <Link href="/admin/products" className={pathname.startsWith('/admin/products') ? styles.active : ''}>Products</Link>
          <Link href="/admin/categories" className={pathname.startsWith('/admin/categories') ? styles.active : ''}>Categories</Link>
          <Link href="/admin/customers" className={pathname.startsWith('/admin/customers') ? styles.active : ''}>Customers</Link>
          <Link href="/admin/reviews" className={pathname.startsWith('/admin/reviews') ? styles.active : ''}>Reviews</Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%' }}>Logout Admin</button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
