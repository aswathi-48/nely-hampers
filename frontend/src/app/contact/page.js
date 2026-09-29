'use client';
import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          occasion: 'General Contact'
        })
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ customerName: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '6rem 2rem 4rem', color: 'var(--color-charcoal)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
        
        {/* Left Side: Contact Info */}
        <div style={{ flex: '1 1 400px' }}>
          <h1 style={{ fontFamily: 'var(--font-secondary)', color: 'var(--color-olive)', fontSize: '3rem', marginBottom: '1rem' }}>Get in Touch</h1>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '3rem', lineHeight: '1.8' }}>
            Whether you have a question about our bespoke hampers, pricing, or need assistance choosing the perfect gift, our team is ready to help you.
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-secondary)', marginBottom: '0.5rem' }}>Location</h3>
            <p style={{ color: '#555' }}>123 Luxury Lane, Elite District<br />Mumbai, Maharashtra 400001</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-secondary)', marginBottom: '0.5rem' }}>Contact Info</h3>
            <p style={{ color: '#555' }}><strong>Phone:</strong> +91 98765 43210<br /><strong>Email:</strong> hello@thehamper.com</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-secondary)', marginBottom: '0.5rem' }}>Working Hours</h3>
            <p style={{ color: '#555' }}>Monday - Saturday: 9:00 AM - 7:00 PM<br />Sunday: Closed</p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div style={{ flex: '1 1 400px', backgroundColor: '#fff', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontFamily: 'var(--font-secondary)', color: 'var(--color-olive)', marginBottom: '1.5rem' }}>Send a Message</h2>
          
          {success ? (
            <div style={{ padding: '1.5rem', backgroundColor: '#eaf5eb', color: '#2b7a33', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Thank You!</h3>
              <p>Your message has been sent successfully. We will get back to you shortly.</p>
              <button className="btn btn-outline" onClick={() => setSuccess(false)} style={{ marginTop: '1rem' }}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Your Name *</label>
                <input type="text" required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Phone *</label>
                  <input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Message</label>
                <textarea rows="4" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }}></textarea>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '1rem', marginTop: '1rem', fontSize: '1.1rem' }}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
