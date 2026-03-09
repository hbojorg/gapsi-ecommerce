package com.gapsi.ecommerce.infrastructure.adapter.in.rest;

import com.gapsi.ecommerce.domain.model.Proveedor;
import com.gapsi.ecommerce.domain.port.in.ProveedorUseCase;
import com.gapsi.ecommerce.infrastructure.adapter.in.rest.dto.ProveedorRequestDTO;
import com.gapsi.ecommerce.infrastructure.adapter.in.rest.dto.ProveedorResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Adaptador de entrada REST para la gestion de proveedores.
 * Expone los endpoints HTTP y delega la logica al caso de uso.
 */
@RestController
@RequestMapping("/api/proveedores")
@Tag(name = "Proveedores", description = "API para la gestion de proveedores")
public class ProveedorController {

    private final ProveedorUseCase proveedorUseCase;

    public ProveedorController(ProveedorUseCase proveedorUseCase) {
        this.proveedorUseCase = proveedorUseCase;
    }

    /**
     * Obtiene una lista paginada de proveedores.
     *
     * @param page numero de pagina (default: 0)
     * @param size tamano de pagina (default: 10)
     * @return pagina de proveedores
     */
    @GetMapping
    @Operation(summary = "Listar proveedores", description = "Obtiene una lista paginada de proveedores")
    public ResponseEntity<Page<ProveedorResponseDTO>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Proveedor> proveedores = proveedorUseCase.findAll(PageRequest.of(page, size));
        Page<ProveedorResponseDTO> response = proveedores.map(this::toResponseDTO);
        return ResponseEntity.ok(response);
    }

    /**
     * Crea un nuevo proveedor.
     *
     * @param requestDTO datos del proveedor a crear
     * @return proveedor creado con status 201
     */
    @PostMapping
    @Operation(summary = "Crear proveedor", description = "Crea un nuevo proveedor en el sistema")
    public ResponseEntity<ProveedorResponseDTO> create(@Valid @RequestBody ProveedorRequestDTO requestDTO) {
        Proveedor proveedor = toDomain(requestDTO);
        Proveedor created = proveedorUseCase.create(proveedor);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponseDTO(created));
    }

    /**
     * Elimina un proveedor por su id.
     *
     * @param id identificador del proveedor a eliminar
     * @return status 204 No Content
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar proveedor", description = "Elimina un proveedor por su identificador")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        proveedorUseCase.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // --- Mappers ---

    private ProveedorResponseDTO toResponseDTO(Proveedor proveedor) {
        return new ProveedorResponseDTO(
                proveedor.getId(),
                proveedor.getNombre(),
                proveedor.getRazonSocial(),
                proveedor.getDireccion()
        );
    }

    private Proveedor toDomain(ProveedorRequestDTO dto) {
        return Proveedor.builder()
                .nombre(dto.getNombre())
                .razonSocial(dto.getRazonSocial())
                .direccion(dto.getDireccion())
                .build();
    }
}
