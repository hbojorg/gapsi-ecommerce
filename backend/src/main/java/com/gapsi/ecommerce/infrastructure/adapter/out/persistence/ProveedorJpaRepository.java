package com.gapsi.ecommerce.infrastructure.adapter.out.persistence;

import com.gapsi.ecommerce.infrastructure.adapter.out.persistence.entity.ProveedorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio Spring Data JPA para la entidad ProveedorEntity.
 * Proporciona operaciones CRUD y queries derivadas.
 */
@Repository
public interface ProveedorJpaRepository extends JpaRepository<ProveedorEntity, Long> {

    /**
     * Busca un proveedor por su nombre.
     *
     * @param nombre nombre del proveedor
     * @return proveedor encontrado o vacio
     */
    Optional<ProveedorEntity> findByNombre(String nombre);

    /**
     * Verifica si existe un proveedor con el nombre dado.
     *
     * @param nombre nombre a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsByNombre(String nombre);
}
