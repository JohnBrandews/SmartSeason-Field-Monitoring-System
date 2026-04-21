"use client";

import { useSession } from "next-auth/react";
import { Bell, Search, User as UserIcon } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Overview</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search fields or agents..." 
            className="search-input" 
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <button className="btn" style={{ padding: '0.5rem', background: 'none', border: '1px solid var(--border)' }}>
          <Bell size={20} color="var(--text-muted)" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>{session?.user?.name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.025em' }}>{(session?.user as any)?.role}</p>
          </div>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '50%', 
            background: '#ecfdf5', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            border: '1.5px solid #10b981', 
            overflow: 'hidden',
            boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.05)'
          }}>
             {session?.user?.image ? (
               <img src={session.user.image} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             ) : (
               <UserIcon size={20} color="#10b981" />
             )}
          </div>
        </div>
      </div>
    </header>
  );
}
