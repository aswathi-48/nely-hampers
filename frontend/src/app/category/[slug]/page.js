'use client';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { requireCustomerLogin } from '@/utils/auth';

export default function CategoryProducts({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsAndCategory = async () => {
      try {
        setLoading(true);
        const catRes = await fetch('http://localhost:5000/api/categories');
        const categories = await catRes.json();
        const category = categories.find(c => c.slug?.toLowerCase() === slug?.toLowerCase());

        if (!category) {
          setProducts([]);
          setCategoryName('Category');
          return;
        }

        setCategoryName(category.name);
        const prodRes = await fetch(`http://localhost:5000/api/products?category=${category._id}&productType=Ready-Made`);
        const prodData = await prodRes.json();
        setProducts(Array.isArray(prodData) ? prodData.filter(p => p.isAvailable) : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
        setCategoryName('Category');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProductsAndCategory();
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) return <div className="container section text-center">Loading products...</div>;

  return (
    <div className="container section">
      <h1 className="text-center" style={{ marginBottom: '3rem' }}>{categoryName || 'Category'} Hampers</h1>
      {products.length === 0 ? (
        <div className="text-center">No products found in this category.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {products.map(product => (
            <div key={product._id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <div style={{ height: '200px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${product.images?.[0] || 'https://via.placeholder.com/300x200?text=Product'})`, borderRadius: '8px', marginBottom: '1rem' }}></div>
              <h3>{product.name}</h3>
              <p style={{ color: 'var(--color-gold)', fontWeight: '600', fontSize: '1.2rem', margin: '0.5rem 0' }}>₹{product.price}</p>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => requireCustomerLogin(router, `/order?productId=${product._id}`, {
                  message: 'Please log in to place an order.',
                  fallbackPath: '/category',
                })}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
