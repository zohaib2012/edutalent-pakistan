import { Link } from 'react-router-dom';
import {
  Users, Banknote, ClipboardCheck, BarChart3, Trophy,
  Search, ArrowRight, Wallet, FileDown, Megaphone, ArrowUp, ArrowDown
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const stats = [
  { icon: Users, label: 'Total Students', value: '12,847', color: 'bg-blue-50 text-[#1A73E8]', iconBg: 'bg-[#1A73E8]/10' },
  { icon: Banknote, label: 'Pending Payments', value: '384', color: 'bg-yellow-50 text-[#F1C40F]', iconBg: 'bg-[#F1C40F]/10' },
  { icon: ClipboardCheck, label: 'Tests Completed', value: '2,156', color: 'bg-green-50 text-[#2ECC71]', iconBg: 'bg-[#2ECC71]/10' },
  { icon: BarChart3, label: 'Results Published', value: '1,892', color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100' },
  { icon: Trophy, label: 'Awards Assigned', value: '423', color: 'bg-amber-50 text-amber-600', iconBg: 'bg-amber-100' },
];

const quickActions = [
  { label: 'Verify Payments', icon: Wallet, path: '/admin/fee-verification', color: 'text-[#1A73E8] bg-blue-50' },
  { label: 'Generate Slips', icon: FileDown, path: '/admin/slips', color: 'text-[#2ECC71] bg-green-50' },
  { label: 'Publish Results', icon: BarChart3, path: '/admin/results', color: 'text-purple-600 bg-purple-50' },
  { label: 'Send Notification', icon: Megaphone, path: '/admin/notifications', color: 'text-amber-600 bg-amber-50' },
];

const recentActivity = [
  { date: '2026-07-11', activity: 'Payment verified - Challan #CH-2304', student: 'Ahmed Khan', status: 'Verified' },
  { date: '2026-07-11', activity: 'Test submitted - Phase 2', student: 'Fatima Ali', status: 'Completed' },
  { date: '2026-07-10', activity: 'Slip generated - Roll No ST-4521', student: 'Usman Raza', status: 'Issued' },
  { date: '2026-07-10', activity: 'New registration - Phase 3', student: 'Zainab Ahmed', status: 'Registered' },
  { date: '2026-07-09', activity: 'Result published - Phase 1', student: 'Hassan Shah', status: 'Published' },
];

const phaseStats = [
  { phase: 'Phase 1', students: 4250, tests: 3980, passed: 3210 },
  { phase: 'Phase 2', students: 3840, tests: 3520, passed: 2890 },
  { phase: 'Phase 3', students: 2910, tests: 2650, passed: 2140 },
  { phase: 'Phase 4', students: 1847, tests: 1560, passed: 1250 },
];

export default function AdminDashboardPage() {
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
            {stats.map((stat, i) => (
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
                  className={`flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow ${action.color.split(' ').slice(1).join(' ')}`}
                >
                  <div className="flex items-center gap-3">
                    <action.icon size={22} />
                    <span className="font-medium text-sm">{action.label}</span>
                  </div>
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Charts & Analytics</h2>
            <div className="grid grid-cols-2 gap-6">
              {['Registration by Province', 'Registration by Phase', 'Daily Trend', 'Payment Status'].map((label, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <p className="text-sm font-medium text-gray-700 mb-4">{label}</p>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Chart Placeholder</span>
                  </div>
                </div>
              ))}
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
                      <th className="text-left px-5 py-3 font-medium">Activity</th>
                      <th className="text-left px-5 py-3 font-medium">Student</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((row, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-3 text-gray-600">{row.date}</td>
                        <td className="px-5 py-3 text-gray-800">{row.activity}</td>
                        <td className="px-5 py-3 text-gray-600">{row.student}</td>
                        <td className="px-5 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            {row.status}
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
                <h2 className="text-lg font-semibold text-gray-900">Phase-wise Stats</h2>
              </div>
              <div className="p-5 space-y-4">
                {phaseStats.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{p.phase}</span>
                      <span className="text-gray-500">{p.students} students</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#1A73E8] h-2 rounded-full"
                        style={{ width: `${(p.passed / p.students) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{p.tests} tests</span>
                      <span>{p.passed} passed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
