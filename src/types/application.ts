export interface Application {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  program: string;
  university: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  submittedAt: string;
  documents: {
    type: string;
    name: string;
    url: string;
  }[];
  notes: string;
}