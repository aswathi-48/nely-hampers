'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './order.module.css';

function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const type = searchParams.get('type'); // 'custom' or null

  const [orderType, setOrderType] = useState('Ready-Made');
  const [cart, setCart] = useState(null); // { items: {}, budget: 0 } for custom, or product object for ready-made
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (!userInfo || userInfo.role !== 'customer') {
      const redirectTarget = type === 'custom' ? '/customize' : '/category';
      const shouldLogin = window.confirm('Please log in to place or continue with your order. Would you like to log in now?');
      if (shouldLogin) {
        router.push(`/login?redirect=${encodeURIComponent(redirectTarget)}`);
      } else {
        router.push('/');
      }
      return;
    }
  }, [router, type]);

  // Form states
  const [deliveryDate, setDeliveryDate] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [contactPreference, setContactPreference] = useState('WhatsApp');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (type === 'custom') {
          setOrderType('Custom');
          const customOrder = localStorage.getItem('customOrder');
          if (customOrder) {
            setCart(JSON.parse(customOrder));
          } else {
            router.push('/customize');
          }
          setLoading(false);
        } else if (productId) {
          setOrderType('Ready-Made');
          const res = await fetch(`http://localhost:5000/api/products/${productId}`);
          const data = await res.json();
          setCart(data);
          setLoading(false);
        } else {
          // No product or custom selected
          router.push('/category');
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId, type, router]);

  const submitOrder = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

    if (!userInfo || userInfo.role !== 'customer') {
      alert('Please register and log in as a customer before placing an order.');
      router.push('/login?redirect=/category');
      return;
    }

    const orderData = {
      orderType,
      deliveryDate,
      recipientName,
      customerPhone,
      deliveryAddress,
      giftMessage,
      specialInstructions: `Contact Preference: ${contactPreference}\n\n${specialInstructions}`,
    };

    if (orderType === 'Custom') {
      orderData.customItems = Object.values(cart.items).map(item => ({ product: item._id, quantity: 1 }));
      orderData.totalAmount = cart.budget;
      orderData.budget = cart.budget;
    } else {
      orderData.products = [{ product: cart._id, quantity: 1 }];
      orderData.totalAmount = cart.price;
    }

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (userInfo && userInfo.token) {
        headers.Authorization = `Bearer ${userInfo.token}`;
      }

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (res.ok) {
        // Generate WhatsApp message and redirect
        let wpMessage = `Hi Nely Hampers,\n\nI would like to order a ${orderType} hamper.\n`;
        if (userInfo) wpMessage += `Name: ${userInfo.name}\n`;
        wpMessage += `Delivery Date: ${deliveryDate}\n`;
        wpMessage += `Estimated Total: ₹${orderData.totalAmount}\n`;
        
        const wpUrl = `https://wa.me/910000000000?text=${encodeURIComponent(wpMessage)}`;
        
        if (orderType === 'Custom') {
          localStorage.removeItem('customOrder');
        }

        window.open(wpUrl, '_blank');
        router.push('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to place order');
    }
  };

  if (loading) return <div className="container section text-center">Loading checkout...</div>;

  return (
    <div className="container section">
      <h1 className="text-center" style={{ marginBottom: '2rem' }}>Complete Your Order</h1>
      <div className={styles.orderLayout}>
        
        <div className={styles.summarySection}>
          <h3>Order Summary</h3>
          {orderType === 'Custom' && cart && cart.items ? (
            <div>
              <p><strong>Type:</strong> Custom Hamper</p>
              <ul>
                {Object.entries(cart.items).map(([type, item]) => (
                  <li key={type}>{type}: {item.name}</li>
                ))}
              </ul>
              <hr />
              <p><strong>Total (or Budget):</strong> ₹{cart.budget || 'Not specified'}</p>
            </div>
          ) : (
            cart && (
              <div>
                <p><strong>Type:</strong> Ready-Made Hamper</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <img src={cart.images && cart.images[0] ? cart.images[0] : 'https://via.placeholder.com/100'} alt={cart.name} width="100" />
                  <div>
                    <h4>{cart.name}</h4>
                    <p>₹{cart.price}</p>
                  </div>
                </div>
                <hr style={{ margin: '1rem 0' }} />
                <p><strong>Total:</strong> ₹{cart.price}</p>
              </div>
            )
          )}
        </div>

        <div className={styles.formSection}>
          <form onSubmit={submitOrder} className={styles.orderForm}>
            <div className={styles.formGroup}>
              <label>Recipient Name</label>
              <input type="text" required value={recipientName} onChange={e => setRecipientName(e.target.value)} />
            </div>
            
            <div className={styles.formGroup}>
              <label>Delivery Address</label>
              <textarea required value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)}></textarea>
            </div>

            <div className={styles.formGroup}>
              <label>Your Phone Number</label>
              <input type="text" required value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Enter your contact number" />
            </div>

            <div className={styles.formGroup}>
              <label>Preferred Delivery Date</label>
              <input type="date" required value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label>Gift Message (Optional)</label>
              <textarea value={giftMessage} onChange={e => setGiftMessage(e.target.value)} placeholder="Write a special message..."></textarea>
            </div>

            {orderType === 'Custom' && (
              <div className={styles.formGroup}>
                <label>Preferred Contact Method</label>
                <select value={contactPreference} onChange={e => setContactPreference(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Email">Email</option>
                </select>
              </div>
            )}

            <div className={styles.formGroup}>
              <label>{orderType === 'Custom' ? 'Customization Details / Description' : 'Special Instructions (Optional)'}</label>
              <textarea rows="3" value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} placeholder={orderType === 'Custom' ? 'Tell us exactly how you want your hamper customized (colors, ribbons, etc.)...' : ''} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Place Order via WhatsApp</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <OrderForm />
    </Suspense>
  );
}
