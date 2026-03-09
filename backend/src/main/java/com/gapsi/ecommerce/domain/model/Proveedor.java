package com.gapsi.ecommerce.domain.model;

/**
 * Entidad de dominio que representa un Proveedor.
 *
 * PATRON DE DISENO: Builder Pattern
 * Facilita la construccion de objetos Proveedor de forma legible y flexible,
 * permitiendo crear instancias con diferentes combinaciones de atributos.
 */
public class Proveedor {

    private Long id;
    private String nombre;
    private String razonSocial;
    private String direccion;

    public Proveedor() {
    }

    private Proveedor(Builder builder) {
        this.id = builder.id;
        this.nombre = builder.nombre;
        this.razonSocial = builder.razonSocial;
        this.direccion = builder.direccion;
    }

    public static Builder builder() {
        return new Builder();
    }

    // Getters y Setters

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

    /**
     * PATRON DE DISENO: Builder Pattern
     * Permite construir instancias de Proveedor paso a paso,
     * mejorando la legibilidad y flexibilidad en la creacion de objetos.
     */
    public static class Builder {
        private Long id;
        private String nombre;
        private String razonSocial;
        private String direccion;

        private Builder() {
        }

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder nombre(String nombre) {
            this.nombre = nombre;
            return this;
        }

        public Builder razonSocial(String razonSocial) {
            this.razonSocial = razonSocial;
            return this;
        }

        public Builder direccion(String direccion) {
            this.direccion = direccion;
            return this;
        }

        public Proveedor build() {
            return new Proveedor(this);
        }
    }
}
