import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import proveedorReducer from '../../store/slices/proveedorSlice';
import ProveedorForm from '../../components/proveedores/ProveedorForm';

const createTestStore = () =>
  configureStore({
    reducer: {
      proveedores: proveedorReducer,
    },
  });

const renderForm = (store = createTestStore()) =>
  render(
    <Provider store={store}>
      <ProveedorForm />
    </Provider>
  );

describe('ProveedorForm', () => {
  it('renders the Agregar button', () => {
    renderForm();
    expect(screen.getByText('Agregar')).toBeInTheDocument();
  });

  it('opens the dialog when Agregar is clicked', async () => {
    renderForm();
    fireEvent.click(screen.getByText('Agregar'));
    await waitFor(() => {
      expect(screen.getByText('Agregar Proveedor')).toBeInTheDocument();
    });
  });

  it('renders form fields when dialog is open', async () => {
    renderForm();
    fireEvent.click(screen.getByText('Agregar'));
    await waitFor(() => {
      expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Raz.n Social/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Direcci.n/i)).toBeInTheDocument();
    });
  });

  it('shows validation errors for too-short fields on submit', async () => {
    renderForm();
    fireEvent.click(screen.getByText('Agregar'));
    await waitFor(() => {
      expect(screen.getByTestId('input-nombre')).toBeInTheDocument();
    });

    // Fill with single-character values (below min length of 2)
    fireEvent.change(screen.getByTestId('input-nombre'), { target: { value: 'A' } });
    fireEvent.change(screen.getByTestId('input-razon-social'), { target: { value: 'B' } });
    fireEvent.change(screen.getByTestId('input-direccion'), { target: { value: 'C' } });

    fireEvent.click(screen.getByText('Guardar'));
    await waitFor(() => {
      expect(screen.getByText('El nombre debe tener al menos 2 caracteres')).toBeInTheDocument();
      expect(screen.getByText('La razón social debe tener al menos 2 caracteres')).toBeInTheDocument();
      expect(screen.getByText('La dirección debe tener al menos 2 caracteres')).toBeInTheDocument();
    });
  });

  it('closes dialog when Cancelar is clicked', async () => {
    renderForm();
    fireEvent.click(screen.getByText('Agregar'));
    await waitFor(() => {
      expect(screen.getByText('Agregar Proveedor')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Cancelar'));
    await waitFor(() => {
      expect(screen.queryByText('Agregar Proveedor')).not.toBeInTheDocument();
    });
  });
});
