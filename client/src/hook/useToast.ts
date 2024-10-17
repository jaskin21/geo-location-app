import { useCallback } from 'react';
import { toast } from 'react-toastify';

const useToast = () => {
  const showSuccessToast = useCallback((message) => {
    toast.success(message);
  }, []);

  const showErrorToast = useCallback((message) => {
    toast.error(message);
  }, []);

  return { showSuccessToast, showErrorToast };
};

export default useToast;