'use client';
import { useEffect, useState } from 'react';
import styles from '../dashboard/dashboard.module.css';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const res = await fetch('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        const data = await res.json();
        setCustomers(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) return <div>Loading customers...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: 'var(--color-olive)' }}>Manage Customers</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Joined Date</th>
              <th>Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>0</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
