import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Download, User, Hash, Calendar, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const FindChallanPage = () => {
  const [regNumber, setRegNumber] = useState('');
  const [cnic, setCnic] = useState('');
  const [challanData, setChallanData] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    setChallanData({
      studentName: 'Ahmed Khan',
      challanNumber: 'CH-2025-00142',
      amount: 'PKR 500',
      dueDate: 'August 20, 2025',
      status: 'Paid',
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
            <FileText size={16} className="text-gold" />
            <span>Fee Payment</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Find Your Challan</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Enter your registration details to retrieve your fee challan for the EduTalent scholarship test.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSearch} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Registration Number</label>
                <div className="relative">
                  <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="e.g. REG-2025-00142"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">CNIC / B-Form</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="e.g. 42201-1234567-1"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                <Search size={18} /> Search Challan
              </button>
            </form>

            {searched && !challanData && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle size={20} className="text-red-500" />
                <p className="text-sm text-red-700">No challan found for the provided details. Please check your information and try again.</p>
              </div>
            )}

            {challanData && (
              <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-primary" /> Challan Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Student Name</div>
                      <div className="text-sm font-semibold text-gray-900">{challanData.studentName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Hash size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Challan #</div>
                      <div className="text-sm font-semibold text-gray-900">{challanData.challanNumber}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Amount</div>
                      <div className="text-sm font-semibold text-gray-900">{challanData.amount}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Due Date</div>
                      <div className="text-sm font-semibold text-gray-900">{challanData.dueDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {challanData.status === 'Paid' ? (
                      <CheckCircle size={16} className="text-success shrink-0" />
                    ) : (
                      <Clock size={16} className="text-amber-500 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        challanData.status === 'Paid' ? 'bg-green-50 text-success' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {challanData.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary w-full justify-center mt-5 text-sm py-3">
                  <Download size={16} /> Download Challan PDF
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-primary font-semibold hover:underline">Register Now</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindChallanPage;
