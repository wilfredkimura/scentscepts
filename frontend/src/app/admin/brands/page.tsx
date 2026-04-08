'use client';

import { useFetch } from '@/hooks/useFetch';
import { Tag, Search, Edit3, Trash2, Plus, RefreshCw, X, Globe } from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/api';

interface Brand {
  id: string;
  name: string;
  logoUrl: string | null;
}

const emptyForm = { name: '', logoUrl: '' };

export default function AdminBrandsPage() {
  const { data: response, isLoading, refetch } = useFetch<any>('/api/v1/brands?size=100&sort=name,asc');
  const brands: Brand[] = response?.content || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setFormData({ name: brand.name, logoUrl: brand.logoUrl || '' });
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { name: formData.name, logoUrl: formData.logoUrl || null };
      if (editingId) {
        await api.put(`/api/v1/brands/${editingId}`, payload);
      } else {
        await api.post('/api/v1/brands', payload);
      }
      setModalOpen(false);
      refetch();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save brand. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (brand: Brand) => {
    if (!confirm(`Delete brand "${brand.name}"? This may affect linked products.`)) return;
    try {
      await api.delete(`/api/v1/brands/${brand.id}`);
      refetch();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to delete brand.');
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-primary text-[10px] tracking-[0.5em] uppercase font-bold">Brand Registry</span>
          <h1 className="text-4xl font-light tracking-tight">Brands</h1>
          <p className="text-xs text-muted-foreground tracking-wide">
            Manage the fragrance houses available in your catalog.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-3 h-3" /> Add Brand
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-sm p-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Total Brands</p>
          <p className="text-2xl font-light tabular-nums">{brands.length}</p>
        </div>
        <div className="bg-card border border-border/50 rounded-sm p-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">With Logos</p>
          <p className="text-2xl font-light tabular-nums text-emerald-500">
            {brands.filter((b) => b.logoUrl).length}
          </p>
        </div>
        <div className="bg-card border border-border/50 rounded-sm p-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">No Logo</p>
          <p className="text-2xl font-light tabular-nums text-amber-500">
            {brands.filter((b) => !b.logoUrl).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <section className="bg-card border border-border/50 rounded-sm shadow-sm">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-secondary/5">
          <h2 className="text-lg font-light tracking-tight flex items-center gap-3">
            <Tag className="w-4 h-4 text-primary" /> Brand Directory
          </h2>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <input
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-background border border-border pl-8 pr-4 py-2 text-[10px] uppercase tracking-widest focus:outline-none focus:border-primary transition-colors text-foreground"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-[0.3em] text-muted-foreground bg-secondary/5 font-bold">
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Logo URL</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-xs italic tracking-widest text-muted-foreground animate-pulse">
                    Loading brands...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-xs italic tracking-widest text-muted-foreground">
                    {searchTerm ? 'No brands match your search.' : 'No brands found. Add one to get started.'}
                  </td>
                </tr>
              ) : (
                filtered.map((brand) => (
                  <tr key={brand.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {/* Logo preview */}
                        <div className="w-10 h-10 bg-secondary rounded-sm overflow-hidden flex-shrink-0 border border-border/50">
                          {brand.logoUrl ? (
                            <img
                              src={brand.logoUrl}
                              alt={brand.name}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <Globe className="w-4 h-4 opacity-40" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold tracking-wide">{brand.name}</p>
                          <p className="text-[9px] text-muted-foreground font-mono">{brand.id.slice(0, 8)}…</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {brand.logoUrl ? (
                        <a
                          href={brand.logoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-primary underline underline-offset-2 hover:text-primary/70 transition-colors truncate max-w-[200px] block"
                        >
                          {brand.logoUrl}
                        </a>
                      ) : (
                        <span className="text-[10px] text-muted-foreground italic">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(brand)}
                          title="Edit brand"
                          className="p-2 hover:bg-primary/10 rounded-full transition-colors text-muted-foreground hover:text-primary"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(brand)}
                          title="Delete brand"
                          className="p-2 hover:bg-destructive/10 rounded-full transition-colors text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* CRUD Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="bg-card w-full max-w-md rounded-sm shadow-2xl flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50 bg-secondary/5">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
                {editingId ? 'Edit Brand' : 'Add New Brand'}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-[10px] uppercase tracking-widest p-3 rounded-sm">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold">
                  Brand Name <span className="text-destructive">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Creed, Chanel, Tom Ford"
                  className="w-full bg-background border border-border p-2 text-sm focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold">Logo URL</label>
                <input
                  type="url"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  className="w-full bg-background border border-border p-2 text-sm focus:border-primary focus:outline-none transition-colors"
                />
                <p className="text-[9px] text-muted-foreground tracking-wider">
                  Optional. Paste a direct image URL for the brand logo.
                </p>
              </div>

              {/* Logo preview */}
              {formData.logoUrl && (
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Preview</label>
                  <div className="w-20 h-20 bg-secondary border border-border/50 rounded-sm overflow-hidden flex items-center justify-center">
                    <img
                      src={formData.logoUrl}
                      alt="Logo preview"
                      className="w-full h-full object-contain p-2"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-4 border-t border-border/50">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
