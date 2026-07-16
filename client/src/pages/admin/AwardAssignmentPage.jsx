import { useState } from 'react';
import {
  Trophy, Award, MapPin, Truck, CheckCircle, XCircle,
  Edit3, Search, ChevronLeft, ChevronRight, PieChart
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const awardsData = [
  { rank: 1, name: 'Ahmed Khan', awardType: 'Gold Medal', status: 'Assigned', delivery: 'Delivered', address: 'House 12, Block B, Karachi', tracking: 'TRK-001' },
  { rank: 2, name: 'Hassan Shah', awardType: 'Silver Medal', status: 'Assigned', delivery: 'Pending', address: 'Street 5, Phase 2, Lahore', tracking: '' },
  { rank: 3, name: 'Usman Raza', awardType: 'Bronze Medal', status: 'Assigned', delivery: 'Pending', address: 'Flat 8, Gulshan, Hyderabad', tracking: '' },
  { rank: 4, name: 'Fatima Ali', awardType: 'Certificate of Merit', status: 'Pending', delivery: 'Pending', address: 'House 3, Model Town, Islamabad', tracking: '' },
  { rank: 5, name: 'Sana Tariq', awardType: 'Certificate of Merit', status: 'Pending', delivery: 'Pending', address: 'Village 7, District Swat', tracking: '' },
];

const awardTypeOptions = ['Gold Medal', 'Silver Medal', 'Bronze Medal', 'Certificate of Merit', 'Special Recognition'];

export default function AwardAssignmentPage() {
  const [phase, setPhase] = useState('Phase 1');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editAward, setEditAward] = useState('');
  const [trackingInputs, setTrackingInputs] = useState({});

  const filtered = awardsData.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const deliveredCount = awardsData.filter((a) => a.delivery === 'Delivered').length;
  const pendingCount = awardsData.filter((a) => a.delivery === 'Pending').length;
  const deliveredPct = ((deliveredCount / awardsData.length) * 100).toFixed(0);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Award Assignment</h1>
            <button className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors">
              <Trophy size={18} />
              Assign Awards
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
              >
                <option>Phase 1</option>
                <option>Phase 2</option>
                <option>Phase 3</option>
                <option>Phase 4</option>
              </select>
            </div>
            <div className="relative flex-1 max-w-xs mt-5">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Auto-Assigned Awards</h3>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-4 py-3 font-medium">Rank</th>
                      <th className="text-left px-4 py-3 font-medium">Student Name</th>
                      <th className="text-left px-4 py-3 font-medium">Award Type</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-left px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((a, i) => (
                      <tr key={a.rank} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                            a.rank === 1 ? 'bg-yellow-50 text-yellow-700' :
                            a.rank === 2 ? 'bg-gray-100 text-gray-600' :
                            a.rank === 3 ? 'bg-amber-50 text-amber-700' :
                            'bg-gray-50 text-gray-500'
                          }`}>{a.rank}</span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                        <td className="px-4 py-3">
                          {editingId === a.rank ? (
                            <select
                              value={editAward}
                              onChange={(e) => setEditAward(e.target.value)}
                              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-[#1A73E8]"
                            >
                              {awardTypeOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="flex items-center gap-1 text-gray-800">
                              <Award size={14} className="text-[#F1C40F]" />
                              {a.awardType}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            a.status === 'Assigned' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {editingId === a.rank ? (
                            <div className="flex items-center gap-1">
                              <button onClick={() => { setEditingId(null); }} className="px-2 py-1 bg-[#2ECC71] text-white text-xs rounded hover:bg-[#27AE60]">Save</button>
                              <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300">Cancel</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => { setEditingId(a.rank); setEditAward(a.awardType); }}
                              className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors"
                              title="Override Award"
                            >
                              <Edit3 size={15} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>Page {currentPage} of {totalPages || 1}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={16} /></button>
                  <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart size={16} className="text-[#1A73E8]" />
                Award Distribution
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-36 h-36">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2ECC71" strokeWidth="3" strokeDasharray={`${deliveredPct} ${100 - deliveredPct}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{deliveredPct}%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" /> Delivered</span>
                  <span className="font-medium">{deliveredCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-gray-200" /> Pending</span>
                  <span className="font-medium">{pendingCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Truck size={16} className="text-[#1A73E8]" />
                Delivery Tracking
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Student Name</th>
                    <th className="text-left px-4 py-3 font-medium">Award</th>
                    <th className="text-left px-4 py-3 font-medium">Delivery Address</th>
                    <th className="text-left px-4 py-3 font-medium">Tracking Number</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {awardsData.map((a) => (
                    <tr key={a.rank} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                      <td className="px-4 py-3 text-gray-600">{a.awardType}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-[180px] truncate">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {a.address}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {a.delivery === 'Delivered' ? (
                          <span className="font-mono text-xs text-gray-600">{a.tracking}</span>
                        ) : (
                          <input
                            type="text"
                            placeholder="Enter tracking #"
                            value={trackingInputs[a.rank] || ''}
                            onChange={(e) => setTrackingInputs({ ...trackingInputs, [a.rank]: e.target.value })}
                            className="w-32 border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-[#1A73E8]"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {a.delivery === 'Delivered' ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-700 font-medium">
                            <CheckCircle size={12} />
                            Delivered
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-yellow-700 font-medium">
                            <XCircle size={12} />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {a.delivery === 'Pending' && (
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#2ECC71] text-white rounded-lg text-xs font-medium hover:bg-[#27AE60] transition-colors">
                            <CheckCircle size={14} />
                            Mark Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
