import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchProveedores,
  createProveedor,
  deleteProveedor,
  clearError,
  clearCreateSuccess,
  clearDeleteSuccess,
} from '../store/slices/proveedorSlice';
import type { ProveedorFormData } from '../types/proveedor';

export const useProveedores = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.proveedores);

  const loadProveedores = useCallback(
    (page?: number, size?: number) => {
      dispatch(fetchProveedores({ page, size }));
    },
    [dispatch]
  );

  const addProveedor = useCallback(
    (data: ProveedorFormData) => {
      dispatch(createProveedor(data));
    },
    [dispatch]
  );

  const removeProveedor = useCallback(
    (id: number) => {
      dispatch(deleteProveedor(id));
    },
    [dispatch]
  );

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const resetCreateSuccess = useCallback(() => {
    dispatch(clearCreateSuccess());
  }, [dispatch]);

  const resetDeleteSuccess = useCallback(() => {
    dispatch(clearDeleteSuccess());
  }, [dispatch]);

  return {
    ...state,
    loadProveedores,
    addProveedor,
    removeProveedor,
    resetError,
    resetCreateSuccess,
    resetDeleteSuccess,
  };
};
