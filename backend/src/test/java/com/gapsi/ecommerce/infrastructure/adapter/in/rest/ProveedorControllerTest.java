package com.gapsi.ecommerce.infrastructure.adapter.in.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gapsi.ecommerce.domain.exception.ProveedorDuplicadoException;
import com.gapsi.ecommerce.domain.exception.ProveedorNotFoundException;
import com.gapsi.ecommerce.domain.model.Proveedor;
import com.gapsi.ecommerce.domain.port.in.ProveedorUseCase;
import com.gapsi.ecommerce.infrastructure.adapter.in.rest.dto.ProveedorRequestDTO;
import com.gapsi.ecommerce.infrastructure.exception.GlobalExceptionHandler;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Tests unitarios para ProveedorController.
 * Utiliza @WebMvcTest para testear la capa REST de forma aislada.
 */
@WebMvcTest(ProveedorController.class)
@Import(GlobalExceptionHandler.class)
class ProveedorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProveedorUseCase proveedorUseCase;

    @Test
    @DisplayName("GET /api/proveedores - Listar proveedores paginados")
    void findAll_ReturnsPageOfProveedores() throws Exception {
        Proveedor proveedor = Proveedor.builder()
                .id(1L)
                .nombre("TechSupply")
                .razonSocial("TechSupply S.A. de C.V.")
                .direccion("Av. Tecnologia 100")
                .build();

        Page<Proveedor> page = new PageImpl<>(
                List.of(proveedor),
                PageRequest.of(0, 10),
                1
        );

        when(proveedorUseCase.findAll(any())).thenReturn(page);

        mockMvc.perform(get("/api/proveedores")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].nombre").value("TechSupply"))
                .andExpect(jsonPath("$.content[0].razonSocial").value("TechSupply S.A. de C.V."))
                .andExpect(jsonPath("$.content[0].direccion").value("Av. Tecnologia 100"))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.totalPages").value(1))
                .andExpect(jsonPath("$.number").value(0))
                .andExpect(jsonPath("$.size").value(10));
    }

    @Test
    @DisplayName("POST /api/proveedores - Crear proveedor exitosamente (201)")
    void create_ValidRequest_ReturnsCreated() throws Exception {
        ProveedorRequestDTO request = new ProveedorRequestDTO(
                "NuevoProveedor", "Nuevo S.A.", "Calle Nueva 123"
        );

        Proveedor created = Proveedor.builder()
                .id(1L)
                .nombre("NuevoProveedor")
                .razonSocial("Nuevo S.A.")
                .direccion("Calle Nueva 123")
                .build();

        when(proveedorUseCase.create(any(Proveedor.class))).thenReturn(created);

        mockMvc.perform(post("/api/proveedores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("NuevoProveedor"))
                .andExpect(jsonPath("$.razonSocial").value("Nuevo S.A."))
                .andExpect(jsonPath("$.direccion").value("Calle Nueva 123"));
    }

    @Test
    @DisplayName("POST /api/proveedores - Proveedor duplicado (409)")
    void create_DuplicateName_ReturnsConflict() throws Exception {
        ProveedorRequestDTO request = new ProveedorRequestDTO(
                "TechSupply", "TechSupply S.A.", "Calle 123"
        );

        when(proveedorUseCase.create(any(Proveedor.class)))
                .thenThrow(new ProveedorDuplicadoException("TechSupply"));

        mockMvc.perform(post("/api/proveedores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error").value("El proveedor con nombre 'TechSupply' ya existe"));
    }

    @Test
    @DisplayName("POST /api/proveedores - Validacion falla (400)")
    void create_InvalidRequest_ReturnsBadRequest() throws Exception {
        ProveedorRequestDTO request = new ProveedorRequestDTO("", "", "");

        mockMvc.perform(post("/api/proveedores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Error de validacion"));
    }

    @Test
    @DisplayName("DELETE /api/proveedores/{id} - Eliminar exitosamente (204)")
    void deleteById_ExistingProveedor_ReturnsNoContent() throws Exception {
        doNothing().when(proveedorUseCase).deleteById(1L);

        mockMvc.perform(delete("/api/proveedores/1"))
                .andExpect(status().isNoContent());

        verify(proveedorUseCase).deleteById(1L);
    }

    @Test
    @DisplayName("DELETE /api/proveedores/{id} - No encontrado (404)")
    void deleteById_NonExistingProveedor_ReturnsNotFound() throws Exception {
        doThrow(new ProveedorNotFoundException(99L)).when(proveedorUseCase).deleteById(99L);

        mockMvc.perform(delete("/api/proveedores/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Proveedor no encontrado con id: 99"));
    }
}
