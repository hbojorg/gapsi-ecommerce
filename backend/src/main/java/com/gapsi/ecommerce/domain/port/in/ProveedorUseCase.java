package com.gapsi.ecommerce.domain.port.in;

import com.gapsi.ecommerce.domain.model.Proveedor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Puerto de entrada que define los casos de uso para la gestion de proveedores.
 * Esta interfaz es implementada por la capa de aplicacion (ProveedorService).
 */
public interface ProveedorUseCase {

    /**
     * Obtiene una lista paginada de proveedores.
     *
     * @param pageable informacion de paginacion
     * @return pagina de proveedores
     */
    Page<Proveedor> findAll(Pageable pageable);

    /**
     * Crea un nuevo proveedor.
     *
     * @param proveedor datos del proveedor a crear
     * @return proveedor creado con id asignado
     * @throws com.gapsi.ecommerce.domain.exception.ProveedorDuplicadoException si ya existe un proveedor con el mismo nombre
     */
    Proveedor create(Proveedor proveedor);

    /**
     * Elimina un proveedor por su id.
     *
     * @param id identificador del proveedor a eliminar
     * @throws com.gapsi.ecommerce.domain.exception.ProveedorNotFoundException si no existe el proveedor
     */
    void deleteById(Long id);
}
