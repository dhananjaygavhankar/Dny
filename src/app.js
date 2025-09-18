import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({ name: '', email: '', requirement: '' });
  const [status, setStatus] = useState({ loading: false, submitted: false, error: '' });
  const FORMSPREE_URL = process.env.REACT_APP_FORMSPREE_URL;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ loading: true, submitted: false, error: '' });

    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('requirement', form.requirement);
    data.append('_subject', 'New DNY-AI Request');
    data.append('_gotcha', ''); // honeypot

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');
      setForm({ name: '', email: '', requirement: '' });
      setStatus({ loading: false, submitted: true, error: '' });
    } catch (err) {
      setStatus({ loading: false, submitted: false, error: err.message });
    }
  };

  return (
    <div className="coming-soon">
      <div className="container">
        <h1>🚀 Coming Soon! 🚀</h1>
        <p>Empowering Your World with Smart IoT Solutions.</p>
        <p>Stay Tuned for the Future of Connectivity!</p>
        <p>☀️ Energize Your Life with DNY-AI ☀️</p>
        <p>📞 Call Us: 9860855900</p>

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

          <label htmlFor="requirement">Your Requirement:</label>
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

        <div className="ivr-link">
          <a href="/visitors-ivr">Visitors IVR</a>
        </div>
      </div>

      <section className="features">
        <h3>AI-Powered Innovations</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <strong>CloudX™ Infrastructure</strong>
            <p>Hosting for smart AI &amp; IoT</p>
          </div>
          <div className="feature-card">
            <strong>AI-Optimized RYNChip™</strong>
            <p>Speed, scale &amp; reliability</p>
          </div>
          <div className="feature-card">
            <strong>RYNSHIELD™ Firewall &amp; Security</strong>
            <p>Run high-trust dynamic protocols</p>
          </div>
          <div className="feature-card">
            <strong>Modular Smart Living HomeWeb™</strong>
            <p>Seamless upgrades</p>
          </div>
        </div>
      </section>

      <div className="visitor-badge">Visitor #1234</div>
    </div>
  );
}

export default App;
