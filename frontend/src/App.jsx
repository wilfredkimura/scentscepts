import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function StorefrontLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="p-4 bg-luxury-black text-luxury-gold flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-display uppercase tracking-widest text-luxury-gold">Scentcepts</h1>
      </nav>
      <main className="flex-grow p-4">{children}</main>
      <footer className="p-4 bg-luxury-dark text-luxury-sand text-center text-sm">
        <p>&copy; 2026 Scentcepts. All rights reserved.</p>
      </footer>
    </div>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-luxury-sand">
      <nav className="p-4 bg-luxury-gold-dark text-white flex justify-between items-center shadow-md">
        <h1 className="text-xl font-display tracking-widest">Scentcepts Admin</h1>
      </nav>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Storefront Routes */}
        <Route path="/" element={
          <StorefrontLayout>
            <div className="animate-fade-in flex flex-col items-center justify-center mt-20">
              <h2 className="text-4xl md:text-6xl text-center mb-6 text-balance text-luxury-black">Discover Your Signature Scent</h2>
              <p className="text-lg text-luxury-dark mb-8 text-center max-w-2xl">
                Explore our curated collection of premium decants and full bottles, offering an unparalleled luxury experience.
              </p>
              <button className="px-8 py-3 bg-luxury-gold text-white font-medium hover:bg-luxury-gold-dark transition-colors rounded shadow-md">
                Shop Collection
              </button>
            </div>
          </StorefrontLayout>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <AdminLayout>
            <div className="animate-slide-up grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow-sm border border-luxury-nude">
                <h3 className="text-luxury-dark text-sm uppercase tracking-wide">Gross Revenue</h3>
                <p className="text-3xl font-display mt-2">$0.00</p>
              </div>
              <div className="bg-white p-6 rounded shadow-sm border border-luxury-nude">
                <h3 className="text-luxury-dark text-sm uppercase tracking-wide">Total Orders</h3>
                <p className="text-3xl font-display mt-2">0</p>
              </div>
              <div className="bg-white p-6 rounded shadow-sm border border-luxury-nude">
                <h3 className="text-luxury-dark text-sm uppercase tracking-wide">Customers</h3>
                <p className="text-3xl font-display mt-2">0</p>
              </div>
            </div>
          </AdminLayout>
        } />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
