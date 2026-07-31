import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Banknote, Ticket, ClipboardList,
  BarChart3, Trophy, Bell, FileText, ChevronLeft, ChevronRight,
  Settings, FileCheck, FileUp, Megaphone, ScrollText, LogOut,
  Layers, GraduationCap, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const navSections = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    ],
  },
  {
    label: 'Students',
    items: [
      { icon: Users, label: 'Students', path: '/admin/students' },
      { icon: FileCheck, label: 'Applications', path: '/admin/applications' },
      { icon: Banknote, label: 'Fee Verification', path: '/admin/fee-verification' },
      { icon: Ticket, label: 'Slips', path: '/admin/slips' },
    ],
  },
  {
    label: 'Exams & Results',
    items: [
      { icon: ClipboardList, label: 'Tests', path: '/admin/tests' },
      { icon: Layers, label: 'Phases', path: '/admin/phases' },
      { icon: BarChart3, label: 'Results', path: '/admin/results' },
      { icon: ScrollText, label: 'Certificates', path: '/admin/certificate-mgmt' },
      { icon: Trophy, label: 'Awards', path: '/admin/awards' },
    ],
  },
  {
    label: 'Communication',
    items: [
      { icon: Megaphone, label: 'Announcements', path: '/admin/announcements-mgmt' },
      { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: FileUp, label: 'Documents', path: '/admin/documents' },
      { icon: Settings, label: 'Settings', path: '/admin/settings' },
      { icon: FileText, label: 'Logs', path: '/admin/logs' },
    ],
  },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  let adminUser = null;
  try {
    const raw = localStorage.getItem('adminUser');
    adminUser = raw ? JSON.parse(raw) : null;
  } catch { /* ignore */ }

  return (
    <div
      className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white flex flex-col transition-all duration-300 min-h-screen border-r border-gray-800`}
    >
      {/* Brand header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
        <Link to="/admin/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-900/40 shrink-0">
            <GraduationCap size={20} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-heading font-bold text-base leading-tight truncate">EduTalent</p>
              <p className="text-[11px] font-medium text-primary-300 uppercase tracking-wider">Admin Panel</p>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors shrink-0"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-5 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{section.label}</p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      collapsed ? 'justify-center' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-900/40'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gold" />
                    )}
                    <item.icon
                      size={20}
                      className={isActive ? '' : 'transition-colors group-hover:text-primary-300'}
                    />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800">
        {!collapsed && adminUser && (
          <div className="flex items-center gap-3 px-2 py-2.5 rounded-lg bg-white/5 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center text-gray-900 font-heading font-bold text-sm shrink-0">
              {((adminUser.fullName || adminUser.name || 'A')[0] || 'A').toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{adminUser.fullName || adminUser.name || 'Administrator'}</p>
              <p className="text-[11px] text-gray-400 flex items-center gap-1"><ShieldCheck size={12} className="text-primary-300" /> Administrator</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Logout"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
        {!collapsed && (
          <p className="mt-2 text-[11px] text-gray-600 text-center">EduTalent Admin Panel v1.0.0</p>
        )}
      </div>
    </div>
  );
}
