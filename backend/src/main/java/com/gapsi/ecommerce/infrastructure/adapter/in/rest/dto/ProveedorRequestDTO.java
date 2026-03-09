package com.gapsi.ecommerce.infrastructure.adapter.in.rest.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * PATRON DE DISENO: DTO Pattern / Adapter Pattern
 * Desacopla la representacion de datos de la API de las entidades de dominio.
 * Permite evolucionar la API y el dominio de forma independiente.
 *
 * DTO de entrada para la creacion de un proveedor.
 * Contiene las validaciones de Bean Validation.
 */
public class ProveedorRequestDTO {

    @NotBlank(message = "El nombre es requerido")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String nombre;

    @NotBlank(message = "La razon social es requerida")
    @Size(min = 2, max = 200, message = "La razon social debe tener entre 2 y 200 caracteres")
    private String razonSocial;

    @NotBlank(message = "La direccion es requerida")
    @Size(min = 2, max = 300, message = "La direccion debe tener entre 2 y 300 caracteres")
    private String direccion;

    public ProveedorRequestDTO() {
    }

    public ProveedorRequestDTO(String nombre, String razonSocial, String direccion) {
        this.nombre = nombre;
        this.razonSocial = razonSocial;
        this.direccion = direccion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
