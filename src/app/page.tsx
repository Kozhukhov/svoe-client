/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [name, setName] = useState('');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Проверка здоровья API при загрузке
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealthStatus(data))
      .catch(err => console.error('Health check failed:', err));
  }, []);

  const handleApiTest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/hello?name=${name || 'World'}`);
      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      console.error('API call failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 style={{ fontSize: '2rem', marginTop: '2rem' }}>SVOE Client</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Next.js приложение с Backend API
        </p>

        {/* API Health Status */}
        <div style={{
          padding: '1rem',
          background: healthStatus?.status === 'ok' ? '#d4edda' : '#f8d7da',
          borderRadius: '8px',
          marginBottom: '2rem',
          minWidth: '300px'
        }}>
          <h3>🔌 API Status</h3>
          {healthStatus ? (
            <div>
              <p>Status: <strong>{healthStatus.status}</strong></p>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>
                {healthStatus.message}
              </p>
            </div>
          ) : (
            <p>Checking...</p>
          )}
        </div>

        {/* API Test Form */}
        <div style={{
          padding: '2rem',
          background: '#f5f5f5',
          borderRadius: '12px',
          marginBottom: '2rem',
          minWidth: '400px'
        }}>
          <h3>🧪 Тест API</h3>
          <div style={{ marginTop: '1rem' }}>
            <input
              type="text"
              placeholder="Введите имя..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '0.75rem',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                width: '100%',
                marginBottom: '1rem'
              }}
            />
            <button
              onClick={handleApiTest}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                borderRadius: '6px',
                border: 'none',
                background: '#0070f3',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%'
              }}
            >
              {loading ? 'Загрузка...' : 'Вызвать API'}
            </button>
          </div>

          {apiResponse && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'white',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <h4>Ответ API:</h4>
              <pre style={{
                fontSize: '0.85rem',
                overflow: 'auto',
                margin: 0
              }}>
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* API Endpoints */}
        <div style={{
          textAlign: 'left',
          background: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: '8px',
          maxWidth: '500px'
        }}>
          <h3>📡 Доступные API:</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>
              <code>GET /api/health</code> - Health check
            </li>
            <li>
              <code>GET /api/hello?name=X</code> - GET endpoint
            </li>
            <li>
              <code>POST /api/hello</code> - POST endpoint
            </li>
          </ul>
        </div>

        <div className={styles.ctas} style={{ marginTop: '2rem' }}>
          <a
            href="/api/health"
            target="_blank"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#0070f3',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none'
            }}
          >
            Открыть /api/health
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
