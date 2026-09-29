'use client';
import { useEffect, useState } from 'react';
import styles from '../dashboard/dashboard.module.css';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });

  const [editingCategory, setEditingCategory] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', slug: '', description: '' });

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories');
      const data = await res.json();
      setCategories(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const res = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(newCategory)
      });
      if (res.ok) {
        setNewCategory({ name: '', slug: '', description: '' });
        setShowAddForm(false);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add category');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding category');
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category._id);
    setEditFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || ''
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const res = await fetch(`http://localhost:5000/api/categories/${editingCategory}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(editFormData)
      });
      if (res.ok) {
        setEditingCategory(null);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update category');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating category');
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-olive)' }}>Manage Categories</h1>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Category'}
        </button>
      </div>

      {showAddForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-olive)' }}>Add New Category</h3>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input type="text" required value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Slug (e.g. birthday)</label>
                <input type="text" required value={newCategory.slug} onChange={e => setNewCategory({...newCategory, slug: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                <textarea rows="3" value={newCategory.description} onChange={e => setNewCategory({...newCategory, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save</button>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)} style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingCategory && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-olive)' }}>Edit Category</h3>
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input type="text" required value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Slug</label>
                <input type="text" required value={editFormData.slug} onChange={e => setEditFormData({...editFormData, slug: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                <textarea rows="3" value={editFormData.description} onChange={e => setEditFormData({...editFormData, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Update</button>
                <button type="button" className="btn btn-outline" onClick={() => setEditingCategory(null)} style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.slug}</td>
                <td>{c.isActive ? 'Yes' : 'No'}</td>
                <td><button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleEditClick(c)}>Edit</button></td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
