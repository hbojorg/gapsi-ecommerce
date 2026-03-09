package com.gapsi.ecommerce.domain.exception;

/**
 * Excepcion de dominio lanzada cuando no se encuentra un proveedor
 * con el identificador proporcionado.
 */
public class ProveedorNotFoundException extends RuntimeException {

    public ProveedorNotFoundException(Long id) {
        super("Proveedor no encontrado con id: " + id);
    }
}
