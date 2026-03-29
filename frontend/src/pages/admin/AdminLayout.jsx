import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Users, LogOut } from 'lucide-react';

export function AdminLayout() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Inventory', href: '/admin/inventory', icon: Package },
    { name: 'Customers', href: '/admin/customers', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-luxury-sand flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-luxury-black text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="text-xl font-display tracking-widest text-luxury-gold hover:text-white transition-colors">
            SCENTCEPTS
            <span className="block text-xs text-white/50 tracking-normal mt-1">Admin Portal</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${
                  isActive 
                    ? 'bg-luxury-gold/20 text-luxury-gold' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium tracking-wide text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10 m-4">
          <button className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors w-full px-4 py-3">
            <LogOut className="w-5 h-5" />
            <span className="font-medium tracking-wide text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm border-b border-luxury-sand/50 h-16 flex items-center justify-between px-8">
          <h2 className="text-lg font-medium text-luxury-black">
            {navigation.find(n => n.href === location.pathname)?.name || 'Admin Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-luxury-gold flex items-center justify-center text-white font-medium text-sm">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-luxury-cream">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
