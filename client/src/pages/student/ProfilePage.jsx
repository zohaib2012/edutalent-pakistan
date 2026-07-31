import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, BookOpen, Award, FileText, Download,
  CheckCircle, Clock, AlertCircle, ChevronRight, Camera, Shield,
  GraduationCap, Calendar, Pencil, FileDown, ScrollText, Medal,
  UserCheck, Building2, Globe, CreditCard, BadgeCheck,
  ListChecks, UserRound, Hash, Home, School, MapPinned, Cake,
  VenusAndMars, IdCard, ClipboardList, CircleCheck, CircleDot,
  ArrowRight, Loader2, LogOut
} from 'lucide-react';
import { getStudentProfile, updateStudentProfile } from '../../services/api';

const statusConfig = {
  registered: { label: 'Registered', color: 'bg-blue-100 text-blue-800', icon: UserCheck },
  challan_issued: { label: 'Challan Issued', color: 'bg-purple-100 text-purple-800', icon: CreditCard },
  payment_pending: { label: 'Payment Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  payment_verified: { label: 'Payment Verified', color: 'bg-green-100 text-green-800', icon: BadgeCheck },
  slip_issued: { label: 'Slip Issued', color: 'bg-indigo-100 text-indigo-800', icon: ScrollText },
  test_completed: { label: 'Test Completed', color: 'bg-cyan-100 text-cyan-800', icon: GraduationCap },
  result_published: { label: 'Result Published', color: 'bg-gold/20 text-gold-800', icon: Award },
};

const timelineSteps = [
  { key: 'registration', label: 'Registration Submitted', icon: UserCheck },
  { key: 'challan', label: 'Challan Generated', icon: CreditCard },
  { key: 'payment', label: 'Payment Verified', icon: BadgeCheck },
  { key: 'slip', label: 'Roll No. Slip Issued', icon: ScrollText },
  { key: 'test', label: 'Test Completed', icon: GraduationCap },
  { key: 'result', label: 'Result Published', icon: Award },
];

const statusTimelineMap = {
  registered: 0,
  challan_issued: 1,
  payment_pending: 1,
  payment_verified: 2,
  slip_issued: 3,
  test_completed: 4,
  result_published: 5,
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getStudentProfile();
      setStudent(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePhotoChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file || file.size > 2 * 1024 * 1024) return;
      setUploadingPhoto(true);
      try {
        await updateStudentProfile({ photoUrl: URL.createObjectURL(file) });
        await fetchProfile();
      } catch {
        alert('Failed to update photo');
      } finally {
        setUploadingPhoto(false);
      }
    };
    input.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">Failed to load profile</p>
          <p className="text-gray-400 text-sm mb-4">{error}</p>
          <button onClick={fetchProfile} className="btn-primary">Try Again</button>
        </div>
      </div>
    );
  }

  if (!student) return null;

  const phaseName = student.phaseId?.name || student.phaseId || '';
  const StatusIcon = statusConfig[student.status]?.icon || UserCheck;
  const timelineProgress = statusTimelineMap[student.status] ?? 0;

  const infoFields = [
    { icon: User, label: 'Full Name', value: student.fullName },
    { icon: UserRound, label: "Father's/Guardian's Name", value: student.fatherName },
    { icon: IdCard, label: 'CNIC / B-Form Number', value: student.cnicOrBform },
    { icon: Cake, label: 'Date of Birth', value: student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-' },
    { icon: VenusAndMars, label: 'Gender', value: student.gender || '-' },
    { icon: Globe, label: 'Province', value: student.province || '-' },
    { icon: MapPinned, label: 'District', value: student.district || '-' },
    { icon: MapPin, label: 'City', value: student.city || '-' },
    { icon: Home, label: 'Residential Address', value: student.address || '-' },
    { icon: School, label: 'School/College/University', value: student.schoolOrCollege || student.institutionName || '-' },
    { icon: ClipboardList, label: 'Scholarship Phase', value: phaseName },
    { icon: BookOpen, label: 'Class/Grade/Semester', value: student.grade || '-' },
    { icon: Phone, label: 'Mobile Number', value: student.mobileNumber || '-' },
    { icon: Mail, label: 'Email Address', value: student.email || '-' },
  ];

  const challanAvailable = student.challan?.challanNumber;
  const slipAvailable = student.rollNoSlip?.rollNumber;
  const certAvailable = student.certificate?.certificateNumber;

  const actions = [
    { label: 'Check Application Status', icon: ListChecks, color: 'from-primary to-primary-600', to: '/profile' },
    { label: 'Download Application Form', icon: FileDown, color: 'from-purple-500 to-purple-600', to: '/registration-success' },
    { label: 'Download Challan', icon: CreditCard, color: 'from-orange-500 to-orange-600', to: '/challan', show: !!challanAvailable },
    { label: 'Download Roll Slip', icon: ScrollText, color: 'from-indigo-500 to-indigo-600', to: '/slip', show: !!slipAvailable },
    { label: 'Take Test', icon: GraduationCap, color: 'from-cyan-500 to-cyan-600', to: '/test', show: student.status === 'slip_issued' },
    { label: 'My Results', icon: Award, color: 'from-gold to-yellow-600', to: '/my-results', show: student.status === 'test_completed' || student.status === 'result_published' },
    { label: 'Generate Certificate', icon: Award, color: 'from-gold to-yellow-600', to: '/my-certificates', show: !!certAvailable },
    { label: 'Check Merit List', icon: Medal, color: 'from-cyan-500 to-cyan-600', to: '/merit-list' },
  ].filter(a => a.show !== false);

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
                {uploadingPhoto ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
              </button>
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold">{student.fullName}</h1>
                  <p className="text-white/70 text-sm mt-1 flex items-center justify-center md:justify-start gap-1.5">
                    <Hash size={14} />
                    {student.registrationNumber}
                  </p>
                </div>
                <button onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white/80 hover:text-white transition-all">
                  <LogOut size={16} /> Logout
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[student.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                  <StatusIcon size={12} />
                  {statusConfig[student.status]?.label || student.status}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white/90">
                  <GraduationCap size={12} />
                  {phaseName}
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

            {actions.length > 0 && (
              <div>
                <h2 className="text-lg font-heading font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Quick Actions
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {actions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                      <Link key={i} to={action.to} className="block group">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer hover:-translate-y-0.5">
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
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

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
                          { label: 'Roll No. Slip', available: !!slipAvailable, icon: ScrollText },
                          { label: 'Certificate', available: !!certAvailable, icon: Award },
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
