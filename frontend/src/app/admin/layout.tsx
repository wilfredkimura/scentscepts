'use client';

import { Suspense, useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, LayoutDashboard, Package, Users, ShoppingCart, LogOut, Tag, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Inventory', href: '/admin/inventory', icon: Package },
    { name: 'Brands', href: '/admin/brands', icon: Tag },
    { name: 'Members', href: '/admin/users', icon: Users },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  ];

  return (
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
        
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-card border-b border-border/50 sticky top-0 z-[60]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Admin Portal</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 -mr-2 text-foreground"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Sidebar Overlay (Mobile) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[50] md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 w-72 bg-card border-r border-border/50 flex flex-col z-[55] 
          transition-transform duration-300 transform md:translate-x-0 md:relative md:w-64
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-8 border-b border-border/50 hidden md:block">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-primary" />
              <div className="flex flex-col">
                <span className="text-sm tracking-[0.4em] uppercase font-bold text-foreground">Admin</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-primary">Command Center</span>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 font-bold">Main Menu</div>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-4 text-[10px] uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-bold border-r-2 border-primary' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground font-light'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'opacity-60'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
<<<<<<< HEAD
          {/* Mobile nav placeholder */}
          <nav className="md:hidden flex overflow-x-auto p-4 gap-2 border-b border-border/50">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                 <Link key={item.href} href={item.href} className={`px-4 py-2 text-[10px] uppercase tracking-widest whitespace-nowrap border ${isActive ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>{item.name}</Link>
              )
            })}
            <Link href="/" className="px-4 py-2 text-[10px] uppercase tracking-widest whitespace-nowrap border border-destructive/30 text-destructive hover:bg-destructive/10 transition-all">Back to Site</Link>
          </nav>

          <div className="p-4 border-t border-border/50 hidden md:block">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive transition-all">
              <LogOut className="w-4 h-4" /> Exit Admin
=======
          <div className="p-6 border-t border-border/50 mt-auto">
            <Link href="/" className="flex items-center gap-4 px-4 py-4 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-destructive transition-all group">
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Exit Admin
>>>>>>> 1db9daf82f12e959c5963850e0002a2e2b45b780
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12">
            <Suspense fallback={
              <div className="h-full min-h-[50vh] flex items-center justify-center font-serif text-primary italic tracking-[0.2em] animate-pulse">
                Establishing Secure Connection...
              </div>
            }>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
