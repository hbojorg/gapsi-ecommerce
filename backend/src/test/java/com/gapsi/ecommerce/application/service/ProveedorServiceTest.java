package com.gapsi.ecommerce.application.service;

import com.gapsi.ecommerce.domain.exception.ProveedorDuplicadoException;
import com.gapsi.ecommerce.domain.exception.ProveedorNotFoundException;
import com.gapsi.ecommerce.domain.model.Proveedor;
import com.gapsi.ecommerce.domain.port.out.ProveedorRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Tests unitarios para ProveedorService.
 * Utiliza Mockito para simular el puerto de repositorio.
 */
@ExtendWith(MockitoExtension.class)
class ProveedorServiceTest {

    @Mock
    private ProveedorRepositoryPort proveedorRepositoryPort;

    @InjectMocks
    private ProveedorService proveedorService;

    private Proveedor proveedor;

    @BeforeEach
    void setUp() {
        proveedor = Proveedor.builder()
                .id(1L)
                .nombre("TechSupply")
                .razonSocial("TechSupply S.A. de C.V.")
                .direccion("Av. Tecnologia 100")
                .build();
    }

    @Test
    @DisplayName("Crear proveedor exitosamente")
    void createProveedor_Success() {
        Proveedor newProveedor = Proveedor.builder()
                .nombre("NuevoProveedor")
                .razonSocial("Nuevo S.A.")
                .direccion("Calle Nueva 123")
                .build();

        Proveedor savedProveedor = Proveedor.builder()
                .id(2L)
                .nombre("NuevoProveedor")
                .razonSocial("Nuevo S.A.")
                .direccion("Calle Nueva 123")
                .build();

        when(proveedorRepositoryPort.existsByNombre("NuevoProveedor")).thenReturn(false);
        when(proveedorRepositoryPort.save(any(Proveedor.class))).thenReturn(savedProveedor);

        Proveedor result = proveedorService.create(newProveedor);

        assertNotNull(result);
        assertEquals(2L, result.getId());
        assertEquals("NuevoProveedor", result.getNombre());
        verify(proveedorRepositoryPort).existsByNombre("NuevoProveedor");
        verify(proveedorRepositoryPort).save(newProveedor);
    }

    @Test
    @DisplayName("Crear proveedor duplicado lanza excepcion")
    void createProveedor_DuplicateName_ThrowsException() {
        when(proveedorRepositoryPort.existsByNombre("TechSupply")).thenReturn(true);

        assertThrows(ProveedorDuplicadoException.class, () -> {
            proveedorService.create(proveedor);
        });

        verify(proveedorRepositoryPort).existsByNombre("TechSupply");
        verify(proveedorRepositoryPort, never()).save(any());
    }

    @Test
    @DisplayName("Listar proveedores paginados")
    void findAll_ReturnsPage() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Proveedor> page = new PageImpl<>(List.of(proveedor), pageable, 1);

        when(proveedorRepositoryPort.findAll(pageable)).thenReturn(page);

        Page<Proveedor> result = proveedorService.findAll(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(1, result.getContent().size());
        assertEquals("TechSupply", result.getContent().get(0).getNombre());
        verify(proveedorRepositoryPort).findAll(pageable);
    }

    @Test
    @DisplayName("Eliminar proveedor existente")
    void deleteById_ExistingProveedor_Success() {
        when(proveedorRepositoryPort.existsById(1L)).thenReturn(true);
        doNothing().when(proveedorRepositoryPort).deleteById(1L);

        assertDoesNotThrow(() -> proveedorService.deleteById(1L));

        verify(proveedorRepositoryPort).existsById(1L);
        verify(proveedorRepositoryPort).deleteById(1L);
    }

    @Test
    @DisplayName("Eliminar proveedor inexistente lanza excepcion")
    void deleteById_NonExistingProveedor_ThrowsException() {
        when(proveedorRepositoryPort.existsById(99L)).thenReturn(false);

        assertThrows(ProveedorNotFoundException.class, () -> {
            proveedorService.deleteById(99L);
        });

        verify(proveedorRepositoryPort).existsById(99L);
        verify(proveedorRepositoryPort, never()).deleteById(any());
    }
}
