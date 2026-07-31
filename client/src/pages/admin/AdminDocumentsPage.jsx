import { useState } from 'react';
import {
  FileText, Upload, Trash2, Download, Eye,
  File, FileSpreadsheet, FileImage, FileArchive
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const tabs = ['All', 'Policies', 'Reports', 'Notices'];

const typeBadgeColors = {
  Policy: 'bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20',
  Report: 'bg-[#2ECC71]/10 text-[#25A35A] border-[#2ECC71]/20',
  Notice: 'bg-[#F1C40F]/10 text-[#C9A300] border-[#F1C40F]/20',
  Other: 'bg-gray-100 text-gray-700 border-gray-200',
};

const fileIcons = {
  pdf: { icon: FileText, color: 'text-red-500' },
  xlsx: { icon: FileSpreadsheet, color: 'text-[#2ECC71]' },
  docx: { icon: FileText, color: 'text-[#1A73E8]' },
  doc: { icon: FileText, color: 'text-[#1A73E8]' },
  png: { icon: FileImage, color: 'text-purple-500' },
  jpg: { icon: FileImage, color: 'text-purple-500' },
  jpeg: { icon: FileImage, color: 'text-purple-500' },
  zip: { icon: FileArchive, color: 'text-amber-500' },
  rar: { icon: FileArchive, color: 'text-amber-500' },
};

const documentsData = [];

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] bg-white transition-colors";

export default function AdminDocumentsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState('Policy');
  const [fileName, setFileName] = useState('');
  const [previewDoc, setPreviewDoc] = useState(null);

  const filtered = documentsData.filter((d) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Policies') return d.type === 'Policy';
    if (activeTab === 'Reports') return d.type === 'Report';
    if (activeTab === 'Notices') return d.type === 'Notice';
    return true;
  });

  const getFileIcon = (ext) => {
    const fi = fileIcons[ext] || { icon: File, color: 'text-gray-500' };
    return fi;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-[#1A73E8]/10 rounded-lg">
              <FileText size={24} className="text-[#1A73E8]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Upload, organize and manage all documents</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Upload size={18} className="text-[#1A73E8]" />
              Upload New Document
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Document Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter document title"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Document Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className={inputClass}
                >
                  <option>Policy</option>
                  <option>Report</option>
                  <option>Notice</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Choose File</label>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors flex-1 text-gray-500">
                    <Upload size={16} />
                    {fileName || 'Select file...'}
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                    />
                  </label>
                </div>
              </div>
              <button className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors flex items-center gap-2 opacity-60 cursor-not-allowed">
                <Upload size={16} />
                Upload Document
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">Document upload backend coming soon. Files will be stored securely.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex border-b border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-[#1A73E8] text-[#1A73E8]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {previewDoc && (
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    {(() => {
                      const fi = getFileIcon(previewDoc.ext);
                      return <fi.icon size={32} className={fi.color} />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{previewDoc.title}</h4>
                    <p className="text-sm text-gray-500">
                      {previewDoc.fileName} &bull; {previewDoc.size}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <Eye size={16} /> View
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2ECC71] text-white text-sm hover:bg-[#25A35A] transition-colors">
                      <Download size={16} /> Download
                    </button>
                    <button
                      onClick={() => setPreviewDoc(null)}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">#</th>
                    <th className="text-left px-5 py-3 font-medium">Title</th>
                    <th className="text-left px-5 py-3 font-medium">Type</th>
                    <th className="text-left px-5 py-3 font-medium">File Name</th>
                    <th className="text-left px-5 py-3 font-medium">Size</th>
                    <th className="text-left px-5 py-3 font-medium">Uploaded Date</th>
                    <th className="text-left px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-gray-400">
                        <FileText size={40} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-base font-medium text-gray-500 mb-1">No documents yet</p>
                        <p className="text-sm">Upload a document using the form above to get started.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
