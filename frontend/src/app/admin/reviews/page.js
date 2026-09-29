'use client';
import { useEffect, useState } from 'react';
import styles from '../dashboard/dashboard.module.css';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/reviews');
        const data = await res.json();
        setReviews(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: 'var(--color-olive)' }}>Manage Reviews</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r._id}>
                <td>{r.rating} / 5</td>
                <td>{r.comment}</td>
                <td>{r.isApproved ? 'Approved' : 'Pending'}</td>
                <td><button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>Toggle Approval</button></td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No reviews found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
