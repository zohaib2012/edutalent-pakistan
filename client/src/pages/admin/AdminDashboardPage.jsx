import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Banknote, ClipboardCheck, BarChart3, Trophy,
  Search, ArrowRight, Wallet, FileDown, Megaphone, Loader2
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { getDashboardStats, getRecentActivity } from '../../services/api';
import BarChart from '../../components/charts/BarChart';
import DonutChart from '../../components/charts/DonutChart';
import TrendChart from '../../components/charts/TrendChart';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        getDashboardStats(),
        getRecentActivity()
      ]);
      setStats(statsRes.data);
      setActivity(activityRes.data);
    } catch {
      setStats(null);
      setActivity([]);
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats ? [
    { icon: Users, label: 'Total Students', value: stats.totalStudents?.toLocaleString() || '0', color: 'bg-blue-50 text-[#1A73E8]', iconBg: 'bg-[#1A73E8]/10' },
    { icon: Banknote, label: 'Pending Payments', value: stats.pendingPayments?.toLocaleString() || '0', color: 'bg-yellow-50 text-[#F1C40F]', iconBg: 'bg-[#F1C40F]/10' },
    { icon: ClipboardCheck, label: 'Tests Completed', value: stats.testsCompleted?.toLocaleString() || '0', color: 'bg-green-50 text-[#2ECC71]', iconBg: 'bg-[#2ECC71]/10' },
    { icon: BarChart3, label: 'Results Published', value: stats.resultsPublished?.toLocaleString() || '0', color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100' },
    { icon: Trophy, label: 'Awards Assigned', value: stats.awardsAssigned?.toLocaleString() || '0', color: 'bg-amber-50 text-amber-600', iconBg: 'bg-amber-100' },
  ] : [];

  const quickActions = [
    { label: 'Verify Payments', icon: Wallet, path: '/admin/fee-verification', color: 'text-[#1A73E8] bg-blue-50' },
    { label: 'Generate Slips', icon: FileDown, path: '/admin/slips', color: 'text-[#2ECC71] bg-green-50' },
    { label: 'Publish Results', icon: BarChart3, path: '/admin/results', color: 'text-purple-600 bg-purple-50' },
    { label: 'Send Notification', icon: Megaphone, path: '/admin/notifications', color: 'text-amber-600 bg-amber-50' },
  ];

  const statusLabel = (status) => {
    const labels = {
      registered: 'Registered', challan_issued: 'Challan Issued',
      payment_pending: 'Pending', payment_verified: 'Verified',
      slip_issued: 'Slip Issued', test_completed: 'Test Completed',
      result_published: 'Published'
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] outline-none w-64"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6 mb-8">
            {statCards.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className={`inline-flex p-2.5 rounded-lg ${stat.iconBg} mb-3`}>
                  <stat.icon size={22} className={stat.color.split(' ')[1]} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  to={action.path}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <action.icon size={22} className={action.color.split(' ').slice(1).join(' ')} />
                    <span className="font-medium text-sm">{action.label}</span>
                  </div>
                  <ArrowRight size={18} className="text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Charts & Analytics</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-sm font-medium text-gray-700 mb-4">Registration by Province</p>
                <BarChart data={(stats?.registrationByProvince || []).map((p) => ({ label: p._id || 'Unknown', value: p.count }))} />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-sm font-medium text-gray-700 mb-4">Registration by Phase</p>
                <BarChart data={(stats?.registrationByPhase || []).map((p) => ({ label: p.name || 'Unknown', value: p.count }))} />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-sm font-medium text-gray-700 mb-4">Daily Registrations (Last 14 Days)</p>
                <TrendChart data={(stats?.dailyTrend || []).map((d) => ({ date: d._id, value: d.count }))} />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-sm font-medium text-gray-700 mb-4">Payment Status</p>
                <DonutChart data={[
                  { label: 'Verified', value: stats?.paymentStatus?.verified || 0, color: '#2ECC71' },
                  { label: 'Pending', value: stats?.paymentStatus?.pending || 0, color: '#F1C40F' },
                  { label: 'Rejected', value: stats?.paymentStatus?.rejected || 0, color: '#E74C3C' },
                ]} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 bg-white rounded-xl border border-gray-200">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-3 font-medium">Date</th>
                      <th className="text-left px-5 py-3 font-medium">Student</th>
                      <th className="text-left px-5 py-3 font-medium">Registration</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-5 py-8 text-center text-gray-400 text-sm">No recent activity</td>
                      </tr>
                    )}
                    {activity.map((row, i) => (
                      <tr key={row._id || i} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-3 text-gray-600">{row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : '-'}</td>
                        <td className="px-5 py-3 text-gray-800">{row.fullName}</td>
                        <td className="px-5 py-3 font-mono text-xs text-gray-600">{row.registrationNumber}</td>
                        <td className="px-5 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {statusLabel(row.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Quick Summary</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Students</span>
                  <span className="font-semibold">{stats?.totalStudents || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pending Payments</span>
                  <span className="font-semibold text-yellow-600">{stats?.pendingPayments || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tests Completed</span>
                  <span className="font-semibold text-green-600">{stats?.testsCompleted || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Results Published</span>
                  <span className="font-semibold text-purple-600">{stats?.resultsPublished || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Awards Assigned</span>
                  <span className="font-semibold text-amber-600">{stats?.awardsAssigned || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
