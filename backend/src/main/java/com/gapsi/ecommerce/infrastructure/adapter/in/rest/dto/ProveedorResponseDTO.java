package com.gapsi.ecommerce.infrastructure.adapter.in.rest.dto;

/**
 * PATRON DE DISENO: DTO Pattern / Adapter Pattern
 * Desacopla la representacion de datos de la API de las entidades de dominio.
 * Permite evolucionar la API y el dominio de forma independiente.
 *
 * DTO de salida que representa un proveedor en las respuestas de la API.
 */
public class ProveedorResponseDTO {

    private Long id;
    private String nombre;
    private String razonSocial;
    private String direccion;

    public ProveedorResponseDTO() {
    }

    public ProveedorResponseDTO(Long id, String nombre, String razonSocial, String direccion) {
        this.id = id;
        this.nombre = nombre;
        this.razonSocial = razonSocial;
        this.direccion = direccion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
