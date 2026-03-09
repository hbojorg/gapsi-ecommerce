import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Skeleton,
  Snackbar,
  Alert,
  Typography,
  Fade,
} from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import type { TableComponents } from 'react-virtuoso';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchProveedores,
  deleteProveedor,
  clearDeleteSuccess,
  clearError,
} from '../../store/slices/proveedorSlice';
import ProveedorItem from './ProveedorItem';
import type { Proveedor } from '../../types/proveedor';

const VirtuosoTableComponents: TableComponents<Proveedor> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} variant="outlined" {...props} ref={ref} sx={{ maxHeight: 350, overflowY: 'auto' }} />
  )),
  Table: (props) => (
    <Table {...props} size="small" sx={{ borderCollapse: 'separate' }} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow: ({ ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const ProveedorList = () => {
  const dispatch = useAppDispatch();
  const {
    proveedores,
    totalPages,
    currentPage,
    pageSize,
    loading,
    error,
    deleteSuccess,
  } = useAppSelector((state) => state.proveedores);

  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    proveedor: Proveedor | null;
  }>({ open: false, proveedor: null });

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchProveedores({ page: currentPage, size: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    if (deleteSuccess) {
      setSnackbar({
        open: true,
        message: 'Proveedor eliminado exitosamente',
        severity: 'success',
      });
      dispatch(clearDeleteSuccess());
      dispatch(fetchProveedores({ page: currentPage, size: pageSize }));
    }
  }, [deleteSuccess, dispatch, currentPage, pageSize]);

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

  const handleDeleteClick = useCallback((proveedor: Proveedor) => {
    setConfirmDialog({ open: true, proveedor });
  }, []);

  const handleConfirmDelete = () => {
    if (confirmDialog.proveedor) {
      dispatch(deleteProveedor(confirmDialog.proveedor.id));
    }
    setConfirmDialog({ open: false, proveedor: null });
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    dispatch(fetchProveedores({ page: page - 1, size: pageSize }));
  };

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  if (loading && proveedores.length === 0) {
    return (
      <Box>
        {[...Array(5)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={44}
            sx={{ mb: 0.5 }}
          />
        ))}
      </Box>
    );
  }

  if (proveedores.length === 0 && !loading) {
    return (
      <Fade in>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.disabled" sx={{ fontWeight: 400 }}>
            No hay proveedores registrados
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5 }}>
            Haga clic en &quot;Agregar&quot; para registrar un nuevo proveedor
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in>
      <Box>
        <TableVirtuoso
          style={{ height: Math.min(proveedores.length * 52 + 52, 350) }}
          data={proveedores}
          components={VirtuosoTableComponents}
          fixedHeaderContent={() => (
            <TableRow>
              <TableCell sx={{ width: 40 }} />
              <TableCell sx={{ width: 60 }}>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Razón Social</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell sx={{ width: 72 }} align="center">
                Acciones
              </TableCell>
            </TableRow>
          )}
          itemContent={(index, proveedor) => (
            <ProveedorItem
              proveedor={proveedor}
              onDelete={handleDeleteClick}
              index={index}
            />
          )}
        />

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage + 1}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              shape="rounded"
              variant="outlined"
              size="small"
            />
          </Box>
        )}

        {/* Confirm Delete Dialog */}
        <Dialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, proveedor: null })}
          maxWidth="xs"
        >
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro de que desea eliminar al proveedor{' '}
              <strong>{confirmDialog.proveedor?.nombre}</strong>? Esta acción no se
              puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setConfirmDialog({ open: false, proveedor: null })}
              color="inherit"
            >
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={closeSnackbar}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
};

export default ProveedorList;
