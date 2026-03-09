import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Proveedor, ProveedorFormData, ProveedorPage } from '../../types/proveedor';
import * as proveedorService from '../../services/proveedorService';
import axios from 'axios';

interface ProveedorState {
  proveedores: Proveedor[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  deleteSuccess: boolean;
}

const initialState: ProveedorState = {
  proveedores: [],
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
  pageSize: 10,
  loading: false,
  error: null,
  createSuccess: false,
  deleteSuccess: false,
};

export const fetchProveedores = createAsyncThunk<
  ProveedorPage,
  { page?: number; size?: number } | undefined,
  { rejectValue: string }
>('proveedores/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const page = params?.page ?? 0;
    const size = params?.size ?? 10;
    return await proveedorService.getProveedores(page, size);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data?.error || 'Error al cargar proveedores');
    }
    return rejectWithValue('Error de conexion');
  }
});

export const createProveedor = createAsyncThunk<
  Proveedor,
  ProveedorFormData,
  { rejectValue: string }
>('proveedores/create', async (data, { rejectWithValue }) => {
  try {
    return await proveedorService.createProveedor(data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data?.error || 'Error al crear proveedor');
    }
    return rejectWithValue('Error de conexion');
  }
});

export const deleteProveedor = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('proveedores/delete', async (id, { rejectWithValue }) => {
  try {
    await proveedorService.deleteProveedor(id);
    return id;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data?.error || 'Error al eliminar proveedor');
    }
    return rejectWithValue('Error de conexion');
  }
});

const proveedorSlice = createSlice({
  name: 'proveedores',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearCreateSuccess(state) {
      state.createSuccess = false;
    },
    clearDeleteSuccess(state) {
      state.deleteSuccess = false;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch proveedores
    builder
      .addCase(fetchProveedores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProveedores.fulfilled, (state, action) => {
        state.loading = false;
        state.proveedores = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.number;
        state.pageSize = action.payload.size;
      })
      .addCase(fetchProveedores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      });

    // Create proveedor
    builder
      .addCase(createProveedor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createProveedor.fulfilled, (state) => {
        state.loading = false;
        state.createSuccess = true;
      })
      .addCase(createProveedor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
        state.createSuccess = false;
      });

    // Delete proveedor
    builder
      .addCase(deleteProveedor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteProveedor.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;
        state.proveedores = state.proveedores.filter((p) => p.id !== action.payload);
        state.totalElements -= 1;
      })
      .addCase(deleteProveedor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
        state.deleteSuccess = false;
      });
  },
});

export const { clearError, clearCreateSuccess, clearDeleteSuccess, setCurrentPage } =
  proveedorSlice.actions;

export default proveedorSlice.reducer;
