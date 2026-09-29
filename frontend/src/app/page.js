'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { requireCustomerLogin } from '../utils/auth';

export default function Home() {
  const router = useRouter();

  const handleProtectedClick = (path) => {
    return requireCustomerLogin(router, path, {
      message: 'Please log in to continue with a custom hamper order.',
      fallbackPath: '/',
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>Thoughtfully Curated. Beautifully Gifted.</h1>
            <p>Beautiful hampers created to make every celebration a little more special.</p>
            <div className={styles.heroButtons}>
              <Link href="/category" className="btn btn-primary">Explore Hampers</Link>
              <button
                type="button"
                className="btn btn-outline"
                style={{ color: 'white', borderColor: 'white' }}
                onClick={() => handleProtectedClick('/customize')}
              >
                Create Your Hamper
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="section container">
        <h2 className="text-center">Shop by Occasion</h2>
        <div className={styles.categoryGrid}>
          {/* Static categories for preview, dynamically loaded in /category */}
          <div className={styles.categoryCard}>
            <div className={styles.categoryImage} style={{ background: '#e0c9a3' }}></div>
            <h3>Wedding</h3>
            <p>Elegant gifts for the special couple.</p>
            <Link href="/category/wedding" className="btn btn-outline" style={{ marginTop: '1rem' }}>View Hampers</Link>
          </div>
          <div className={styles.categoryCard}>
            <div className={styles.categoryImage} style={{ background: '#d4a373' }}></div>
            <h3>Birthday</h3>
            <p>Celebrate another wonderful year.</p>
            <Link href="/category/birthday" className="btn btn-outline" style={{ marginTop: '1rem' }}>View Hampers</Link>
          </div>
          <div className={styles.categoryCard}>
            <div className={styles.categoryImage} style={{ background: '#ccd5ae' }}></div>
            <h3>Anniversary</h3>
            <p>Cherish the moments together.</p>
            <Link href="/category/anniversary" className="btn btn-outline" style={{ marginTop: '1rem' }}>View Hampers</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={`container ${styles.aboutContainer}`}>
          <div className={styles.aboutLeft}>
            {/* Placeholder for hamper-making video */}
            <div className={styles.videoPlaceholder}>
              <span>[Hamper Making Video]</span>
            </div>
          </div>
          <div className={styles.aboutRight}>
            <h2>Our Story</h2>
            <p><strong>"Every gift carries a feeling. We simply help you present it beautifully."</strong></p>
            <p>At The Hamper, we believe that giving a gift should be as joyful as receiving one. We carefully curate the finest products and elegantly package them to create unforgettable unboxing experiences for your loved ones.</p>
            <Link href="/about" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Read More</Link>
          </div>
        </div>
      </section>

      {/* Hamper Selection Section */}
      <section className="section container" style={{ textAlign: 'center', backgroundColor: '#fdfbf7', padding: '4rem 2rem', borderRadius: '12px', margin: '4rem auto' }}>
        <h2 style={{ fontFamily: 'var(--font-secondary)', color: 'var(--color-olive)', marginBottom: '1rem' }}>Our Hampers</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: '#666', lineHeight: '1.8' }}>
          Choose from our thoughtfully curated ready-made hampers, or build a personalized bespoke hamper tailored exactly to your preferences.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {/* Ready Made Option */}
          <div style={{ flex: '1 1 300px', maxWidth: '400px', backgroundColor: '#fff', padding: '3rem 2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--color-olive)', borderRadius: '50%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            </div>
            <h3 style={{ color: 'var(--color-olive)', marginBottom: '1rem' }}>Ready-Made Hampers</h3>
            <p style={{ color: '#666', marginBottom: '2rem', flex: 1 }}>Explore our collection of beautifully pre-curated hampers designed for every special occasion.</p>
            <Link href="/category">
              <button className="btn btn-outline" style={{ width: '100%' }}>Browse & Order</button>
            </Link>
          </div>

          {/* Custom Option */}
          <div style={{ flex: '1 1 300px', maxWidth: '400px', backgroundColor: '#fff', padding: '3rem 2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--color-gold)', borderRadius: '50%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <h3 style={{ color: 'var(--color-olive)', marginBottom: '1rem' }}>Build a Custom Hamper</h3>
            <p style={{ color: '#666', marginBottom: '2rem', flex: 1 }}>Select your favorite items, set your budget, and let us create a bespoke gift just for you.</p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => handleProtectedClick('/customize')}
            >
              Start Building
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-secondary)', color: 'var(--color-olive)', marginBottom: '1.5rem' }}>We'd Love to Hear From You</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: '#666', lineHeight: '1.8' }}>
          Have a bespoke requirement or need help choosing the perfect gift? Reach out to our curation team and let us bring your vision to life.
        </p>
        <Link href="/contact">
           <button className="btn btn-outline" style={{ padding: '0.8rem 2.5rem', fontSize: '1.1rem' }}>Contact Us</button>
        </Link>
      </section>
    </div>
  );
}
