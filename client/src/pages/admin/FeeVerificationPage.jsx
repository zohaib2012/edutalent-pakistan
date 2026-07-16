import { useState } from 'react';
import {
  CheckCircle, XCircle, Search, Filter, Download,
  ChevronLeft, ChevronRight, Image, ExternalLink
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const feeData = [
  { id: 1, name: 'Ahmed Khan', challan: 'CH-2301', amount: 2500, image: '/placeholder-challan.jpg', date: '2026-07-08', status: 'pending' },
  { id: 2, name: 'Fatima Ali', challan: 'CH-2302', amount: 2500, image: '/placeholder-challan.jpg', date: '2026-07-08', status: 'pending' },
  { id: 3, name: 'Usman Raza', challan: 'CH-2303', amount: 2500, image: '/placeholder-challan.jpg', date: '2026-07-07', status: 'pending' },
  { id: 4, name: 'Zainab Ahmed', challan: 'CH-2304', amount: 2500, image: '/placeholder-challan.jpg', date: '2026-07-07', status: 'verified' },
  { id: 5, name: 'Hassan Shah', challan: 'CH-2305', amount: 2500, image: '/placeholder-challan.jpg', date: '2026-07-06', status: 'verified' },
  { id: 6, name: 'Ayesha Khan', challan: 'CH-2306', amount: 2500, image: '/placeholder-challan.jpg', date: '2026-07-06', status: 'rejected' },
  { id: 7, name: 'Bilal Ahmed', challan: 'CH-2307', amount: 2500, image: '/placeholder-challan.jpg', date: '2026-07-05', status: 'pending' },
  { id: 8, name: 'Sana Tariq', challan: 'CH-2308', amount: 2500, image: '/placeholder-challan.jpg', date: '2026-07-05', status: 'pending' },
];

const tabs = ['Pending', 'Verified', 'Rejected'];

export default function FeeVerificationPage() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showImageModal, setShowImageModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const statusMap = { Pending: 'pending', Verified: 'verified', Rejected: 'rejected' };
  const filtered = feeData.filter(
    (f) =>
      f.status === statusMap[activeTab] &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === paginated.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginated.map((f) => f.id));
    }
  };

  const handleReject = (id) => {
    setRejectingId(id);
    setRejectReason('');
  };

  const confirmReject = () => {
    setRejectingId(null);
    setRejectReason('');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Fee Verification</h1>
            <div className="flex items-center gap-3">
              <select value={phaseFilter} onChange={(e) => setPhaseFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                <option value="">All Phases</option>
                <option>Phase 1</option>
                <option>Phase 2</option>
                <option>Phase 3</option>
                <option>Phase 4</option>
              </select>
              {selectedRows.length > 0 && (
                <button className="flex items-center gap-2 bg-[#2ECC71] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#27AE60] transition-colors">
                  <Download size={16} />
                  Bulk Verify ({selectedRows.length})
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-gray-200">
                  {feeData.filter((f) => f.status === statusMap[tab]).length}
                </span>
              </button>
            ))}
          </div>

          <div className="relative mb-4 max-w-sm">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] outline-none"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    {activeTab === 'Pending' && (
                      <th className="px-5 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={paginated.length > 0 && selectedRows.length === paginated.length}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                        />
                      </th>
                    )}
                    <th className="text-left px-5 py-3 font-medium">Student Name</th>
                    <th className="text-left px-5 py-3 font-medium">Challan #</th>
                    <th className="text-left px-5 py-3 font-medium">Amount</th>
                    <th className="text-left px-5 py-3 font-medium">Challan Image</th>
                    <th className="text-left px-5 py-3 font-medium">Upload Date</th>
                    {activeTab !== 'Pending' && (
                      <th className="text-left px-5 py-3 font-medium">Verified By</th>
                    )}
                    <th className="text-left px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((fee) => (
                    <tr key={fee.id} className="border-b border-gray-50 hover:bg-gray-50">
                      {activeTab === 'Pending' && (
                        <td className="px-5 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(fee.id)}
                            onChange={() => toggleSelect(fee.id)}
                            className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                          />
                        </td>
                      )}
                      <td className="px-5 py-3 font-medium text-gray-900">{fee.name}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-600">{fee.challan}</td>
                      <td className="px-5 py-3 text-gray-800">PKR {fee.amount.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => setShowImageModal(fee)}
                          className="flex items-center gap-1 text-[#1A73E8] hover:underline text-xs"
                        >
                          <Image size={14} />
                          View Challan
                        </button>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{fee.date}</td>
                      {activeTab !== 'Pending' && (
                        <td className="px-5 py-3 text-gray-600">Admin</td>
                      )}
                      <td className="px-5 py-3">
                        {activeTab === 'Pending' && (
                          <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">
                              <CheckCircle size={14} />
                              Verify
                            </button>
                            <button
                              onClick={() => handleReject(fee.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                            >
                              <XCircle size={14} />
                              Reject
                            </button>
                          </div>
                        )}
                        {activeTab === 'Verified' && (
                          <span className="text-xs text-green-600 font-medium">Verified</span>
                        )}
                        {activeTab === 'Rejected' && (
                          <span className="text-xs text-red-600 font-medium">Rejected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Page {currentPage} of {totalPages || 1}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {rejectingId && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reject Challan</h3>
                <p className="text-sm text-gray-500 mb-4">Provide a reason for rejecting this challan.</p>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Rejection reason..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] mb-4"
                />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setRejectingId(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                  <button onClick={confirmReject} className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">Confirm Reject</button>
                </div>
              </div>
            </div>
          )}

          {showImageModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Challan Image</h3>
                  <button onClick={() => setShowImageModal(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Image size={48} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-400">Challan Preview</p>
                    <p className="text-xs text-gray-300 mt-1">{showImageModal.challan} - {showImageModal.name}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Amount: PKR {showImageModal.amount.toLocaleString()}</span>
                  <span>{showImageModal.date}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
