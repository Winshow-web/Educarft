import { useState, useEffect, useCallback } from 'react';
import type { Application } from '../types/application';
import { initialApplications } from '../data/applications';

interface UseApplicationsReturn {
  applications: Application[];
  loading: boolean;
  error: Error | null;
  updateApplications: (newApplications: Application[]) => Promise<void>;
  refreshApplications: () => Promise<void>;
}

export function useApplications(): UseApplicationsReturn {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadApplications = useCallback(async () => {
    try {
      const storedData = localStorage.getItem('applications');
      
      if (storedData) {
        setApplications(JSON.parse(storedData));
      } else {
        setApplications(initialApplications);
        localStorage.setItem('applications', JSON.stringify(initialApplications));
      }
      setError(null);
    } catch (err) {
      console.error('Error loading applications:', err);
      setApplications(initialApplications);
      setError(err instanceof Error ? err : new Error('Failed to load applications'));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateApplications = async (newApplications: Application[]): Promise<void> => {
    try {
      localStorage.setItem('applications', JSON.stringify(newApplications));
      setApplications(newApplications);
      setError(null);
    } catch (err) {
      console.error('Error updating applications:', err);
      setError(err instanceof Error ? err : new Error('Failed to update applications'));
      throw err;
    }
  };

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  return {
    applications,
    loading,
    error,
    updateApplications,
    refreshApplications: loadApplications
  };
}