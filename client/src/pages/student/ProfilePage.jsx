import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, BookOpen, Award, FileText, Download,
  CheckCircle, Clock, AlertCircle, ChevronRight, Camera, Shield,
  GraduationCap, Calendar, Pencil, FileDown, ScrollText, Medal,
  UserCheck, Building2, Globe, VenetianMask, CreditCard, BadgeCheck,
  ListChecks, UserRound, Hash, Home, School, MapPinned, Cake,
  VenusAndMars, IdCard, ClipboardList, CircleCheck, CircleDot,
  ArrowRight, Loader2
} from 'lucide-react';

const statusConfig = {
  registered: { label: 'Registered', color: 'bg-blue-100 text-blue-800', icon: UserCheck },
  'challan-issued': { label: 'Challan Issued', color: 'bg-purple-100 text-purple-800', icon: CreditCard },
  'payment-pending': { label: 'Payment Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  'payment-verified': { label: 'Payment Verified', color: 'bg-green-100 text-green-800', icon: BadgeCheck },
  'slip-issued': { label: 'Slip Issued', color: 'bg-indigo-100 text-indigo-800', icon: ScrollText },
  'test-completed': { label: 'Test Completed', color: 'bg-cyan-100 text-cyan-800', icon: GraduationCap },
  'result-published': { label: 'Result Published', color: 'bg-gold/20 text-gold-800', icon: Award },
};

const timelineSteps = [
  { key: 'registration', label: 'Registration Submitted', icon: UserCheck },
  { key: 'challan', label: 'Challan Generated', icon: CreditCard },
  { key: 'payment', label: 'Payment Verified', icon: BadgeCheck },
  { key: 'slip', label: 'Roll No. Slip Issued', icon: ScrollText },
  { key: 'test', label: 'Test Completed', icon: GraduationCap },
  { key: 'result', label: 'Result Published', icon: Award },
];

const ProfilePage = () => {
  const [uploading, setUploading] = useState(false);

  const student = {
    fullName: 'Muhammad Ahmed',
    fatherName: 'Muhammad Ali',
    cnicOrBform: '42101-1234567-1',
    dateOfBirth: '15 Aug 2005',
    gender: 'Male',
    province: 'Sindh',
    district: 'Karachi Central',
    city: 'Karachi',
    address: 'House #12, Block 6, Gulshan-e-Iqbal, Karachi',
    schoolOrCollege: 'Karachi Grammar School',
    phaseId: 'Secondary (Grade 9-10)',
    grade: 'Grade 10',
    mobileNumber: '0300-1234567',
    email: 'ahmed@example.com',
    registrationNumber: 'ETP-2026-001234',
    photoUrl: null,
    status: 'payment-pending',
    challan: { isPaid: true, paymentVerified: false },
    rollNoSlip: { rollNumber: null },
    test: { attempted: false, score: 0, percentage: 0, position: null },
    award: { type: null, title: null },
    certificate: { type: null, certificateNumber: null },
  };

  const StatusIcon = statusConfig[student.status]?.icon || UserCheck;

  const timelineProgress = (() => {
    const map = {
      'registered': 0,
      'challan-issued': 1,
      'payment-pending': 1,
      'payment-verified': 2,
      'slip-issued': 3,
      'test-completed': 4,
      'result-published': 5,
    };
    return map[student.status] ?? 0;
  })();

  const handlePhotoChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
        setUploading(true);
        setTimeout(() => setUploading(false), 1000);
      }
    };
    input.click();
  };

  const infoFields = [
    { icon: User, label: 'Full Name', value: student.fullName },
    { icon: UserRound, label: "Father's/Guardian's Name", value: student.fatherName },
    { icon: IdCard, label: 'CNIC / B-Form Number', value: student.cnicOrBform },
    { icon: Cake, label: 'Date of Birth', value: student.dateOfBirth },
    { icon: VenusAndMars, label: 'Gender', value: student.gender },
    { icon: Globe, label: 'Province', value: student.province },
    { icon: MapPinned, label: 'District', value: student.district },
    { icon: MapPin, label: 'City', value: student.city },
    { icon: Home, label: 'Residential Address', value: student.address },
    { icon: School, label: 'School/College/University', value: student.schoolOrCollege },
    { icon: ClipboardList, label: 'Scholarship Phase', value: student.phaseId },
    { icon: BookOpen, label: 'Class/Grade/Semester', value: student.grade },
    { icon: Phone, label: 'Mobile Number', value: student.mobileNumber },
    { icon: Mail, label: 'Email Address', value: student.email },
  ];

  const actions = [
    { label: 'Check Application Status', icon: ListChecks, color: 'from-primary to-primary-600', to: '/student/status' },
    { label: 'Download Application Form', icon: FileDown, color: 'from-purple-500 to-purple-600', to: '/student/application-form', onClick: () => {} },
    { label: 'Generate Certificate', icon: Award, color: 'from-gold to-yellow-600', to: '/my-certificates' },
    { label: 'Check Merit List', icon: Medal, color: 'from-cyan-500 to-cyan-600', to: '/student/merit-list' },
    { label: 'Download Roll Slip', icon: ScrollText, color: 'from-indigo-500 to-indigo-600', to: '/roll-no-slip' },
    { label: 'Download Challan', icon: CreditCard, color: 'from-orange-500 to-orange-600', to: '/challan-download' },
    { label: 'Edit Profile', icon: Pencil, color: 'from-emerald-500 to-emerald-600', to: '/student/edit-profile' },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-white/15 rounded-full flex items-center justify-center border-4 border-white/30 shadow-lg overflow-hidden backdrop-blur-sm">
                {student.photoUrl ? (
                  <img src={student.photoUrl} alt={student.fullName} className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-white/80" />
                )}
              </div>
              <button onClick={handlePhotoChange}
                className="absolute -bottom-1 -right-1 w-9 h-9 bg-white text-primary rounded-full flex items-center justify-center border-2 border-primary shadow-md hover:bg-primary hover:text-white transition-all">
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
              </button>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-heading font-bold">{student.fullName}</h1>
              <p className="text-white/70 text-sm mt-1 flex items-center justify-center md:justify-start gap-1.5">
                <Hash size={14} />
                {student.registrationNumber}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[student.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                  <StatusIcon size={12} />
                  {statusConfig[student.status]?.label || student.status}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white/90">
                  <GraduationCap size={12} />
                  {student.phaseId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto space-y-8">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 px-6 md:px-8 py-4 border-b border-primary-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <h2 className="text-lg font-heading font-bold text-gray-800">Personal Information</h2>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                  {infoFields.map((field, i) => {
                    const Icon = field.icon;
                    return (
                      <div key={i} className="group flex items-start gap-3 p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{field.label}</p>
                          <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">{field.value || '-'}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-heading font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Quick Actions
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action, i) => {
                  const Icon = action.icon;
                  const isEditProfile = action.label === 'Edit Profile';
                  const isDisabled = isEditProfile && false;
                  const Wrapper = ({ children }) =>
                    action.to && !isDisabled ? <Link to={action.to} className="block group">{children}</Link> : <div className="block group">{children}</div>;
                  return (
                    <Wrapper key={i}>
                      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 relative overflow-hidden ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'}`}>
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${action.color}`} />
                        <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            <Icon size={20} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 leading-tight">{action.label}</p>
                          </div>
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </div>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gold/10 to-yellow-50 px-6 md:px-8 py-4 border-b border-gold/20">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gold rounded-xl flex items-center justify-center">
                    <ClipboardList size={18} className="text-gray-800" />
                  </div>
                  <h2 className="text-lg font-heading font-bold text-gray-800">Application Status</h2>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200 rounded-full" />
                      <div className="space-y-0">
                        {timelineSteps.map((step, i) => {
                          const StepIcon = step.icon;
                          const isCompleted = i < timelineProgress;
                          const isCurrent = i === timelineProgress;
                          const isPending = i > timelineProgress;

                          return (
                            <div key={step.key} className="relative flex items-start gap-4 pb-8 last:pb-0">
                              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300 ${
                                isCompleted
                                  ? 'bg-success border-success text-white shadow-md shadow-success/20'
                                  : isCurrent
                                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 animate-pulse'
                                    : 'bg-white border-gray-200 text-gray-300'
                              }`}>
                                {isCompleted ? <CheckCircle size={18} /> : <StepIcon size={18} />}
                              </div>
                              <div className="flex-1 pt-1.5">
                                <p className={`text-sm font-semibold ${
                                  isCompleted ? 'text-gray-800' : isCurrent ? 'text-primary' : 'text-gray-400'
                                }`}>
                                  {step.label}
                                </p>
                                {isCurrent && !isCompleted && (
                                  <p className="text-xs text-primary/70 mt-0.5 flex items-center gap-1">
                                    <Loader2 size={10} className="animate-spin" />
                                    In Progress
                                  </p>
                                )}
                                {isCompleted && (
                                  <p className="text-xs text-success mt-0.5 flex items-center gap-1">
                                    <CheckCircle size={10} />
                                    Completed
                                  </p>
                                )}
                              </div>
                              {isCompleted && (
                                <div className="flex-shrink-0 mt-2">
                                  <CircleCheck size={16} className="text-success" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border border-primary-100 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Shield size={18} className="text-primary" />
                        <h3 className="text-sm font-heading font-bold text-gray-800">Status Summary</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Overall Progress</span>
                          <span className="font-bold text-primary">{Math.round((timelineProgress / (timelineSteps.length - 1)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-primary to-success h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(timelineProgress / (timelineSteps.length - 1)) * 100}%` }} />
                        </div>
                        <div className="pt-2 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <div className="w-3 h-3 rounded-full bg-success flex-shrink-0" />
                            <span>{timelineProgress} of {timelineSteps.length - 1} steps completed</span>
                          </div>
                          {timelineProgress < timelineSteps.length - 1 && (
                            <div className="flex items-center gap-2 text-xs text-primary">
                              <ArrowRight size={12} />
                              <span>Next: {timelineSteps[timelineProgress + 1]?.label}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                      <h3 className="text-sm font-heading font-bold text-gray-800 mb-3">Documents</h3>
                      <div className="space-y-2">
                        {[
                          { label: 'Application Form', available: true, icon: FileText },
                          { label: 'Roll No. Slip', available: !!student.rollNoSlip?.rollNumber, icon: ScrollText },
                          { label: 'Certificate', available: !!student.certificate?.certificateNumber, icon: Award },
                        ].map((doc, i) => {
                          const DocIcon = doc.icon;
                          return (
                            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg text-sm ${
                              doc.available ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                            }`}>
                              <DocIcon size={16} />
                              <span className="flex-1 font-medium">{doc.label}</span>
                              {doc.available ? (
                                <CheckCircle size={14} className="text-success" />
                              ) : (
                                <Clock size={14} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
