import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, FileText, Check } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useApplications } from '../hooks/useApplications';
import { useUniversities } from '../hooks/useUniversities';
import type { Application } from '../types/application';

interface FormData {
  studentName: string;
  email: string;
  phone: string;
  documents: File[];
}

interface FormErrors {
  studentName?: string;
  email?: string;
  phone?: string;
  documents?: string;
}

export function ApplicationForm() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { universities } = useUniversities();
  const { applications, updateApplications } = useApplications();
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    email: '',
    phone: '',
    documents: []
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Find the program from the universities data
  const programInfo = React.useMemo(() => {
    const [universityName, programTitle] = (programId || '').split('---');
    const university = universities.find(u => u.name === decodeURIComponent(universityName));
    const program = university?.programs.find(p => p.title === decodeURIComponent(programTitle));
    return { university, program };
  }, [programId, universities]);

  if (!programInfo.university || !programInfo.program) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Program Not Found</h2>
            <p className="text-gray-600 mb-4">The program you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/programs')}
              className="text-blue-600 hover:text-blue-800"
            >
              Return to Programs
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Invalid phone format (e.g., +371 12345678)';
    }

    if (formData.documents.length === 0) {
      newErrors.documents = 'At least one document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const newApplication: Application = {
        id: crypto.randomUUID(),
        studentName: formData.studentName,
        email: formData.email,
        phone: formData.phone,
        program: programInfo.program.title,
        university: programInfo.university.name,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        documents: formData.documents.map(file => ({
          type: 'document',
          name: file.name,
          url: '#'
        })),
        notes: ''
      };

      await updateApplications([...applications, newApplication]);
      setSubmitSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        navigate('/programs');
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors({
        ...errors,
        submit: 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          {submitSuccess ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
              <p className="text-gray-600 mb-4">
                Thank you for your application. We will review it and get back to you soon.
              </p>
              <p className="text-sm text-gray-500">Redirecting to programs page...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 bg-[#1a0b2e] text-white">
                <h1 className="text-2xl font-bold mb-2">Program Application</h1>
                <p className="text-gray-200">{programInfo.program.title}</p>
                <p className="text-gray-300 text-sm">{programInfo.university.name}</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className={`block w-full rounded-md shadow-sm ${
                      errors.studentName ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-[#6000ff] focus:border-[#6000ff]`}
                  />
                  {errors.studentName && (
                    <p className="mt-1 text-sm text-red-600">{errors.studentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`block w-full rounded-md shadow-sm ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-[#6000ff] focus:border-[#6000ff]`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+371 12345678"
                    className={`block w-full rounded-md shadow-sm ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-[#6000ff] focus:border-[#6000ff]`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Documents *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="documents"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#6000ff] hover:text-[#1a0b2e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#6000ff]"
                        >
                          <span>Upload files</span>
                          <input
                            id="documents"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              setFormData({ ...formData, documents: [...formData.documents, ...files] });
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC up to 10MB each
                      </p>
                    </div>
                  </div>

                  {formData.documents.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {formData.documents.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newDocs = formData.documents.filter((_, i) => i !== index);
                              setFormData({ ...formData, documents: newDocs });
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {errors.documents && (
                    <p className="mt-1 text-sm text-red-600">{errors.documents}</p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a0b2e] hover:bg-[#6000ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6000ff] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}