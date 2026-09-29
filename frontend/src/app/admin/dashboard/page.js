'use client';
import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const headers = { Authorization: `Bearer ${userInfo.token}` };

        const [orderRes, enqRes] = await Promise.all([
          fetch('http://localhost:5000/api/orders', { headers }),
          fetch('http://localhost:5000/api/enquiries', { headers })
        ]);

        const orderData = await orderRes.json();
        const enqData = await enqRes.json();

        setOrders(orderData || []);
        setEnquiries(enqData || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard data...</div>;

  const totalOrders = orders.length;
  const newOrders = orders.filter(o => o.status === 'New').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;
  const newEnquiries = enquiries.filter(e => e.status === 'New').length;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: 'var(--color-olive)' }}>Dashboard Overview</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <div className={styles.statValue}>{totalOrders}</div>
        </div>
        <div className={styles.statCard}>
          <h3>New Orders</h3>
          <div className={styles.statValue}>{newOrders}</div>
        </div>
        <div className={styles.statCard}>
          <h3>Completed Orders</h3>
          <div className={styles.statValue}>{completedOrders}</div>
        </div>
        <div className={styles.statCard}>
          <h3>New Enquiries</h3>
          <div className={styles.statValue}>{newEnquiries}</div>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>Recent Orders</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Type</th>
                <th>Recipient</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.orderType}</td>
                  <td>{order.recipientName}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalAmount}</td>
                  <td><span className={`${styles.badge} ${styles['status' + order.status.replace(' ', '')]}`}>{order.status}</span></td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
