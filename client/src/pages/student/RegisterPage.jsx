import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Upload, User, BookOpen, Phone, Camera, ClipboardList, CheckCircle } from 'lucide-react';

const grades = [
  'Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6',
  'Grade 7','Grade 8','Grade 9','Grade 10','Grade 11 (Pre-Eng)',
  'Grade 11 (Pre-Med)','Grade 11 (ICS)','Grade 11 (Commerce)',
  'Grade 12 (Pre-Eng)','Grade 12 (Pre-Med)','Grade 12 (ICS)','Grade 12 (Commerce)'
];

const gradePhaseMap = {
  'Grade 1':'Primary','Grade 2':'Primary','Grade 3':'Primary','Grade 4':'Primary','Grade 5':'Primary',
  'Grade 6':'Middle','Grade 7':'Middle','Grade 8':'Middle',
  'Grade 9':'Secondary','Grade 10':'Secondary',
  'Grade 11 (Pre-Eng)':'Higher Secondary','Grade 11 (Pre-Med)':'Higher Secondary',
  'Grade 11 (ICS)':'Higher Secondary','Grade 11 (Commerce)':'Higher Secondary',
  'Grade 12 (Pre-Eng)':'Higher Secondary','Grade 12 (Pre-Med)':'Higher Secondary',
  'Grade 12 (ICS)':'Higher Secondary','Grade 12 (Commerce)':'Higher Secondary'
};

const provinces = ['Sindh','Punjab','KPK','Balochistan','AJK','GB','Islamabad'];

const steps = [
  { label: 'Personal Info', icon: User },
  { label: 'Academic Info', icon: BookOpen },
  { label: 'Contact Info', icon: Phone },
  { label: 'Photo Upload', icon: Camera },
  { label: 'Review & Submit', icon: ClipboardList },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    fullName: '', fatherName: '', cnic: '', dob: '',
    grade: '', school: '', province: '', city: '',
    mobile: '', email: '', address: '',
    photo: null, photoPreview: '',
  });

  const [phase, setPhase] = useState('');

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'grade') {
      setPhase(gradePhaseMap[value] || '');
    }
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateCNIC = (cnic) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);
  const validateMobile = (mobile) => /^03\d{2}-\d{7}$/.test(mobile) || /^\+92\d{10}$/.test(mobile) || /^\d{11}$/.test(mobile);

  const validateStep = (s) => {
    const errs = {};
    if (s === 0) {
      if (!form.fullName.trim()) errs.fullName = 'Full Name is required';
      if (!form.fatherName.trim()) errs.fatherName = "Father's Name is required";
      if (!form.cnic.trim()) errs.cnic = 'CNIC/B-Form is required';
      else if (!validateCNIC(form.cnic)) errs.cnic = 'Invalid CNIC format (XXXXX-XXXXXXX-X)';
      if (!form.dob) errs.dob = 'Date of Birth is required';
    } else if (s === 1) {
      if (!form.grade) errs.grade = 'Grade is required';
      if (!form.school.trim()) errs.school = 'School/College/University is required';
      if (!form.province) errs.province = 'Province is required';
      if (!form.city.trim()) errs.city = 'City is required';
    } else if (s === 2) {
      if (!form.mobile.trim()) errs.mobile = 'Mobile Number is required';
      else if (!validateMobile(form.mobile)) errs.mobile = 'Invalid mobile number';
      if (!form.email.trim()) errs.email = 'Email is required';
      else if (!validateEmail(form.email)) errs.email = 'Invalid email address';
      if (!form.address.trim()) errs.address = 'Address is required';
    } else if (s === 3) {
      if (!form.photo) errs.photo = 'Photo is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(s => Math.min(s + 1, 4));
  };

  const handleBack = () => {
    setStep(s => Math.max(s - 1, 0));
    setErrors({});
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/jpeg','image/png'].includes(file.type)) {
      setErrors(prev => ({ ...prev, photo: 'Only JPG/PNG files allowed' }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'File size must be under 2MB' }));
      return;
    }
    setErrors(prev => ({ ...prev, photo: '' }));
    setForm(prev => ({ ...prev, photo: file, photoPreview: URL.createObjectURL(file) }));
  };

  const handleSubmit = () => {
    const regNum = 'ETP-' + Date.now().toString(36).toUpperCase();
    navigate('/registration-success', { state: { registrationNumber: regNum } });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-10">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = i === step;
        const isCompleted = i < step;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isCompleted ? 'bg-success text-white' :
                isActive ? 'bg-primary text-white ring-4 ring-primary-200' :
                'bg-gray-200 text-gray-500'
              }`}>
                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span className={`text-xs mt-1.5 font-medium ${
                isCompleted ? 'text-success' :
                isActive ? 'text-primary font-semibold' :
                'text-gray-400'
              }`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 md:w-20 h-0.5 mx-2 ${
                i < step ? 'bg-success' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input type="text" value={form.fullName} onChange={e => updateForm('fullName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.fullName ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter full name" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Father Name</label>
            <input type="text" value={form.fatherName} onChange={e => updateForm('fatherName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.fatherName ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter father name" />
            {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">CNIC / B-Form</label>
            <input type="text" value={form.cnic} onChange={e => updateForm('cnic', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.cnic ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="XXXXX-XXXXXXX-X" />
            {errors.cnic && <p className="text-red-500 text-xs mt-1">{errors.cnic}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
            <input type="date" value={form.dob} onChange={e => updateForm('dob', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.dob ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>
        </div>
      );

      case 1: return (
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Grade</label>
            <select value={form.grade} onChange={e => updateForm('grade', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.grade ? 'border-red-400' : 'border-gray-200'}`}>
              <option value="">Select Grade</option>
              {grades.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phase</label>
            <input type="text" value={phase} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600 outline-none" placeholder="Auto-selected" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">School / College / University</label>
            <input type="text" value={form.school} onChange={e => updateForm('school', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.school ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter institution name" />
            {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Province</label>
            <select value={form.province} onChange={e => updateForm('province', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.province ? 'border-red-400' : 'border-gray-200'}`}>
              <option value="">Select Province</option>
              {provinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
            <input type="text" value={form.city} onChange={e => updateForm('city', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter city" />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
        </div>
      );

      case 2: return (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
              <input type="text" value={form.mobile} onChange={e => updateForm('mobile', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.mobile ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="03XX-XXXXXXX" />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input type="email" value={form.email} onChange={e => updateForm('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="your@email.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Address</label>
            <textarea rows={3} value={form.address} onChange={e => updateForm('address', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary resize-none ${errors.address ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter your full address" />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
        </div>
      );

      case 3: return (
        <div className="text-center">
          <div className={`border-2 border-dashed rounded-xl p-8 max-w-md mx-auto ${errors.photo ? 'border-red-400' : 'border-gray-300'}`}>
            {form.photoPreview ? (
              <div className="space-y-4">
                <img src={form.photoPreview} alt="Preview" className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-primary-100" />
                <button onClick={() => { setForm(prev => ({ ...prev, photo: null, photoPreview: '' })); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="text-sm text-red-500 hover:underline">Remove Photo</button>
              </div>
            ) : (
              <div className="space-y-3" onClick={() => fileInputRef.current?.click()}>
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto cursor-pointer">
                  <Upload size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm">Click to upload photo</p>
                <p className="text-gray-400 text-xs">JPG or PNG, max 2MB</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" onChange={handlePhoto} className="hidden" />
          </div>
          {errors.photo && <p className="text-red-500 text-xs mt-2">{errors.photo}</p>}
        </div>
      );

      case 4: return (
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-lg font-heading font-bold text-gray-800 mb-4">Review Your Information</h3>
          {[
            ['Full Name', form.fullName],
            ["Father's Name", form.fatherName],
            ['CNIC / B-Form', form.cnic],
            ['Date of Birth', form.dob],
            ['Grade', form.grade],
            ['Phase', phase],
            ['School/College', form.school],
            ['Province', form.province],
            ['City', form.city],
            ['Mobile Number', form.mobile],
            ['Email', form.email],
            ['Address', form.address],
          ].map(([label, value], i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-medium text-gray-800">{value || '-'}</span>
            </div>
          ))}
          {form.photoPreview && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Photo</span>
              <img src={form.photoPreview} alt="" className="w-10 h-10 rounded-full object-cover" />
            </div>
          )}
          <div className="pt-6">
            <button onClick={handleSubmit} className="btn-primary w-full justify-center text-base py-4">
              <CheckCircle size={20} /> Submit Registration
            </button>
          </div>
        </div>
      );

      default: return null;
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Student Registration</h1>
          <p className="text-white/80">Complete all steps to register for EduTalent Pakistan</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            {renderStepIndicator()}
            {renderStep()}
            {step < 4 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button onClick={handleBack} disabled={step === 0}
                  className="btn-outline disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronLeft size={18} /> Back
                </button>
                <button onClick={handleNext} className="btn-primary">
                  Next <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
