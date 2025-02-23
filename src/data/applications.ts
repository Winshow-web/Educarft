import type { Application } from '../types/application';

export const initialApplications: Application[] = [
  {
    id: '1',
    studentName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+371 20123456',
    program: 'Business Administration and Digital Innovation',
    university: 'EKA University of Applied Sciences',
    status: 'reviewing',
    submittedAt: '2024-03-15T10:30:00Z',
    documents: [
      {
        type: 'passport',
        name: 'passport.pdf',
        url: '#'
      },
      {
        type: 'transcript',
        name: 'academic_transcript.pdf',
        url: '#'
      }
    ],
    notes: 'Candidate has strong academic background'
  },
  {
    id: '2',
    studentName: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '+371 20789012',
    program: 'Computer Science and Software Engineering',
    university: 'Transport and Telecommunication Institute',
    status: 'pending',
    submittedAt: '2024-03-14T15:45:00Z',
    documents: [
      {
        type: 'passport',
        name: 'passport.pdf',
        url: '#'
      },
      {
        type: 'transcript',
        name: 'transcript.pdf',
        url: '#'
      }
    ],
    notes: ''
  }
];