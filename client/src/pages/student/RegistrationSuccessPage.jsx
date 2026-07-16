import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight, ShieldCheck } from 'lucide-react';

const RegistrationSuccessPage = () => {
  const location = useLocation();
  const registrationNumber = location.state?.registrationNumber || 'N/A';

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Registration</h1>
          <p className="text-white/80">Complete your registration process</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={44} className="text-success" />
            </div>

            <h2 className="section-title text-center">Registration Successful!</h2>
            <p className="section-subtitle mb-8">Thank you for registering with EduTalent Pakistan.</p>

            <div className="bg-primary-50 rounded-xl p-6 mb-8 border border-primary-100">
              <p className="text-sm text-gray-500 mb-1">Your Registration Number</p>
              <p className="text-2xl md:text-3xl font-heading font-bold text-primary tracking-wider">{registrationNumber}</p>
            </div>

            <p className="text-sm text-gray-600 mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              Your challan has been generated. Please download and pay at your nearest bank branch.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-sm font-semibold text-red-700">Payment Deadline:</p>
              <p className="text-sm text-red-600">Within 7 days of registration. Late payments may result in cancellation of seat.</p>
            </div>

            <div className="space-y-3">
              <button className="btn-gold w-full justify-center">
                <Download size={18} /> Download Challan
              </button>
              <Link to="/login" className="btn-outline w-full justify-center">
                Login to Your Dashboard <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={14} /> Keep your registration number safe for future reference.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationSuccessPage;
