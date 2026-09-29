'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './customize.module.css';

export default function CustomizeHamper() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Box');
  const [selectedItems, setSelectedItems] = useState({}); // { productType: productObject }
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(true);

  const tabs = ['Box', 'Chocolate', 'Dress', 'Flower', 'Perfume', 'Teddy', 'Skincare', 'Accessories', 'Other'];

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (!userInfo || userInfo.role !== 'customer') {
      const shouldLogin = window.confirm('Please log in as a customer to customize a hamper. Would you like to log in now?');
      if (shouldLogin) {
        router.push('/login?redirect=/customize');
      } else {
        router.push('/');
      }
      return;
    }

    const fetchCustomProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products?isCustomizable=true');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data.filter(p => p.isAvailable) : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomProducts();
  }, [router]);

  const handleSelect = (product) => {
    setSelectedItems(prev => ({
      ...prev,
      [product.productType]: product
    }));
  };

  const handleRemove = (type) => {
    const updated = { ...selectedItems };
    delete updated[type];
    setSelectedItems(updated);
  };

  const handleProceed = () => {
    // Store in localStorage for checkout
    localStorage.setItem('customOrder', JSON.stringify({
      items: selectedItems,
      budget: budget
    }));
    router.push('/order?type=custom');
  };

  if (loading) return <div className="container section text-center">Loading builder...</div>;

  const currentProducts = products.filter(p => p.productType === activeTab);

  return (
    <div className="container section">
      <h1 className="text-center" style={{ marginBottom: '2rem' }}>Create Your Custom Hamper</h1>
      
      <div className={styles.builderLayout}>
        <div className={styles.selectionArea}>
          <div className={styles.tabs}>
            {tabs.map(tab => (
              <button 
                key={tab} 
                className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.productGrid}>
            <div className={styles.productCard} onClick={() => handleRemove(activeTab)}>
              <div className={styles.nonePlaceholder}>Don't Want This Item</div>
            </div>
            
            {currentProducts.map(product => (
              <div 
                key={product._id} 
                className={`${styles.productCard} ${selectedItems[activeTab]?._id === product._id ? styles.selectedCard : ''}`}
                onClick={() => handleSelect(product)}
              >
                <div style={{ height: '150px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${product.images[0] || 'https://via.placeholder.com/150'})`, borderRadius: '4px' }}></div>
                <h4>{product.name}</h4>
                <button className={`btn ${selectedItems[activeTab]?._id === product._id ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}>
                  {selectedItems[activeTab]?._id === product._id ? 'Selected' : 'Add'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.summaryArea}>
          <h3>Your Hamper Summary</h3>
          <div className={styles.summaryList}>
            {Object.entries(selectedItems).length === 0 && <p>No items selected yet.</p>}
            {Object.entries(selectedItems).map(([type, item]) => (
              <div key={type} className={styles.summaryItem}>
                <span><strong>{type}:</strong> {item.name}</span>
              </div>
            ))}
          </div>
          
          <hr style={{ margin: '1rem 0' }} />
          
          <div className={styles.budgetSection}>
            <label>My Budget (Optional):</label>
            <input 
              type="number" 
              placeholder="e.g. 2000" 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)}
              className={styles.budgetInput}
            />
          </div>

          <button onClick={handleProceed} className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
