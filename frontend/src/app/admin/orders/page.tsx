'use client';

import { useFetch } from '@/hooks/useFetch';
import { ShoppingCart, Search, Eye, Filter, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function AdminOrdersPage() {
  const { data: response, isLoading, refetch } = useFetch<any>('/api/v1/scentOrders?size=50');
  const orders = response?.content || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((o: any) => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (o.whatsappNumber && o.whatsappNumber.includes(searchTerm)) ||
    (o.status && o.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-primary text-[10px] tracking-[0.5em] uppercase font-bold">Commerce</span>
          <h1 className="text-4xl font-light tracking-tight">Order Management</h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
          <button onClick={() => refetch()} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Sync
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Filter className="w-3 h-3" /> Filter
          </button>
        </div>
      </div>

      <section className="bg-card border border-border/50 rounded-sm shadow-sm">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-secondary/5">
          <h2 className="text-lg font-light tracking-tight flex items-center gap-3">
            <ShoppingCart className="w-4 h-4 text-primary" /> Active Orders
          </h2>
          <div className="relative w-full md:w-auto">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
             <input 
               placeholder="Search reference or number..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full md:w-64 bg-background border border-border pl-8 pr-4 py-2 text-[10px] uppercase tracking-widest focus:outline-none focus:border-primary transition-colors text-foreground"
             />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-[0.3em] text-muted-foreground bg-secondary/5 font-bold">
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-xs italic tracking-widest text-muted-foreground">Loading orders...</td></tr>
              ) : filteredOrders?.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-xs italic tracking-widest text-muted-foreground">No orders found.</td></tr>
              ) : filteredOrders?.map((o: any) => (
                <tr key={o.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold tracking-widest">
                      {o.id.substring(0, 8).toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs tracking-wide">{o.customerName || o.user?.firstName || 'Guest'}</p>
                    <p className="text-[10px] text-muted-foreground">{o.whatsappNumber || o.user?.email || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                     {new Date(o.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold tabular-nums">
                    KSh {o.totalAmount?.toLocaleString() || '0'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 border rounded-full ${
                      o.status === 'COMPLETED' ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/10' : 
                      o.status === 'CANCELLED' ? 'border-destructive/30 text-destructive bg-destructive/10' : 
                      'border-amber-500/50 text-amber-500 bg-amber-500/10'}`}>
                       {o.status || 'PENDING'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-primary/10 rounded-full transition-colors text-muted-foreground hover:text-primary">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
