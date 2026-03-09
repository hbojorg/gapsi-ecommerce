package com.gapsi.ecommerce.application.service;

import com.gapsi.ecommerce.domain.exception.ProveedorDuplicadoException;
import com.gapsi.ecommerce.domain.exception.ProveedorNotFoundException;
import com.gapsi.ecommerce.domain.model.Proveedor;
import com.gapsi.ecommerce.domain.port.in.ProveedorUseCase;
import com.gapsi.ecommerce.domain.port.out.ProveedorRepositoryPort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Servicio de aplicacion que implementa los casos de uso de proveedores.
 * Orquesta la logica de negocio delegando la persistencia al puerto de salida.
 */
@Service
@Transactional
public class ProveedorService implements ProveedorUseCase {

    private final ProveedorRepositoryPort proveedorRepositoryPort;

    public ProveedorService(ProveedorRepositoryPort proveedorRepositoryPort) {
        this.proveedorRepositoryPort = proveedorRepositoryPort;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Proveedor> findAll(Pageable pageable) {
        return proveedorRepositoryPort.findAll(pageable);
    }

    @Override
    public Proveedor create(Proveedor proveedor) {
        if (proveedorRepositoryPort.existsByNombre(proveedor.getNombre())) {
            throw new ProveedorDuplicadoException(proveedor.getNombre());
        }
        return proveedorRepositoryPort.save(proveedor);
    }

    @Override
    public void deleteById(Long id) {
        if (!proveedorRepositoryPort.existsById(id)) {
            throw new ProveedorNotFoundException(id);
        }
        proveedorRepositoryPort.deleteById(id);
    }
}
