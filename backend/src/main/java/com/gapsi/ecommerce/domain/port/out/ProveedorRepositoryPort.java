package com.gapsi.ecommerce.domain.port.out;

import com.gapsi.ecommerce.domain.model.Proveedor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * PATRON DE DISENO: Repository Pattern
 * Abstrae el acceso a datos a traves de una interfaz de dominio.
 * La implementacion concreta reside en la capa de infraestructura.
 *
 * Este puerto de salida define el contrato para la persistencia de proveedores.
 * Permite cambiar la implementacion de persistencia (H2, MySQL, MongoDB)
 * sin modificar la logica de negocio.
 */
public interface ProveedorRepositoryPort {

    /**
     * Obtiene una pagina de proveedores.
     *
     * @param pageable informacion de paginacion
     * @return pagina de proveedores
     */
    Page<Proveedor> findAll(Pageable pageable);

    /**
     * Busca un proveedor por su nombre.
     *
     * @param nombre nombre del proveedor
     * @return proveedor encontrado o vacio
     */
    Optional<Proveedor> findByNombre(String nombre);

    /**
     * Verifica si existe un proveedor con el nombre dado.
     *
     * @param nombre nombre a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsByNombre(String nombre);

    /**
     * Verifica si existe un proveedor con el id dado.
     *
     * @param id identificador a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsById(Long id);

    /**
     * Guarda un proveedor.
     *
     * @param proveedor proveedor a guardar
     * @return proveedor guardado con id asignado
     */
    Proveedor save(Proveedor proveedor);

    /**
     * Elimina un proveedor por su id.
     *
     * @param id identificador del proveedor a eliminar
     */
    void deleteById(Long id);
}
