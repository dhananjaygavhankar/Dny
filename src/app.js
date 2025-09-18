import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure your glowing styles are defined here

function App() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', requirement: '' });
  const [status, setStatus] = useState({ loading: false, submitted: false, error: '' });

  useEffect(() => {
    let count = parseInt(localStorage.getItem('visitorCount') || '0', 10);
    count += 1;
    localStorage.setItem('visitorCount', count);
    setVisitorCount(count);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, submitted: false, error: '' });

    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus({ loading: false, submitted: true, error: '' });
        setForm({ name: '', email: '', requirement: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setStatus({ loading: false, submitted: false, error: err.message });
    }
  };

  return (
    <div className="coming-soon">
      <div className="container pulse">
        <h1>🚀 Coming Soon! 🚀</h1>
        <p className="bounce">Empowering Your World with Smart IoT Solutions.</p>
        <p className="bounce">Stay Tuned for the Future of Connectivity!</p>
        <p className="bounce">☀️ Energize Your Life with DNY-AI ☀️</p>
        <p className="bounce">📞 Call Us: 9860855900</p>

        <form onSubmit={handleSubmit} aria-live="polite">
          <label htmlFor="name">Your Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Your Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="requirement">Your Phone & Requirement:</label>
          <textarea
            id="requirement"
            name="requirement"
            rows="4"
            value={form.requirement}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={status.loading}>
            {status.loading ? 'Submitting…' : 'Submit Request'}
          </button>

          {status.error && <p className="error">⚠️ {status.error}</p>}
          {status.submitted && <p className="success">✅ Successfully submitted!</p>}
        </form>

        <section className="features">
          <h3>AI-Powered Innovations</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <strong>Web Hosting</strong>
              <p>Smart AI & IoT Solutions</p>
            </div>
            <div className="feature-card">
              <strong>You Dream</strong>
              <p>We Deliver & Custom IoT Solutions</p>
            </div>
            <div className="feature-card">
              <strong>AI-Optimized</strong>
              <p>Speed, Scale & Reliable Products</p>
            </div>
            <div className="feature-card">
              <strong>Firewall & Security</strong>
              <p>Run High-Trust Dynamic Protocols</p>
            </div>
            <div className="feature-card">
              <strong>Modular Smart Living HomeWeb™</strong>
              <p>Seamless Upgrades</p>
            </div>
          </div>
        </section>

        <div className="visitor-badge">Visitor #{visitorCount}</div>
      </div>
    </div>
  );
}

export default App;
