"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Sprout, 
  Users, 
  Settings, 
  LogOut, 
  Leaf,
  Bell,
  LineChart,
  UserCircle
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || "AGENT";

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Fields", href: "/fields", icon: Sprout },
    { name: "Profile", href: "/profile", icon: UserCircle },
    ...(userRole === "ADMIN" ? [
      { name: "Agents", href: "/admin/agents", icon: Users },
      { name: "Analytics", href: "/analytics", icon: LineChart },
    ] : []),
  ];

  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Leaf size={32} strokeWidth={2.5} />
        <span>SmartSeason</span>
      </Link>

      <nav style={{ flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <button 
          onClick={() => signOut()}
          className="nav-item" 
          style={{ width: '100%', border: 'none', background: 'none' }}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
