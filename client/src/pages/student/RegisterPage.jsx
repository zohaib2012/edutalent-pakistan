import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check, ChevronRight, ChevronLeft, Upload, User, BookOpen,
  Phone, FileText, ClipboardList, CheckCircle, AlertCircle,
  X, Loader2, LogIn
} from 'lucide-react';
import { createAccount, submitApplication, getApplicationForm } from '../../services/api';

const provinces = ['Sindh','Punjab','KPK','Balochistan','AJK','GB','Islamabad'];

const classGrades = [
  '1','2','3','4','5','6','7','8','9','10',
  '11','12','13','14','15','16','University'
];

const steps = [
  { label: 'Personal Info', icon: User },
  { label: 'Academic Info', icon: BookOpen },
  { label: 'Contact Info', icon: Phone },
  { label: 'Documents', icon: FileText },
  { label: 'Review & Submit', icon: ClipboardList },
];

const ACCEPTED_TYPES = ['image/jpeg','image/png','image/jpg'];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const documentFields = [
  { key: 'cnicFront', label: 'CNIC Front Side', accept: ACCEPTED_TYPES },
  { key: 'cnicBack', label: 'CNIC Back Side', accept: ACCEPTED_TYPES },
  { key: 'bform', label: 'B-Form', accept: ACCEPTED_TYPES },
  { key: 'markSheet', label: 'Latest Mark Sheet', accept: ACCEPTED_TYPES },
  { key: 'certificate', label: 'Latest Certificate', accept: ACCEPTED_TYPES },
  { key: 'photo', label: 'Passport Size Photograph', accept: ACCEPTED_TYPES },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [phase] = useState(token ? 'application' : 'create');
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [accountResult, setAccountResult] = useState(null);
  const [documentType, setDocumentType] = useState('cnic');

  const [createForm, setCreateForm] = useState({
    fullName: '', fatherName: '', cnicOrBform: '', dateOfBirth: '',
    mobileNumber: '', email: '', password: '', confirmPassword: '',
  });

  const [form, setForm] = useState({
    fullName: '', fatherName: '', cnicOrBform: '', dateOfBirth: '',
    gender: '', province: '', district: '', city: '',
    residentialAddress: '', mobileNumber: '', email: '',
    currentClass: '',
    schoolName: '', currentQualification: '', totalMarks: '',
    obtainedMarks: '', lastQualification: '',
    studentMobile: '', fatherMobile: '', whatsappNumber: '',
    studentEmail: '', facebookUrl: '', instagramUrl: '', tiktokUrl: '',
  });

  const [documents, setDocuments] = useState({
    cnicFront: null, cnicBack: null, bform: null,
    markSheet: null, certificate: null, photo: null,
  });
  const [previews, setPreviews] = useState({});
  const fileInputRefs = useRef({});

  useEffect(() => {
    if (!token || phase !== 'application') return;
    const fetchExistingData = async () => {
      setFetchLoading(true);
      try {
        const sd = JSON.parse(localStorage.getItem('student') || '{}');
        const res = await getApplicationForm();
        const data = res.data;
        if (data) {
          setForm(prev => ({
            ...prev,
            fullName: data.fullName || sd.fullName || '',
            fatherName: data.fatherName || sd.fatherName || '',
            cnicOrBform: data.cnicOrBform || sd.cnicOrBform || '',
            dateOfBirth: data.dateOfBirth || sd.dateOfBirth || '',
            gender: data.gender || '',
            province: data.province || '',
            district: data.district || '',
            city: data.city || '',
            residentialAddress: data.residentialAddress || '',
            mobileNumber: data.mobileNumber || sd.mobileNumber || '',
            email: data.email || sd.email || '',
            currentClass: data.currentClass || '',
            schoolName: data.schoolName || '',
            currentQualification: data.currentQualification || '',
            totalMarks: data.totalMarks || '',
            obtainedMarks: data.obtainedMarks || '',
            lastQualification: data.lastQualification || '',
            studentMobile: data.studentMobile || data.mobileNumber || sd.mobileNumber || '',
            fatherMobile: data.fatherMobile || '',
            whatsappNumber: data.whatsappNumber || '',
            studentEmail: data.studentEmail || data.email || sd.email || '',
            facebookUrl: data.facebookUrl || '',
            instagramUrl: data.instagramUrl || '',
            tiktokUrl: data.tiktokUrl || '',
          }));
        }
      } catch {
        const sd = JSON.parse(localStorage.getItem('student') || '{}');
        if (sd) {
          setForm(prev => ({
            ...prev,
            fullName: sd.fullName || '',
            fatherName: sd.fatherName || '',
            cnicOrBform: sd.cnicOrBform || '',
            dateOfBirth: sd.dateOfBirth || '',
            mobileNumber: sd.mobileNumber || '',
            email: sd.email || '',
            studentMobile: sd.mobileNumber || '',
            studentEmail: sd.email || '',
          }));
        }
      } finally {
        setFetchLoading(false);
      }
    };
    fetchExistingData();
  }, [token, phase]);

  const updateCreateForm = (field, value) => {
    setCreateForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateCNIC = (cnic) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);
  const validateMobile = (mobile) => /^03\d{2}-\d{7}$/.test(mobile) || /^\+92\d{10}$/.test(mobile) || /^\d{11}$/.test(mobile);

  const validateCreateForm = () => {
    const errs = {};
    if (!createForm.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!createForm.fatherName.trim()) errs.fatherName = "Father's Name is required";
    if (!createForm.cnicOrBform.trim()) errs.cnicOrBform = 'CNIC/B-Form is required';
    else if (!validateCNIC(createForm.cnicOrBform)) errs.cnicOrBform = 'Invalid CNIC format (XXXXX-XXXXXXX-X)';
    if (!createForm.dateOfBirth) errs.dateOfBirth = 'Date of Birth is required';
    if (!createForm.mobileNumber.trim()) errs.mobileNumber = 'Mobile Number is required';
    else if (!validateMobile(createForm.mobileNumber)) errs.mobileNumber = 'Invalid mobile number';
    if (!createForm.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(createForm.email)) errs.email = 'Invalid email address';
    if (!createForm.password) errs.password = 'Password is required';
    else if (createForm.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (createForm.password !== createForm.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!validateCreateForm()) return;
    setLoading(true);
    try {
      const res = await createAccount({
        fullName: createForm.fullName,
        fatherName: createForm.fatherName,
        cnicOrBform: createForm.cnicOrBform,
        dateOfBirth: createForm.dateOfBirth,
        mobileNumber: createForm.mobileNumber,
        email: createForm.email,
        password: createForm.password,
      });
      const studentData = res.data.student || res.data;
      setAccountResult({
        registrationNumber: studentData.registrationNumber || '',
        password: studentData.tempPassword || '',
        message: studentData.message || res.data.message || 'Account Created Successfully!',
      });
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to create account. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const validateStep = (s) => {
    const errs = {};
    if (s === 0) {
      if (!form.fullName.trim()) errs.fullName = 'Full Name is required';
      if (!form.fatherName.trim()) errs.fatherName = "Father's Name is required";
      if (!form.gender) errs.gender = 'Gender is required';
      if (!form.province) errs.province = 'Province is required';
      if (!form.district.trim()) errs.district = 'District is required';
      if (!form.city.trim()) errs.city = 'City is required';
      if (!form.residentialAddress.trim()) errs.residentialAddress = 'Residential Address is required';
      if (!form.currentClass) errs.currentClass = 'Current Class is required';
    } else if (s === 1) {
      if (!form.currentQualification.trim()) errs.currentQualification = 'Current Qualification is required';
      if (!form.totalMarks) errs.totalMarks = 'Total Marks is required';
      else if (isNaN(form.totalMarks) || Number(form.totalMarks) <= 0) errs.totalMarks = 'Enter a valid number';
      if (!form.obtainedMarks) errs.obtainedMarks = 'Obtained Marks is required';
      else if (isNaN(form.obtainedMarks) || Number(form.obtainedMarks) < 0) errs.obtainedMarks = 'Enter a valid number';
      else if (Number(form.obtainedMarks) > Number(form.totalMarks)) errs.obtainedMarks = 'Cannot exceed total marks';
      if (!form.lastQualification.trim()) errs.lastQualification = 'Last Qualification is required';
    } else if (s === 2) {
      if (!form.fatherMobile.trim()) errs.fatherMobile = "Father's Mobile is required";
      else if (!validateMobile(form.fatherMobile)) errs.fatherMobile = 'Invalid mobile number';
      if (!form.whatsappNumber.trim()) errs.whatsappNumber = 'WhatsApp Number is required';
      else if (!validateMobile(form.whatsappNumber)) errs.whatsappNumber = 'Invalid WhatsApp number';
    } else if (s === 3) {
      const docKey = documentType === 'cnic' ? 'cnicFront' : 'bform';
      if (!documents[docKey]) errs[docKey] = `${documentType === 'cnic' ? 'CNIC Front Side' : 'B-Form'} is required`;
      if (documentType === 'cnic' && !documents.cnicBack) errs.cnicBack = 'CNIC Back Side is required';
      if (!documents.markSheet) errs.markSheet = 'Latest Mark Sheet is required';
      if (!documents.certificate) errs.certificate = 'Latest Certificate is required';
      if (!documents.photo) errs.photo = 'Passport Size Photograph is required';
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

  const handleFileSelect = (key, file) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors(prev => ({ ...prev, [key]: 'Only JPG/PNG files allowed' }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({ ...prev, [key]: 'File size must be under 2MB' }));
      return;
    }
    setErrors(prev => ({ ...prev, [key]: '' }));
    setDocuments(prev => ({ ...prev, [key]: file }));
    setPreviews(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
  };

  const handleRemoveFile = (key) => {
    setDocuments(prev => ({ ...prev, [key]: null }));
    setPreviews(prev => {
      const newPreviews = { ...prev };
      if (newPreviews[key]) URL.revokeObjectURL(newPreviews[key]);
      delete newPreviews[key];
      return newPreviews;
    });
    if (fileInputRefs.current[key]) fileInputRefs.current[key].value = '';
  };

  const handleDrop = useCallback((key, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(key, file);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-primary', 'bg-primary-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary', 'bg-primary-50');
  };

  const handleSubmitApplication = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) fd.append(key, value);
      });
      fd.append('documentType', documentType);
      if (documents.cnicFront) fd.append('documents[cnicFront]', documents.cnicFront);
      if (documents.cnicBack) fd.append('documents[cnicBack]', documents.cnicBack);
      if (documents.bform) fd.append('documents[bform]', documents.bform);
      if (documents.markSheet) fd.append('documents[markSheet]', documents.markSheet);
      if (documents.certificate) fd.append('documents[certificate]', documents.certificate);
      if (documents.photo) fd.append('documents[photo]', documents.photo);

      const res = await submitApplication(fd);
      const sd = JSON.parse(localStorage.getItem('student') || '{}');
      navigate('/registration-success', {
        state: {
          registrationNumber: res.data?.registrationNumber || sd.registrationNumber || form.cnicOrBform || '',
          password: sd.password || '',
          formData: { ...form }
        }
      });
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to submit application. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const DocumentUpload = ({ docKey, label }) => {
    const file = documents[docKey];
    const preview = previews[docKey];
    const error = errors[docKey];

    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
        <div
          className={`relative border-2 border-dashed rounded-xl p-4 transition-all ${
            error ? 'border-red-400 bg-red-50' :
            file ? 'border-success bg-green-50' :
            'border-gray-300 hover:border-primary'
          }`}
          onDrop={(e) => handleDrop(docKey, e)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {file && preview ? (
            <div className="relative">
              <img src={preview} alt={label} className="w-full h-40 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => handleRemoveFile(docKey)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
              <p className="text-xs text-gray-500 mt-1.5 truncate">{file.name}</p>
            </div>
          ) : (
            <div
              className="text-center cursor-pointer py-4"
              onClick={() => fileInputRefs.current[docKey]?.click()}
            >
              <Upload size={28} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
              <p className="text-xs text-gray-400 mt-1">JPG or PNG, max 2MB</p>
            </div>
          )}
          <input
            ref={el => fileInputRefs.current[docKey] = el}
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => handleFileSelect(docKey, e.target.files[0])}
          />
        </div>
        {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{error}</p>}
      </div>
    );
  };

  const renderAccountCreation = () => {
    if (accountResult) {
      return (
        <div className="text-center max-w-lg mx-auto py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={44} className="text-success" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-800 mb-3">Account Created!</h2>
          <p className="text-gray-600 mb-4">{accountResult.message}</p>
          <div className="bg-primary-50 rounded-xl p-5 mb-4 border border-primary-100">
            <p className="text-sm text-gray-500 mb-1">Your Registration ID</p>
            <p className="text-2xl font-heading font-bold text-primary tracking-wider">
              {accountResult.registrationNumber}
            </p>
          </div>
          {accountResult.password && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-green-700 mb-1">Your Password</p>
              <p className="text-lg font-bold text-green-800 tracking-wider font-mono">
                {accountResult.password}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Save this password. You will need it to login.
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500 mb-6">
            Please login to complete your application.
          </p>
          <button onClick={() => navigate('/login')} className="btn-primary w-full justify-center py-3">
            <LogIn size={18} /> Login to Continue
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleCreateAccount} className="space-y-6">
        {errors.submit && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <AlertCircle size={16} />
            <span>{errors.submit}</span>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input type="text" value={createForm.fullName} onChange={e => updateCreateForm('fullName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.fullName ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter full name" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
            <input type="text" value={createForm.fatherName} onChange={e => updateCreateForm('fatherName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.fatherName ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter father's name" />
            {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">CNIC / B-Form</label>
            <input type="text" value={createForm.cnicOrBform} onChange={e => updateCreateForm('cnicOrBform', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.cnicOrBform ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="XXXXX-XXXXXXX-X" />
            {errors.cnicOrBform && <p className="text-red-500 text-xs mt-1">{errors.cnicOrBform}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
            <input type="date" value={createForm.dateOfBirth} onChange={e => updateCreateForm('dateOfBirth', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
            <input type="text" value={createForm.mobileNumber} onChange={e => updateCreateForm('mobileNumber', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.mobileNumber ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="03XX-XXXXXXX" />
            {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" value={createForm.email} onChange={e => updateCreateForm('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="your@email.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input type="password" value={createForm.password} onChange={e => updateCreateForm('password', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Min 6 characters" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input type="password" value={createForm.confirmPassword} onChange={e => updateCreateForm('confirmPassword', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Re-enter password" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base">
          {loading ? <Loader2 size={18} className="animate-spin" /> : <User size={18} />}
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    );
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = i === step;
        const isCompleted = i < step;
        return (
          <div key={i} className="flex items-center shrink-0">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isCompleted ? 'bg-success text-white' :
                isActive ? 'bg-primary text-white ring-4 ring-primary-200' :
                'bg-gray-200 text-gray-500'
              }`}>
                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span className={`text-[10px] mt-1.5 font-medium text-center ${
                isCompleted ? 'text-success' :
                isActive ? 'text-primary font-semibold' :
                'text-gray-400'
              }`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 md:w-16 h-0.5 mx-1 md:mx-2 ${
                i < step ? 'bg-success' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderApplicationForm = () => {
    if (fetchLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      );
    }

    return (
      <>
        {renderStepIndicator()}
        {renderStep()}
        {step < 4 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button onClick={handleBack} disabled={step === 0}
              className="btn-outline disabled:opacity-40 disabled:cursor-not-allowed text-sm">
              <ChevronLeft size={16} /> Back
            </button>
            <button onClick={handleNext} className="btn-primary text-sm">
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input type="text" value={form.fullName} onChange={e => updateForm('fullName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none" readOnly />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Father's/Guardian's Name</label>
            <input type="text" value={form.fatherName} onChange={e => updateForm('fatherName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none" readOnly />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">CNIC/B-Form Number</label>
            <input type="text" value={form.cnicOrBform} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
            <input type="date" value={form.dateOfBirth} onChange={e => updateForm('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none" readOnly />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
            <select value={form.gender} onChange={e => updateForm('gender', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.gender ? 'border-red-400' : 'border-gray-200'}`}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Province <span className="text-red-500">*</span></label>
            <select value={form.province} onChange={e => updateForm('province', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.province ? 'border-red-400' : 'border-gray-200'}`}>
              <option value="">Select Province</option>
              {provinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">District <span className="text-red-500">*</span></label>
            <input type="text" value={form.district} onChange={e => updateForm('district', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.district ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter district" />
            {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
            <input type="text" value={form.city} onChange={e => updateForm('city', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter city" />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Residential Address <span className="text-red-500">*</span></label>
            <textarea rows={2} value={form.residentialAddress} onChange={e => updateForm('residentialAddress', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary resize-none ${errors.residentialAddress ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter your full address" />
            {errors.residentialAddress && <p className="text-red-500 text-xs mt-1">{errors.residentialAddress}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
            <input type="text" value={form.mobileNumber} onChange={e => updateForm('mobileNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none" readOnly />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" value={form.email} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Educational Institution <span className="text-red-500">*</span></label>
            <input type="text" value={form.schoolName} onChange={e => updateForm('schoolName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.schoolName ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter school/college/university name" />
            {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Class/Grade/Semester <span className="text-red-500">*</span></label>
            <select value={form.currentClass} onChange={e => updateForm('currentClass', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.currentClass ? 'border-red-400' : 'border-gray-200'}`}>
              <option value="">Select Class</option>
              {classGrades.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            {errors.currentClass && <p className="text-red-500 text-xs mt-1">{errors.currentClass}</p>}
          </div>
        </div>
      );

      case 1: return (
        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">School/College/University Name <span className="text-red-500">*</span></label>
            <input type="text" value={form.schoolName} onChange={e => updateForm('schoolName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.schoolName ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Enter institution name" />
            {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Qualification/Class <span className="text-red-500">*</span></label>
            <input type="text" value={form.currentQualification} onChange={e => updateForm('currentQualification', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.currentQualification ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="e.g. Matric, FSC, BS" />
            {errors.currentQualification && <p className="text-red-500 text-xs mt-1">{errors.currentQualification}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Total Marks <span className="text-red-500">*</span></label>
            <input type="number" value={form.totalMarks} onChange={e => updateForm('totalMarks', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.totalMarks ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="e.g. 1100" />
            {errors.totalMarks && <p className="text-red-500 text-xs mt-1">{errors.totalMarks}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Obtained Marks <span className="text-red-500">*</span></label>
            <input type="number" value={form.obtainedMarks} onChange={e => updateForm('obtainedMarks', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.obtainedMarks ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="e.g. 850" />
            {errors.obtainedMarks && <p className="text-red-500 text-xs mt-1">{errors.obtainedMarks}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Last Qualification <span className="text-red-500">*</span></label>
            <input type="text" value={form.lastQualification} onChange={e => updateForm('lastQualification', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.lastQualification ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="e.g. Matric, FSC" />
            {errors.lastQualification && <p className="text-red-500 text-xs mt-1">{errors.lastQualification}</p>}
          </div>
        </div>
      );

      case 2: return (
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Student Mobile Number</label>
            <input type="text" value={form.studentMobile} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Father's/Guardian's Mobile Number <span className="text-red-500">*</span></label>
            <input type="text" value={form.fatherMobile} onChange={e => updateForm('fatherMobile', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.fatherMobile ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="03XX-XXXXXXX" />
            {errors.fatherMobile && <p className="text-red-500 text-xs mt-1">{errors.fatherMobile}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number <span className="text-red-500">*</span></label>
            <input type="text" value={form.whatsappNumber} onChange={e => updateForm('whatsappNumber', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary ${errors.whatsappNumber ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="03XX-XXXXXXX" />
            {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" value={form.studentEmail} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Facebook Profile URL <span className="text-gray-400 font-normal">(optional)</span></label>
            <input type="url" value={form.facebookUrl} onChange={e => updateForm('facebookUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://facebook.com/..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Instagram Profile URL <span className="text-gray-400 font-normal">(optional)</span></label>
            <input type="url" value={form.instagramUrl} onChange={e => updateForm('instagramUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">TikTok Profile URL <span className="text-gray-400 font-normal">(optional)</span></label>
            <input type="url" value={form.tiktokUrl} onChange={e => updateForm('tiktokUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://tiktok.com/..." />
          </div>
        </div>
      );

      case 3: return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Document Type</label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setDocumentType('cnic')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  documentType === 'cnic'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                }`}>
                CNIC
              </button>
              <button type="button" onClick={() => setDocumentType('bform')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  documentType === 'bform'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                }`}>
                B-Form
              </button>
            </div>
          </div>

          {documentType === 'cnic' ? (
            <div className="grid md:grid-cols-2 gap-5">
              <DocumentUpload docKey="cnicFront" label="CNIC Front Side" accept={ACCEPTED_TYPES} />
              <DocumentUpload docKey="cnicBack" label="CNIC Back Side" accept={ACCEPTED_TYPES} />
            </div>
          ) : (
            <DocumentUpload docKey="bform" label="B-Form" accept={ACCEPTED_TYPES} />
          )}

          <div className="grid md:grid-cols-2 gap-5">
            <DocumentUpload docKey="markSheet" label="Latest Mark Sheet" accept={ACCEPTED_TYPES} />
            <DocumentUpload docKey="certificate" label="Latest Certificate" accept={ACCEPTED_TYPES} />
          </div>

          <DocumentUpload docKey="photo" label="Passport Size Photograph" accept={ACCEPTED_TYPES} />
        </div>
      );

      case 4: return (
        <div className="max-w-2xl mx-auto space-y-4">
          {errors.submit && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              <AlertCircle size={16} />
              <span>{errors.submit}</span>
            </div>
          )}

          <h3 className="text-lg font-heading font-bold text-gray-800 mb-4">Review Your Application</h3>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
              <User size={16} /> Personal Information
            </h4>
            <div className="space-y-2">
              {[
                ['Full Name', form.fullName],
                ["Father's Name", form.fatherName],
                ['CNIC/B-Form', form.cnicOrBform],
                ['Date of Birth', form.dateOfBirth],
                ['Gender', form.gender],
                ['Province', form.province],
                ['District', form.district],
                ['City', form.city],
                ['Address', form.residentialAddress],
                ['Mobile', form.mobileNumber],
                ['Email', form.email],
                ['Current Class', form.currentClass],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-xs font-medium text-gray-800">{value || '-'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
              <BookOpen size={16} /> Academic Information
            </h4>
            <div className="space-y-2">
              {[
                ['Institution', form.schoolName],
                ['Current Qualification', form.currentQualification],
                ['Total Marks', form.totalMarks],
                ['Obtained Marks', form.obtainedMarks],
                ['Last Qualification', form.lastQualification],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-xs font-medium text-gray-800">{value || '-'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
              <Phone size={16} /> Contact Information
            </h4>
            <div className="space-y-2">
              {[
                ['Student Mobile', form.studentMobile],
                ["Father's Mobile", form.fatherMobile],
                ['WhatsApp', form.whatsappNumber],
                ['Email', form.studentEmail],
                ['Facebook', form.facebookUrl || '-'],
                ['Instagram', form.instagramUrl || '-'],
                ['TikTok', form.tiktokUrl || '-'],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-xs font-medium text-gray-800">{value || '-'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
              <FileText size={16} /> Documents
            </h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {documentFields.map(({ key, label }) => {
                const preview = previews[key];
                const file = documents[key];
                const isRelevant = key === 'bform' ? documentType === 'bform' :
                  key.startsWith('cnic') ? documentType === 'cnic' : true;
                if (!isRelevant) return null;
                return (
                  <div key={key} className="text-center">
                    {preview ? (
                      <div className="relative">
                        <img src={preview} alt={label} className="w-full h-16 object-cover rounded-lg border border-gray-200" />
                      </div>
                    ) : (
                      <div className="w-full h-16 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-200">
                        <FileText size={20} className="text-gray-400" />
                      </div>
                    )}
                    <p className="text-[10px] text-gray-500 mt-1 truncate">{label}</p>
                    {file && <p className="text-[10px] text-success font-medium">Uploaded</p>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6">
            <button onClick={handleSubmitApplication} disabled={loading}
              className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60">
              {loading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      );

      default: return null;
    }
  };

  if (phase === 'create') {
    return (
      <div>
        <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Create Account</h1>
            <p className="text-white/80">Register for EduTalent Pakistan Scholarship</p>
          </div>
        </section>
        <section className="py-12 md:py-16 bg-gray-50 min-h-[60vh]">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
              {renderAccountCreation()}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Complete Application</h1>
          <p className="text-white/80">Fill in your details to apply for the scholarship</p>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            {renderApplicationForm()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
