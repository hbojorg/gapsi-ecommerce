import api from './api';
import type { Proveedor, ProveedorFormData, ProveedorPage } from '../types/proveedor';

export const getProveedores = async (
  page: number = 0,
  size: number = 10
): Promise<ProveedorPage> => {
  const response = await api.get<ProveedorPage>('/proveedores', {
    params: { page, size },
  });
  return response.data;
};

export const createProveedor = async (
  data: ProveedorFormData
): Promise<Proveedor> => {
  const response = await api.post<Proveedor>('/proveedores', data);
  return response.data;
};

export const deleteProveedor = async (id: number): Promise<void> => {
  await api.delete(`/proveedores/${id}`);
};
