package com.gapsi.ecommerce.domain.exception;

/**
 * Excepcion de dominio lanzada cuando se intenta crear un proveedor
 * con un nombre que ya existe en el sistema.
 */
public class ProveedorDuplicadoException extends RuntimeException {

    public ProveedorDuplicadoException(String nombre) {
        super("El proveedor con nombre '" + nombre + "' ya existe");
    }
}
