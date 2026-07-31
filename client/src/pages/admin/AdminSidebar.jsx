import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Banknote, Ticket, ClipboardList,
  BarChart3, Trophy, Bell, FileText, ChevronLeft, ChevronRight,
  Settings, FileCheck, FileUp, Megaphone, ScrollText, LogOut, Layers
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Students', path: '/admin/students' },
  { icon: FileCheck, label: 'Applications', path: '/admin/applications' },
  { icon: Banknote, label: 'Fee Verification', path: '/admin/fee-verification' },
  { icon: Ticket, label: 'Slips', path: '/admin/slips' },
  { icon: ClipboardList, label: 'Tests', path: '/admin/tests' },
  { icon: Layers, label: 'Phases', path: '/admin/phases' },
  { icon: BarChart3, label: 'Results', path: '/admin/results' },
  { icon: ScrollText, label: 'Certificates', path: '/admin/certificate-mgmt' },
  { icon: Trophy, label: 'Awards', path: '/admin/awards' },
  { icon: Megaphone, label: 'Announcements', path: '/admin/announcements-mgmt' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  { icon: FileUp, label: 'Documents', path: '/admin/documents' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: FileText, label: 'Logs', path: '/admin/logs' },
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

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-gray-900 text-white flex flex-col transition-all duration-300 min-h-screen`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <Link to="/admin/dashboard" className="text-xl font-bold tracking-tight">
            EduTalent <span className="text-[#1A73E8]">Admin</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/admin/dashboard" className="text-xl font-bold mx-auto">
            <span className="text-[#1A73E8]">E</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white p-1 rounded"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#1A73E8] text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-700">
        {!collapsed && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        )}
        {collapsed && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        )}
        <div className="mt-3 text-xs text-gray-500 text-center">
          {!collapsed && <span>v1.0.0</span>}
        </div>
      </div>
    </div>
  );
}
