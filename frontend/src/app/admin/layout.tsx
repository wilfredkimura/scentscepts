'use client';

import { Suspense } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, LayoutDashboard, Package, Users, ShoppingCart, LogOut, Tag } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Inventory', href: '/admin/inventory', icon: Package },
    { name: 'Brands', href: '/admin/brands', icon: Tag },
    { name: 'Members', href: '/admin/users', icon: Users },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  ];

  return (
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <div className="min-h-screen bg-background font-serif text-foreground flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-card border-r border-border/50 flex flex-col md:min-h-screen sticky top-0 z-50">
          <div className="p-6 border-b border-border/50 bg-background/50">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs tracking-[0.4em] uppercase font-bold text-foreground">Admin</span>
                <span className="text-[8px] tracking-[0.2em] uppercase text-primary">Command Center</span>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto hidden md:block">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest transition-all ${
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
          
          {/* Mobile nav placeholder */}
          <nav className="md:hidden flex overflow-x-auto p-4 gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                 <Link key={item.href} href={item.href} className={`px-4 py-2 text-[10px] uppercase tracking-widest whitespace-nowrap border ${isActive ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>{item.name}</Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border/50 hidden md:block">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive transition-all">
              <LogOut className="w-4 h-4" /> Exit Admin
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-background/50 overflow-y-auto max-h-screen">
          <Suspense fallback={<div className="h-full min-h-[50vh] flex items-center justify-center font-serif text-primary italic tracking-widest animate-pulse">Establishing Secure Connection...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </ProtectedRoute>
  );
}
