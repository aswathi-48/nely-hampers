'use client';
import { useEffect, useState } from 'react';
import styles from '../dashboard/dashboard.module.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: '', price: '', description: '', productType: 'Ready-Made', category: '', images: [], stockCount: '' 
  });
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '', price: '', description: '', productType: 'Ready-Made', category: '', images: [], stockCount: ''
  });
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products?isCustomizable=false');
      const data = await res.json();
      setProducts(data || []);
      
      const catRes = await fetch('http://localhost:5000/api/categories');
      const catData = await catRes.json();
      setCategories(catData || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setNewProduct({...newProduct, images: [`http://localhost:5000${data.imageUrl}`]});
      } else {
        alert(data.message || 'Image upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const uploadEditFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setEditFormData({...editFormData, images: [`http://localhost:5000${data.imageUrl}`]});
      } else {
        alert(data.message || 'Image upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const payload = {
        ...newProduct,
        productType: 'Ready-Made',
        price: Number(newProduct.price),
        isCustomizable: false
      };
      
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setNewProduct({ name: '', price: '', description: '', productType: 'Ready-Made', category: '', images: [], stockCount: '' });
        setShowAddForm(false);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      productType: product.productType,
      category: product.category?._id || product.category,
      images: product.images || [],
      stockCount: product.stockCount || 0
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const payload = {
        ...editFormData,
        productType: 'Ready-Made',
        price: Number(editFormData.price),
        isCustomizable: false
      };
      
      const res = await fetch(`http://localhost:5000/api/products/${editingProduct}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEditingProduct(null);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating product');
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-olive)' }}>Manage Hampers</h1>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Hamper'}
        </button>
      </div>

      {showAddForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '600px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-olive)' }}>Add New Hamper</h3>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price (₹)</label>
                  <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product Image</label>
                <input type="file" accept="image/*" onChange={uploadFileHandler} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                {uploading && <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>Uploading...</p>}
                {newProduct.images?.[0] && !uploading && <img src={newProduct.images[0]} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '1rem', borderRadius: '8px' }} />}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                <textarea rows="3" required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Product</button>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)} style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '600px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-olive)' }}>Edit Product</h3>
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input type="text" required value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price (₹)</label>
                  <input type="number" required value={editFormData.price} onChange={e => setEditFormData({...editFormData, price: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                  <select value={editFormData.category} onChange={e => setEditFormData({...editFormData, category: e.target.value})} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product Image</label>
                <input type="file" accept="image/*" onChange={uploadEditFileHandler} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                {uploading && <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>Uploading...</p>}
                {editFormData.images?.[0] && !uploading && <img src={editFormData.images[0]} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '1rem', borderRadius: '8px' }} />}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                <textarea rows="3" required value={editFormData.description} onChange={e => setEditFormData({...editFormData, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Update Product</button>
                <button type="button" className="btn btn-outline" onClick={() => setEditingProduct(null)} style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>
                  {p.images && p.images.length > 0 ? (
                    <img src={p.images[0]} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: '50px', height: '50px', background: '#e0e0e0', borderRadius: '4px' }}></div>
                  )}
                </td>
                <td>{p.name}</td>
                <td>{p.category?.name || p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.isAvailable ? 'Yes' : 'No'}</td>
                <td><button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleEditClick(p)}>Edit</button></td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
