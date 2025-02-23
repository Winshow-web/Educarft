import React, { useState } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';
import type { University, Program } from '../types/university';

interface UniversityModalProps {
  university: University;
  onSave: (university: University) => void;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  location?: string;
  country?: string;
  description?: string;
  programs?: {
    title?: string;
    duration?: string;
    language?: string;
    tuition?: string;
    intake?: string;
  }[];
}

export function UniversityModal({ university, onSave, onClose }: UniversityModalProps) {
  const [editedUniversity, setEditedUniversity] = useState(university);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate basic university info
    if (!editedUniversity.name.trim()) {
      newErrors.name = 'University name is required';
    }
    if (!editedUniversity.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!editedUniversity.country) {
      newErrors.country = 'Country is required';
    }
    if (!editedUniversity.description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Validate programs
    if (editedUniversity.programs.length === 0) {
      newErrors.programs = [{ title: 'At least one program is required' }];
    } else {
      const programErrors = editedUniversity.programs.map(program => {
        const errors: FormErrors['programs'][0] = {};
        if (!program.title.trim()) errors.title = 'Program title is required';
        if (!program.duration.trim()) errors.duration = 'Duration is required';
        if (!program.language.trim()) errors.language = 'Language is required';
        if (!program.tuition.trim()) errors.tuition = 'Tuition is required';
        if (!program.intake.trim()) errors.intake = 'Intake is required';
        return Object.keys(errors).length > 0 ? errors : undefined;
      });

      if (programErrors.some(error => error !== undefined)) {
        newErrors.programs = programErrors;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(editedUniversity);
    }
  };

  const addNewProgram = () => {
    setEditedUniversity({
      ...editedUniversity,
      programs: [...editedUniversity.programs, {
        title: '',
        duration: '',
        language: '',
        tuition: '',
        intake: ''
      }]
    });
  };

  const updateProgram = (index: number, field: keyof Program, value: string) => {
    const newPrograms = [...editedUniversity.programs];
    newPrograms[index] = { ...newPrograms[index], [field]: value };
    setEditedUniversity({
      ...editedUniversity,
      programs: newPrograms
    });
    
    // Clear error for the updated field
    if (errors.programs?.[index]?.[field]) {
      const newErrors = { ...errors };
      if (newErrors.programs?.[index]) {
        delete newErrors.programs[index][field];
        if (Object.keys(newErrors.programs[index]).length === 0) {
          newErrors.programs[index] = undefined;
        }
      }
      setErrors(newErrors);
    }
  };

  const removeProgram = (index: number) => {
    setEditedUniversity({
      ...editedUniversity,
      programs: editedUniversity.programs.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editedUniversity.name ? 'Edit University' : 'Add University'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic University Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  University Name *
                </label>
                <input
                  type="text"
                  value={editedUniversity.name}
                  onChange={(e) => {
                    setEditedUniversity({ ...editedUniversity, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                <input
                  type="text"
                  value={editedUniversity.logo}
                  onChange={(e) => setEditedUniversity({ ...editedUniversity, logo: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  value={editedUniversity.description}
                  onChange={(e) => {
                    setEditedUniversity({ ...editedUniversity, description: e.target.value });
                    if (errors.description) setErrors({ ...errors, description: undefined });
                  }}
                  rows={3}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={editedUniversity.location}
                    onChange={(e) => {
                      setEditedUniversity({ ...editedUniversity, location: e.target.value });
                      if (errors.location) setErrors({ ...errors, location: undefined });
                    }}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.location ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country *
                  </label>
                  <select
                    value={editedUniversity.country}
                    onChange={(e) => {
                      setEditedUniversity({ ...editedUniversity, country: e.target.value });
                      if (errors.country) setErrors({ ...errors, country: undefined });
                    }}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.country ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a country</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lithuania">Lithuania</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                  )}
                </div>
              </div>

              {/* Programs Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">Programs *</label>
                  <button
                    type="button"
                    onClick={addNewProgram}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Program
                  </button>
                </div>

                {editedUniversity.programs.length === 0 && errors.programs && (
                  <p className="text-sm text-red-600 mb-4">{errors.programs[0]?.title}</p>
                )}

                <div className="space-y-4">
                  {editedUniversity.programs.map((program, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Program #{index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeProgram(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Program Title *
                          </label>
                          <input
                            type="text"
                            value={program.title}
                            onChange={(e) => updateProgram(index, 'title', e.target.value)}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                              errors.programs?.[index]?.title ? 'border-red-300' : 'border-gray-300'
                            }`}
                          />
                          {errors.programs?.[index]?.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.programs[index].title}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Duration *
                            </label>
                            <input
                              type="text"
                              value={program.duration}
                              onChange={(e) => updateProgram(index, 'duration', e.target.value)}
                              placeholder="e.g., 4 years"
                              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                errors.programs?.[index]?.duration ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            {errors.programs?.[index]?.duration && (
                              <p className="mt-1 text-sm text-red-600">{errors.programs[index].duration}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Language *
                            </label>
                            <input
                              type="text"
                              value={program.language}
                              onChange={(e) => updateProgram(index, 'language', e.target.value)}
                              placeholder="e.g., English"
                              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                errors.programs?.[index]?.language ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            {errors.programs?.[index]?.language && (
                              <p className="mt-1 text-sm text-red-600">{errors.programs[index].language}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Tuition *
                            </label>
                            <input
                              type="text"
                              value={program.tuition}
                              onChange={(e) => updateProgram(index, 'tuition', e.target.value)}
                              placeholder="e.g., €3,500/year"
                              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                errors.programs?.[index]?.tuition ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            {errors.programs?.[index]?.tuition && (
                              <p className="mt-1 text-sm text-red-600">{errors.programs[index].tuition}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Intake *
                            </label>
                            <input
                              type="text"
                              value={program.intake}
                              onChange={(e) => updateProgram(index, 'intake', e.target.value)}
                              placeholder="e.g., September"
                              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                errors.programs?.[index]?.intake ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            {errors.programs?.[index]?.intake && (
                              <p className="mt-1 text-sm text-red-600">{errors.programs[index].intake}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                <div className="space-y-2">
                  {editedUniversity.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...editedUniversity.features];
                          newFeatures[index] = e.target.value;
                          setEditedUniversity({
                            ...editedUniversity,
                            features: newFeatures
                          });
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newFeatures = editedUniversity.features.filter((_, i) => i !== index);
                          setEditedUniversity({
                            ...editedUniversity,
                            features: newFeatures
                          });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditedUniversity({
                      ...editedUniversity,
                      features: [...editedUniversity.features, '']
                    })}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feature
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save University
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}