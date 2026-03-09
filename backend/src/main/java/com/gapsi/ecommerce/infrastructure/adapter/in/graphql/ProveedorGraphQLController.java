package com.gapsi.ecommerce.infrastructure.adapter.in.graphql;

import com.gapsi.ecommerce.domain.model.Proveedor;
import com.gapsi.ecommerce.domain.port.in.ProveedorUseCase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Map;

/**
 * Adaptador de entrada GraphQL para la gestion de proveedores.
 * Expone queries y mutations de GraphQL delegando la logica al caso de uso.
 */
@Controller
public class ProveedorGraphQLController {

    private final ProveedorUseCase proveedorUseCase;

    @Value("${app.candidato.name}")
    private String candidatoName;

    @Value("${app.version}")
    private String appVersion;

    public ProveedorGraphQLController(ProveedorUseCase proveedorUseCase) {
        this.proveedorUseCase = proveedorUseCase;
    }

    /**
     * Query para obtener proveedores paginados.
     *
     * @param page numero de pagina (default: 0)
     * @param size tamano de pagina (default: 10)
     * @return pagina de proveedores
     */
    @QueryMapping
    public Map<String, Object> proveedores(@Argument Integer page, @Argument Integer size) {
        int pageNum = (page != null) ? page : 0;
        int pageSize = (size != null) ? size : 10;

        Page<Proveedor> result = proveedorUseCase.findAll(PageRequest.of(pageNum, pageSize));

        return Map.of(
                "content", result.getContent(),
                "totalElements", result.getTotalElements(),
                "totalPages", result.getTotalPages(),
                "number", result.getNumber(),
                "size", result.getSize()
        );
    }

    /**
     * Query para obtener la informacion de bienvenida.
     *
     * @return informacion del candidato y version
     */
    @QueryMapping
    public Map<String, String> welcome() {
        return Map.of(
                "candidatoName", candidatoName,
                "welcomeMessage", "Bienvenido " + candidatoName,
                "appVersion", appVersion
        );
    }

    /**
     * Mutation para crear un nuevo proveedor.
     *
     * @param input datos del proveedor a crear
     * @return proveedor creado
     */
    @MutationMapping
    public Proveedor crearProveedor(@Argument Map<String, String> input) {
        Proveedor proveedor = Proveedor.builder()
                .nombre(input.get("nombre"))
                .razonSocial(input.get("razonSocial"))
                .direccion(input.get("direccion"))
                .build();
        return proveedorUseCase.create(proveedor);
    }

    /**
     * Mutation para eliminar un proveedor.
     *
     * @param id identificador del proveedor a eliminar
     * @return true si se elimino exitosamente
     */
    @MutationMapping
    public Boolean eliminarProveedor(@Argument Long id) {
        proveedorUseCase.deleteById(id);
        return true;
    }
}
