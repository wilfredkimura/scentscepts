'use client';

import { useFetch, useMutation } from '@/hooks/useFetch';
import type { UserDto } from '@/lib/types';
import { Users, Search, Settings, Trash2, ChevronRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function AdminUsersPage() {
  const { data: users, isLoading, refetch } = useFetch<UserDto[]>('/api/v1/admin/users');
  const [searchTerm, setSearchTerm] = useState('');

  // Not implemented in mutation hook properly for dynamic URLs, using direct fetch for simplicity if needed
  const handleDeleteUser = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:8080/api/v1/admin/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        refetch();
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const filteredUsers = users?.filter(u => 
    u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-primary text-[10px] tracking-[0.5em] uppercase font-bold">People</span>
          <h1 className="text-4xl font-light tracking-tight">Society Members</h1>
        </div>
        <button onClick={() => refetch()} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Directory
        </button>
      </div>

      <section className="bg-card border border-border/50 rounded-sm shadow-sm">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-secondary/5">
          <h2 className="text-lg font-light tracking-tight flex items-center gap-3">
            <Users className="w-4 h-4 text-primary" /> User Directory
          </h2>
          <div className="relative w-full md:w-auto">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
             <input 
               placeholder="Search members..." 
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
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-xs italic tracking-widest text-muted-foreground">Synchronizing records...</td></tr>
              ) : filteredUsers?.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-xs italic tracking-widest text-muted-foreground">No members found.</td></tr>
              ) : filteredUsers?.map((u) => (
                <tr key={u.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                         {u.firstName?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-wide">{u.firstName} {u.lastName}</p>
                        <p className="text-[10px] text-muted-foreground lowercase">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 border rounded-full ${u.roles.includes('ROLE_ADMIN') ? 'border-primary text-primary bg-primary/5' : 'border-border text-muted-foreground'}`}>
                       {u.roles.includes('ROLE_ADMIN') ? 'Administrator' : 'Society Member'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground font-light">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 hover:bg-primary/10 rounded-full transition-colors text-muted-foreground hover:text-primary" title="Manage Roles (Not Implemented)">
                         <Settings className="w-3 h-3" />
                       </button>
                       <button 
                         onClick={() => handleDeleteUser(u.id, u.firstName)}
                         className="p-2 hover:bg-destructive/10 rounded-full transition-colors text-muted-foreground hover:text-destructive"
                         title="Delete User"
                        >
                         <Trash2 className="w-3 h-3" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border bg-secondary/5 flex justify-between items-center px-6">
           <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Showing {filteredUsers?.length || 0} relative members</p>
           <button className="text-[9px] uppercase tracking-[0.3em] font-bold text-primary flex items-center gap-2 hover:gap-3 transition-all" disabled>
              Next Page <ChevronRight className="w-3 h-3" />
           </button>
        </div>
      </section>
    </div>
  );
}
