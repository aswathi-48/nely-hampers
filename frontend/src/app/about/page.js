import Link from 'next/link';
import styles from '../page.module.css';

export default function AboutUs() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '6rem 2rem 4rem', color: 'var(--color-charcoal)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-secondary)', color: 'var(--color-olive)', fontSize: '3rem', marginBottom: '1.5rem' }}>Our Story</h1>
        
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem', color: '#555' }}>
          At The Hamper, we believe that giving a gift is more than an exchange of items—it is a language of love, celebration, and connection. Born from a passion for elegant and bespoke curation, we set out on a journey to transform ordinary moments into unforgettable memories.
        </p>

        <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: 'var(--color-olive)', borderRadius: '12px', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
           <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop" alt="Luxury Hamper" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
           <div style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '2rem 3rem', borderRadius: '8px' }}>
              <h2 style={{ fontFamily: 'var(--font-secondary)', color: 'var(--color-gold)', margin: 0 }}>Crafted with Love</h2>
           </div>
        </div>
        
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--color-olive)', fontFamily: 'var(--font-secondary)', fontSize: '1.8rem', marginBottom: '1rem' }}>Our Mission</h3>
            <p style={{ lineHeight: '1.8', color: '#666' }}>To design luxurious, thoughtful, and fully personalized hampers that reflect the unique sentiments of our customers. Whether it's a romantic gesture, a wedding celebration, or a corporate milestone, our hampers bring warmth and elegance to every recipient.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--color-olive)', fontFamily: 'var(--font-secondary)', fontSize: '1.8rem', marginBottom: '1rem' }}>The Art of Curation</h3>
            <p style={{ lineHeight: '1.8', color: '#666' }}>Every product within our hampers is hand-selected from premium artisans and global brands. We take pride in our meticulous attention to detail, from the selection of the finest chocolates and perfumes to the elegant, sustainable packaging that wraps it all together.</p>
          </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
           <Link href="/customize">
              <button className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>Build Your Custom Hamper</button>
           </Link>
        </div>
      </div>
    </div>
  );
}
