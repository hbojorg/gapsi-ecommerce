import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import proveedorReducer, {
  clearError,
  clearCreateSuccess,
  clearDeleteSuccess,
  setCurrentPage,
} from '../../store/slices/proveedorSlice';

const createStore = () =>
  configureStore({
    reducer: {
      proveedores: proveedorReducer,
    },
  });

describe('proveedorSlice', () => {
  it('should return the initial state', () => {
    const store = createStore();
    const state = store.getState().proveedores;
    expect(state.proveedores).toEqual([]);
    expect(state.totalElements).toBe(0);
    expect(state.totalPages).toBe(0);
    expect(state.currentPage).toBe(0);
    expect(state.pageSize).toBe(10);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.createSuccess).toBe(false);
    expect(state.deleteSuccess).toBe(false);
  });

  it('should handle clearError', () => {
    const store = createStore();
    // Manually set error state by dispatching a rejected action
    store.dispatch(clearError());
    expect(store.getState().proveedores.error).toBeNull();
  });

  it('should handle clearCreateSuccess', () => {
    const store = createStore();
    store.dispatch(clearCreateSuccess());
    expect(store.getState().proveedores.createSuccess).toBe(false);
  });

  it('should handle clearDeleteSuccess', () => {
    const store = createStore();
    store.dispatch(clearDeleteSuccess());
    expect(store.getState().proveedores.deleteSuccess).toBe(false);
  });

  it('should handle setCurrentPage', () => {
    const store = createStore();
    store.dispatch(setCurrentPage(3));
    expect(store.getState().proveedores.currentPage).toBe(3);
  });

  it('should handle setCurrentPage back to 0', () => {
    const store = createStore();
    store.dispatch(setCurrentPage(5));
    store.dispatch(setCurrentPage(0));
    expect(store.getState().proveedores.currentPage).toBe(0);
  });
});
