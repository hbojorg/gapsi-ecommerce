import React from 'react';
import { TableCell, IconButton, Tooltip, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { Proveedor } from '../../types/proveedor';

interface ProveedorItemProps {
  proveedor: Proveedor;
  onDelete: (proveedor: Proveedor) => void;
  index: number;
}

const statusColors = ['#66bb6a', '#ef5350', '#ffa726', '#42a5f5', '#ab47bc'];

const ProveedorItem = React.memo<ProveedorItemProps>(
  ({ proveedor, onDelete, index }) => {
    const statusColor = statusColors[index % statusColors.length];

    return (
      <>
        <TableCell sx={{ width: 40, pl: 2 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: statusColor,
            }}
          />
        </TableCell>
        <TableCell sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500, width: 60 }}>
          {proveedor.id}
        </TableCell>
        <TableCell sx={{ fontWeight: 500 }}>{proveedor.nombre}</TableCell>
        <TableCell>{proveedor.razonSocial}</TableCell>
        <TableCell>{proveedor.direccion}</TableCell>
        <TableCell align="center" sx={{ width: 72 }}>
          <Tooltip title="Eliminar proveedor" arrow>
            <IconButton
              size="small"
              onClick={() => onDelete(proveedor)}
              aria-label={`Eliminar ${proveedor.nombre}`}
              sx={{
                color: 'text.disabled',
                '&:hover': {
                  color: 'error.main',
                  backgroundColor: 'error.main',
                  bgcolor: (theme) => `${theme.palette.error.main}12`,
                },
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </>
    );
  }
);

ProveedorItem.displayName = 'ProveedorItem';

export default ProveedorItem;
