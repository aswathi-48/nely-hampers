'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './category.module.css';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="container section text-center">Loading categories...</div>;

  return (
    <div className="container section">
      <h1 className="text-center" style={{ marginBottom: '3rem' }}>Shop by Category</h1>
      <div className={styles.grid}>
        {categories.filter(c => c.isActive).map(category => (
          <div key={category._id} className={styles.card}>
            <div 
              className={styles.image} 
              style={{ backgroundImage: `url(${category.image || 'https://via.placeholder.com/400x300?text=Category'})` }}
            ></div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <Link href={`/category/${category.slug}`} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              View Hampers
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
