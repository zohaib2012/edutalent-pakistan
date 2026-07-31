import { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, Search, Download,
  ChevronLeft, ChevronRight, Image, ExternalLink, Loader2
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { verifyPayment, rejectPayment } from '../../services/api';
import api from '../../services/api';

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const statusMap = { Pending: 'pending', Verified: 'verified', Rejected: 'rejected' };
      const res = await api.get('/payments/all', { params: { status: statusMap[activeTab] } });
      setData(res.data);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter(
    (f) =>
      f.fullName?.toLowerCase().includes(search.toLowerCase())
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
      setSelectedRows(paginated.map((f) => f._id));
    }
  };

  const handleVerify = async (studentId) => {
    setActionLoading(studentId);
    try {
      await verifyPayment(studentId);
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Verification failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = (id) => {
    setRejectingId(id);
    setRejectReason('');
  };

  const confirmReject = async () => {
    const id = rejectingId;
    setRejectingId(null);
    setActionLoading(id);
    try {
      await rejectPayment(id, rejectReason || 'Payment rejected by admin');
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Rejection failed');
    } finally {
      setActionLoading(null);
      setRejectReason('');
    }
  };

  const handleBulkVerify = async () => {
    setActionLoading('bulk');
    try {
      for (const id of selectedRows) {
        await verifyPayment(id);
      }
      setSelectedRows([]);
      await fetchData();
    } catch {
      alert('Bulk verify failed');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading && data.length === 0) {
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
                <button
                  onClick={handleBulkVerify}
                  disabled={actionLoading === 'bulk'}
                  className="flex items-center gap-2 bg-[#2ECC71] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#27AE60] transition-colors disabled:opacity-50"
                >
                  {actionLoading === 'bulk' ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  Bulk Verify ({selectedRows.length})
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); setSelectedRows([]); }}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-gray-200">
                  {data.length}
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
                    <th className="text-left px-5 py-3 font-medium">Registration #</th>
                    <th className="text-left px-5 py-3 font-medium">Challan #</th>
                    <th className="text-left px-5 py-3 font-medium">Amount</th>
                    <th className="text-left px-5 py-3 font-medium">Challan Image</th>
                    <th className="text-left px-5 py-3 font-medium">Upload Date</th>
                    {activeTab !== 'Pending' && (
                      <th className="text-left px-5 py-3 font-medium">Verified By</th>
                    )}
                    {activeTab === 'Rejected' && (
                      <th className="text-left px-5 py-3 font-medium">Reason</th>
                    )}
                    <th className="text-left px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-5 py-8 text-center text-gray-400 text-sm">No {activeTab.toLowerCase()} payments</td>
                    </tr>
                  )}
                  {paginated.map((fee) => (
                    <tr key={fee._id} className="border-b border-gray-50 hover:bg-gray-50">
                      {activeTab === 'Pending' && (
                        <td className="px-5 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(fee._id)}
                            onChange={() => toggleSelect(fee._id)}
                            className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                          />
                        </td>
                      )}
                      <td className="px-5 py-3 font-medium text-gray-900">{fee.fullName}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-600">{fee.registrationNumber}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-600">{fee.challan?.challanNumber}</td>
                      <td className="px-5 py-3 text-gray-800">PKR {(fee.challan?.amount || 1200).toLocaleString()}</td>
                      <td className="px-5 py-3">
                        {fee.challan?.paidChallanImageUrl ? (
                          <button
                            onClick={() => setShowImageModal(fee)}
                            className="flex items-center gap-1 text-[#1A73E8] hover:underline text-xs"
                          >
                            <Image size={14} />
                            View Challan
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">No image</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {fee.challan?.generatedAt ? new Date(fee.challan.generatedAt).toLocaleDateString() : '-'}
                      </td>
                      {activeTab !== 'Pending' && (
                        <td className="px-5 py-3 text-gray-600">Admin</td>
                      )}
                      {activeTab === 'Rejected' && (
                        <td className="px-5 py-3 text-xs text-red-600 max-w-[150px] truncate" title={fee.challan?.rejectionReason}>
                          {fee.challan?.rejectionReason || '-'}
                        </td>
                      )}
                      <td className="px-5 py-3">
                        {activeTab === 'Pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleVerify(fee._id)}
                              disabled={actionLoading === fee._id}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                            >
                              {actionLoading === fee._id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                              Verify
                            </button>
                            <button
                              onClick={() => handleReject(fee._id)}
                              disabled={actionLoading === fee._id}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                              <XCircle size={14} />
                              Reject
                            </button>
                          </div>
                        )}
                        {activeTab === 'Verified' && (
                          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle size={14} /> Verified
                          </span>
                        )}
                        {activeTab === 'Rejected' && (
                          <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                            <XCircle size={14} /> Rejected
                          </span>
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
                {showImageModal.challan?.paidChallanImageUrl ? (
                  <div className="mb-4">
                    <img
                      src={showImageModal.challan.paidChallanImageUrl}
                      alt="Paid Challan"
                      className="w-full rounded-lg border border-gray-200"
                    />
                    <a
                      href={showImageModal.challan.paidChallanImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#1A73E8] text-xs mt-2 hover:underline"
                    >
                      <ExternalLink size={14} /> Open in new tab
                    </a>
                  </div>
                ) : (
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Image size={48} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-400">No image uploaded</p>
                    </div>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Amount: PKR {(showImageModal.challan?.amount || 1200).toLocaleString()}</span>
                  <span>Challan: {showImageModal.challan?.challanNumber}</span>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Student: {showImageModal.fullName} | Reg: {showImageModal.registrationNumber}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
