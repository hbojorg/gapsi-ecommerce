package com.gapsi.ecommerce.infrastructure.adapter.out.persistence;

import com.gapsi.ecommerce.domain.model.Proveedor;
import com.gapsi.ecommerce.domain.port.out.ProveedorRepositoryPort;
import com.gapsi.ecommerce.infrastructure.adapter.out.persistence.entity.ProveedorEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * PATRON DE DISENO: Repository Pattern
 * Abstrae el acceso a datos a traves de una interfaz de dominio.
 * La implementacion concreta reside en la capa de infraestructura.
 *
 * Este adaptador de salida implementa el puerto de repositorio del dominio,
 * delegando las operaciones de persistencia al repositorio JPA de Spring Data.
 * Realiza la conversion entre entidades de dominio (Proveedor) y entidades
 * de persistencia (ProveedorEntity).
 */
@Component
public class ProveedorPersistenceAdapter implements ProveedorRepositoryPort {

    private final ProveedorJpaRepository jpaRepository;

    public ProveedorPersistenceAdapter(ProveedorJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Page<Proveedor> findAll(Pageable pageable) {
        return jpaRepository.findAll(pageable).map(this::toDomain);
    }

    @Override
    public Optional<Proveedor> findByNombre(String nombre) {
        return jpaRepository.findByNombre(nombre).map(this::toDomain);
    }

    @Override
    public boolean existsByNombre(String nombre) {
        return jpaRepository.existsByNombre(nombre);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }

    @Override
    public Proveedor save(Proveedor proveedor) {
        ProveedorEntity entity = toEntity(proveedor);
        ProveedorEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    // --- Mappers ---

    private Proveedor toDomain(ProveedorEntity entity) {
        return Proveedor.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .razonSocial(entity.getRazonSocial())
                .direccion(entity.getDireccion())
                .build();
    }

    private ProveedorEntity toEntity(Proveedor proveedor) {
        ProveedorEntity entity = new ProveedorEntity();
        entity.setId(proveedor.getId());
        entity.setNombre(proveedor.getNombre());
        entity.setRazonSocial(proveedor.getRazonSocial());
        entity.setDireccion(proveedor.getDireccion());
        return entity;
    }
}
