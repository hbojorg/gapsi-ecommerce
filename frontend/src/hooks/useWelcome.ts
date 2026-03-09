import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchWelcome, clearWelcomeError } from '../store/slices/welcomeSlice';

export const useWelcome = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.welcome);

  const loadWelcome = useCallback(() => {
    dispatch(fetchWelcome());
  }, [dispatch]);

  const resetError = useCallback(() => {
    dispatch(clearWelcomeError());
  }, [dispatch]);

  useEffect(() => {
    if (!state.data && !state.loading) {
      loadWelcome();
    }
  }, [state.data, state.loading, loadWelcome]);

  return {
    ...state,
    loadWelcome,
    resetError,
  };
};
