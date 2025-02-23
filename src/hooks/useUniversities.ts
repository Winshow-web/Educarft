import { useState, useEffect, useCallback } from 'react';
import { University } from '../types/university';
import { initialUniversities } from '../data/universities';

interface UseUniversitiesReturn {
  universities: University[];
  loading: boolean;
  error: Error | null;
  updateUniversities: (newUniversities: University[]) => Promise<void>;
  refreshUniversities: () => Promise<void>;
}

export function useUniversities(): UseUniversitiesReturn {
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const validateUniversities = (data: unknown): data is University[] => {
    if (!Array.isArray(data)) return false;
    return data.every(item => 
      typeof item === 'object' &&
      item !== null &&
      'name' in item &&
      'programs' in item &&
      Array.isArray((item as University).programs)
    );
  };

  const loadUniversities = useCallback(async () => {
    try {
      const storedData = localStorage.getItem('universities');
      
      if (storedData) {
        const parsed = JSON.parse(storedData);
        
        if (validateUniversities(parsed)) {
          setUniversities(parsed);
        } else {
          // If stored data is invalid, fallback to initial data
          setUniversities(initialUniversities);
          localStorage.setItem('universities', JSON.stringify(initialUniversities));
        }
      } else {
        // Initialize with default data if no stored data exists
        setUniversities(initialUniversities);
        localStorage.setItem('universities', JSON.stringify(initialUniversities));
      }
      setError(null);
    } catch (err) {
      console.error('Error loading universities:', err);
      // Fallback to initial data on error
      setUniversities(initialUniversities);
      setError(err instanceof Error ? err : new Error('Failed to load universities'));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUniversities = async (newUniversities: University[]): Promise<void> => {
    try {
      if (!validateUniversities(newUniversities)) {
        throw new Error('Invalid universities data format');
      }

      localStorage.setItem('universities', JSON.stringify(newUniversities));
      setUniversities(newUniversities);
      setError(null);
    } catch (err) {
      console.error('Error updating universities:', err);
      setError(err instanceof Error ? err : new Error('Failed to update universities'));
      throw err;
    }
  };

  useEffect(() => {
    loadUniversities();
  }, [loadUniversities]);

  return {
    universities,
    loading,
    error,
    updateUniversities,
    refreshUniversities: loadUniversities
  };
}