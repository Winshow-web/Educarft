import React, { useState } from 'react';
import { Search, FileText, Clock, CheckCircle, XCircle, AlertCircle, Download, MessageCircle } from 'lucide-react';
import { useApplications } from '../hooks/useApplications';
import type { Application } from '../types/application';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const STATUS_ICONS = {
  pending: <Clock className="w-4 h-4" />,
  reviewing: <AlertCircle className="w-4 h-4" />,
  accepted: <CheckCircle className="w-4 h-4" />,
  rejected: <XCircle className="w-4 h-4" />
};

export function ApplicationsPage() {
  const { applications, loading, error, updateApplications } = useApplications();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [note, setNote] = useState('');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const updateApplicationStatus = async (id: string, status: Application['status']) => {
    const updatedApplications = applications.map(app =>
      app.id === id ? { ...app, status } : app
    );
    await updateApplications(updatedApplications);
  };

  const addNote = async () => {
    if (!selectedApplication || !note.trim()) return;

    const updatedApplications = applications.map(app =>
      app.id === selectedApplication.id
        ? { ...app, notes: app.notes ? `${app.notes}\n${note}` : note }
        : app
    );
    await updateApplications(updatedApplications);
    setNote('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Applications</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Applications List */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-4">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all ${
                  selectedApplication?.id === application.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedApplication(application)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{application.studentName}</h3>
                    <p className="text-sm text-gray-600">{application.email}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center space-x-1 ${STATUS_COLORS[application.status]}`}>
                    {STATUS_ICONS[application.status]}
                    <span className="text-sm capitalize">{application.status}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <p className="font-medium">{application.program}</p>
                  <p>{application.university}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="w-4 h-4 mr-1" />
                  <span>{application.documents.length} documents</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Details */}
      {selectedApplication && (
        <div className="w-96 border-l bg-gray-50 overflow-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Application Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Student Information</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">{selectedApplication.studentName}</p>
                  <p className="text-sm text-gray-600">{selectedApplication.email}</p>
                  <p className="text-sm text-gray-600">{selectedApplication.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Program Details</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">{selectedApplication.program}</p>
                  <p className="text-sm text-gray-600">{selectedApplication.university}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Documents</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{doc.name}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(['pending', 'reviewing', 'accepted', 'rejected'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateApplicationStatus(selectedApplication.id, status)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1
                        ${selectedApplication.status === status
                          ? STATUS_COLORS[status]
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {STATUS_ICONS[status]}
                      <span className="capitalize">{status}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="mb-4 whitespace-pre-wrap text-sm text-gray-600">
                    {selectedApplication.notes || 'No notes yet'}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add a note..."
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={addNote}
                      disabled={!note.trim()}
                      className="p-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}