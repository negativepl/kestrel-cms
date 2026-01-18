import Link from 'next/link'

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f5f5f5',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Kestrel CMS</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        System zarządzania treścią dla sklepu Kestrel
      </p>
      <Link
        href="/admin"
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '1rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500',
        }}
      >
        Przejdź do panelu administracyjnego
      </Link>
    </main>
  )
}
