'use client';

import { useFetch } from '@/hooks/useFetch';
import { Package, Search, Edit3, Trash2, Plus, RefreshCw, X } from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/api';

export default function AdminInventoryPage() {
  const { data: response, isLoading, refetch } = useFetch<any>('/api/v1/products?size=50');
  const { data: brandsResponse } = useFetch<any>('/api/v1/brands?size=50');
  const products = response?.content || [];
  const brands = brandsResponse?.content || [];
  const [searchTerm, setSearchTerm] = useState('');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', brandId: '', description: '', topNotes: '', middleNotes: '', baseNotes: '',
    decantPrice: 0, fullBottlePrice: 0, availability: 'IN_STOCK', stockQuantity: 0, imageUrl: ''
  });

  const filteredProducts = products.filter((p: any) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (product?: any) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        brandId: product.brand?.id || '',
        description: product.description,
        topNotes: product.topNotes,
        middleNotes: product.middleNotes,
        baseNotes: product.baseNotes,
        decantPrice: product.decantPrice,
        fullBottlePrice: product.fullBottlePrice,
        availability: product.availability,
        stockQuantity: product.stockQuantity,
        imageUrl: product.imageUrl || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '', brandId: '', description: '', topNotes: '', middleNotes: '', baseNotes: '',
        decantPrice: 0, fullBottlePrice: 0, availability: 'IN_STOCK', stockQuantity: 0, imageUrl: ''
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, brandId: formData.brandId === '' ? null : formData.brandId };
      if (editingId) {
        await api.put(`/api/v1/products/${editingId}`, payload);
      } else {
        await api.post('/api/v1/products', payload);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      alert('Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/v1/products/${id}`);
        refetch();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-primary text-[10px] tracking-[0.5em] uppercase font-bold">Inventory</span>
          <h1 className="text-4xl font-light tracking-tight">Product Catalog</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => refetch()} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
            <Plus className="w-3 h-3" /> Add Product
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <section className="hidden md:block bg-card border border-border/50 rounded-sm shadow-sm relative">
        <div className="p-6 border-b border-border/50 flex items-center justify-between gap-4 bg-secondary/5">
          <h2 className="text-lg font-light tracking-tight flex items-center gap-3">
            <Package className="w-4 h-4 text-primary" /> Current Stock
          </h2>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
             <input 
               placeholder="Search fragrances..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-64 bg-background border border-border pl-8 pr-4 py-2 text-[10px] uppercase tracking-widest focus:outline-none focus:border-primary transition-colors text-foreground"
             />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-[0.3em] text-muted-foreground bg-secondary/5 font-bold">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-xs italic tracking-widest text-muted-foreground">Loading products...</td></tr>
              ) : filteredProducts?.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-xs italic tracking-widest text-muted-foreground">No inventory items found.</td></tr>
              ) : filteredProducts?.map((p: any) => (
                <tr key={p.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Package className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-wide">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{p.brand?.name || 'No Brand'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] uppercase tracking-wider space-y-1">
                      <div><span className="text-muted-foreground">D:</span> KSh {p.decantPrice?.toLocaleString() || 0}</div>
                      <div><span className="text-muted-foreground">F:</span> KSh {p.fullBottlePrice?.toLocaleString() || 0}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold tabular-nums">
                    {p.stockQuantity}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 border rounded-full ${p.availability === 'IN_STOCK' ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/5' : 'border-destructive/30 text-destructive bg-destructive/5'}`}>
                       {p.availability?.replace('_', ' ') || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => openModal(p)} className="p-2 hover:bg-primary/10 rounded-full transition-colors text-muted-foreground hover:text-primary">
                         <Edit3 className="w-4 h-4" />
                       </button>
                       <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-destructive/10 rounded-full transition-colors text-muted-foreground hover:text-destructive">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile Card View */}
      <section className="md:hidden space-y-6">
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
           <input 
             placeholder="Search catalog..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full bg-card border border-border/50 pl-10 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-primary transition-colors text-foreground"
           />
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-xs italic tracking-widest text-muted-foreground">Loading products...</div>
        ) : filteredProducts?.length === 0 ? (
          <div className="py-12 text-center text-xs italic tracking-widest text-muted-foreground">No inventory items found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredProducts.map((p: any) => (
              <div key={p.id} className="bg-card border border-border/50 p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-wide">{p.name}</p>
                      <p className="text-[10px] text-primary uppercase font-bold tracking-widest">{p.brand?.name || 'No Brand'}</p>
                    </div>
                  </div>
                  <span className={`text-[8px] uppercase tracking-widest font-bold px-3 py-1 border rounded-full ${p.availability === 'IN_STOCK' ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/5' : 'border-destructive/30 text-destructive bg-destructive/5'}`}>
                     {p.availability?.replace('_', ' ') || 'UNKNOWN'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                  <div className="space-y-1">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
                    <div className="text-[10px] space-y-0.5 font-medium">
                      <p>Decant: KSh {p.decantPrice?.toLocaleString()}</p>
                      <p>Full: KSh {p.fullBottlePrice?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">Current Stock</p>
                    <p className="text-sm font-bold tabular-nums">{p.stockQuantity} Units</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4">
                   <button onClick={() => openModal(p)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-secondary text-[10px] uppercase font-bold tracking-widest border border-border/50">
                     <Edit3 className="w-3 h-3" /> Edit
                   </button>
                   <button onClick={() => handleDelete(p.id)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-destructive/5 text-destructive text-[10px] uppercase font-bold tracking-widest border border-destructive/20">
                     <Trash2 className="w-3 h-3" /> Delete
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CRUD Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-card w-full max-w-2xl border border-border shadow-2xl flex flex-col my-auto">
            <div className="flex items-center justify-between p-6 border-b border-border/50 bg-secondary/5">
               <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{editingId ? 'Modify Fragrance' : 'Acquire New Product'}</h3>
               <button onClick={() => setModalOpen(false)} className="p-2 -mr-2"><X className="w-5 h-5 text-muted-foreground hover:text-foreground" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Product Name <span className="text-destructive">*</span></label>
                   <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border p-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Brand Selection</label>
                   <select value={formData.brandId} onChange={e => setFormData({...formData, brandId: e.target.value})} className="w-full bg-background border border-border p-3 text-sm focus:border-primary focus:outline-none transition-colors">
                     <option value="">-- Select Brand --</option>
                     {brands.map((b: any) => (
                       <option key={b.id} value={b.id}>{b.name}</option>
                     ))}
                   </select>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Decant Pricing (KSh) <span className="text-destructive">*</span></label>
                   <input required type="number" value={formData.decantPrice} onChange={e => setFormData({...formData, decantPrice: parseFloat(e.target.value) || 0})} className="w-full bg-background border border-border p-3 text-sm focus:border-primary focus:outline-none" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Full Bottle Pricing (KSh) <span className="text-destructive">*</span></label>
                   <input required type="number" value={formData.fullBottlePrice} onChange={e => setFormData({...formData, fullBottlePrice: parseFloat(e.target.value) || 0})} className="w-full bg-background border border-border p-3 text-sm focus:border-primary focus:outline-none" />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Stock Level <span className="text-destructive">*</span></label>
                   <input required type="number" value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: parseInt(e.target.value) || 0})} className="w-full bg-background border border-border p-3 text-sm focus:border-primary focus:outline-none" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Availability Status <span className="text-destructive">*</span></label>
                   <select required value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})} className="w-full bg-background border border-border p-3 text-sm focus:border-primary focus:outline-none">
                     <option value="IN_STOCK">In Stock</option>
                     <option value="OUT_OF_STOCK">Out of Stock</option>
                     <option value="DISCONTINUED">Discontinued</option>
                   </select>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Top Notes</label>
                   <input type="text" value={formData.topNotes} onChange={e => setFormData({...formData, topNotes: e.target.value})} className="w-full bg-background border border-border p-3 text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Heart Notes</label>
                   <input type="text" value={formData.middleNotes} onChange={e => setFormData({...formData, middleNotes: e.target.value})} className="w-full bg-background border border-border p-3 text-sm" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Base Notes</label>
                   <input type="text" value={formData.baseNotes} onChange={e => setFormData({...formData, baseNotes: e.target.value})} className="w-full bg-background border border-border p-3 text-sm" />
                 </div>
               </div>

               <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Image Resource URL</label>
                   <input type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." className="w-full bg-background border border-border p-3 text-sm" />
               </div>

               <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Description <span className="text-destructive">*</span></label>
                   <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border p-3 text-sm focus:border-primary focus:outline-none resize-none" />
               </div>
               
               <div className="pt-8 flex flex-col sm:flex-row justify-end gap-4 border-t border-border/30">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors border border-transparent sm:border-border/30">Discard</button>
                  <button type="submit" className="px-8 py-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                    {editingId ? 'Confirm Update' : 'Initialize Product'}
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
