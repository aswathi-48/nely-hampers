'use client';
import { useEffect, useState } from 'react';
import styles from '../dashboard/dashboard.module.css';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const headers = { Authorization: `Bearer ${userInfo.token}` };
        const res = await fetch('http://localhost:5000/api/enquiries', { headers });
        const data = await res.json();
        setEnquiries(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: 'var(--color-olive)' }}>Manage Enquiries</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enq => (
              <tr key={enq._id}>
                <td>{enq.customerName}</td>
                <td>{enq.email}</td>
                <td>{enq.phone}</td>
                <td>{enq.message}</td>
                <td>{new Date(enq.createdAt).toLocaleDateString()}</td>
                <td><span className={styles.badge}>{enq.status}</span></td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No enquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
