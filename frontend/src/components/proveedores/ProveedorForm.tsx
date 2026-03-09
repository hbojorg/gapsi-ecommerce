import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Slide,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createProveedor, clearError, clearCreateSuccess, fetchProveedores } from '../../store/slices/proveedorSlice';
import type { ProveedorFormData } from '../../types/proveedor';

const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FormErrors {
  nombre?: string;
  razonSocial?: string;
  direccion?: string;
}

const emptyForm: ProveedorFormData = { nombre: '', razonSocial: '', direccion: '' };

const ProveedorForm = () => {
  const dispatch = useAppDispatch();
  const { error, createSuccess, loading, currentPage, pageSize } = useAppSelector(
    (state) => state.proveedores
  );

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProveedorFormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (createSuccess) {
      setFormData(emptyForm);
      setFormErrors({});
      setOpen(false);
      setSnackbar({
        open: true,
        message: 'Proveedor creado exitosamente',
        severity: 'success',
      });
      dispatch(clearCreateSuccess());
      dispatch(fetchProveedores({ page: currentPage, size: pageSize }));
    }
  }, [createSuccess, dispatch, currentPage, pageSize]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: 'error',
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.razonSocial.trim()) {
      errors.razonSocial = 'La razón social es requerida';
    } else if (formData.razonSocial.trim().length < 2) {
      errors.razonSocial = 'La razón social debe tener al menos 2 caracteres';
    }

    if (!formData.direccion.trim()) {
      errors.direccion = 'La dirección es requerida';
    } else if (formData.direccion.trim().length < 2) {
      errors.direccion = 'La dirección debe tener al menos 2 caracteres';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(createProveedor(formData));
    }
  };

  const handleChange = useCallback(
    (field: keyof ProveedorFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        setFormErrors((prev) => {
          if (prev[field]) {
            return { ...prev, [field]: undefined };
          }
          return prev;
        });
      },
    []
  );

  const handleClose = () => {
    setOpen(false);
    setFormData(emptyForm);
    setFormErrors({});
  };

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <>
      {/* Agregar button — blue circle + label, right-aligned like mockup */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            gap: 1,
            color: 'text.primary',
            fontWeight: 400,
            fontSize: '0.9rem',
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AddIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>
          Agregar
        </Button>
      </Box>

      {/* Dialog form */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ color: 'primary.dark', fontWeight: 500 }}>
            Agregar Proveedor
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
              <TextField
                label="Nombre"
                value={formData.nombre}
                onChange={handleChange('nombre')}
                error={!!formErrors.nombre}
                helperText={formErrors.nombre}
                fullWidth
                required
                autoFocus
                inputProps={{ 'data-testid': 'input-nombre' }}
              />
              <TextField
                label="Razón Social"
                value={formData.razonSocial}
                onChange={handleChange('razonSocial')}
                error={!!formErrors.razonSocial}
                helperText={formErrors.razonSocial}
                fullWidth
                required
                inputProps={{ 'data-testid': 'input-razon-social' }}
              />
              <TextField
                label="Dirección"
                value={formData.direccion}
                onChange={handleChange('direccion')}
                error={!!formErrors.direccion}
                helperText={formErrors.direccion}
                fullWidth
                required
                inputProps={{ 'data-testid': 'input-direccion' }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={handleClose} color="inherit">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Notification snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProveedorForm;
