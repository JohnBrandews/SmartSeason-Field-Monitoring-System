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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{session?.user?.name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{(session?.user as any)?.role}</p>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary)', overflow: 'hidden' }}>
             {session?.user?.image ? (
               <img src={session.user.image} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             ) : (
               <UserIcon size={20} color="var(--primary)" style={{ margin: '0 auto' }} />
             )}
          </div>
        </div>
      </div>
    </header>
  );
}
