import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import proveedorReducer from '../../store/slices/proveedorSlice';

// Mock the ProveedorList to avoid Virtuoso rendering issues in tests
vi.mock('react-virtuoso', () => ({
  TableVirtuoso: ({ data, fixedHeaderContent, itemContent }: {
    data: unknown[];
    fixedHeaderContent: () => React.ReactNode;
    itemContent: (index: number, item: unknown) => React.ReactNode;
  }) => (
    <table>
      <thead>{fixedHeaderContent()}</thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>{itemContent(index, item)}</tr>
        ))}
      </tbody>
    </table>
  ),
}));

import ProveedorList from '../../components/proveedores/ProveedorList';

// Middleware that blocks async thunks from dispatching, keeping the preloaded state intact
const blockThunksMiddleware: Middleware = () => (next) => (action) => {
  if (typeof action === 'function') {
    return; // block thunks
  }
  return next(action);
};

const createTestStore = (proveedores = [
  { id: 1, nombre: 'Proveedor A', razonSocial: 'A S.A.', direccion: 'Calle 1' },
  { id: 2, nombre: 'Proveedor B', razonSocial: 'B S.A.', direccion: 'Calle 2' },
]) =>
  configureStore({
    reducer: {
      proveedores: proveedorReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(blockThunksMiddleware),
    preloadedState: {
      proveedores: {
        proveedores,
        totalElements: proveedores.length,
        totalPages: 1,
        currentPage: 0,
        pageSize: 10,
        loading: false,
        error: null,
        createSuccess: false,
        deleteSuccess: false,
      },
    },
  });

describe('ProveedorList', () => {
  it('renders proveedor names', () => {
    render(
      <Provider store={createTestStore()}>
        <ProveedorList />
      </Provider>
    );
    expect(screen.getByText('Proveedor A')).toBeInTheDocument();
    expect(screen.getByText('Proveedor B')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(
      <Provider store={createTestStore()}>
        <ProveedorList />
      </Provider>
    );
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Razón Social')).toBeInTheDocument();
    expect(screen.getByText('Dirección')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  it('renders empty state message when no proveedores', () => {
    render(
      <Provider store={createTestStore([])}>
        <ProveedorList />
      </Provider>
    );
    expect(screen.getByText('No hay proveedores registrados')).toBeInTheDocument();
  });

  it('renders delete buttons for each proveedor', () => {
    render(
      <Provider store={createTestStore()}>
        <ProveedorList />
      </Provider>
    );
    expect(screen.getByLabelText('Eliminar Proveedor A')).toBeInTheDocument();
    expect(screen.getByLabelText('Eliminar Proveedor B')).toBeInTheDocument();
  });
});
