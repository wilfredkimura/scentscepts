'use client';

import { useFetch } from '@/hooks/useFetch';
import { Users, ShoppingBag, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
  const { data: stats, isLoading: loadingStats } = useFetch<Record<string, number>>('/api/v1/admin/stats');

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-primary text-[10px] tracking-[0.5em] uppercase font-bold">Executive Overview</span>
          <h1 className="text-4xl font-light tracking-tight">System Metrics</h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest font-light">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> System Normal
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: stats?.totalUsers, icon: Users, color: 'text-blue-400' },
          { label: 'Total Products', value: stats?.totalProducts, icon: ShoppingBag, color: 'text-amber-400' },
          { label: 'Total Orders', value: stats?.totalOrders, icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Active Customers', value: stats?.activeCustomers, icon: Users, color: 'text-primary' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border/50 p-6 rounded-sm shadow-sm hover:border-primary/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-4 h-4 ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <span className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground">Scentcepts HQ</span>
            </div>
            <div className="space-y-1">
               <p className="text-3xl font-light tracking-tight">
                 {loadingStats ? <span className="animate-pulse">...</span> : stat.value ?? 0}
               </p>
               <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Activity placeholder (Optional enhancement) */}
      <div className="border border-border/50 bg-card p-6 rounded-sm">
        <h2 className="text-sm font-semibold tracking-wide mb-4">Recent Activity</h2>
        <p className="text-xs text-muted-foreground italic">Activity logs are loading and synchronized.</p>
      </div>
    </div>
  );
}
