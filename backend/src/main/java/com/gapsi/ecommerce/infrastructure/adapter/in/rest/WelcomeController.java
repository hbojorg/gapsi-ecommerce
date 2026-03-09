package com.gapsi.ecommerce.infrastructure.adapter.in.rest;

import com.gapsi.ecommerce.infrastructure.adapter.in.rest.dto.WelcomeResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Adaptador de entrada REST para la informacion de bienvenida.
 * Expone la informacion del candidato y la version de la aplicacion.
 */
@RestController
@RequestMapping("/api/welcome")
@Tag(name = "Welcome", description = "API de informacion de bienvenida")
public class WelcomeController {

    @Value("${app.candidato.name}")
    private String candidatoName;

    @Value("${app.version}")
    private String appVersion;

    /**
     * Obtiene la informacion de bienvenida.
     *
     * @return datos del candidato, mensaje de bienvenida y version de la app
     */
    @GetMapping
    @Operation(summary = "Informacion de bienvenida", description = "Obtiene el nombre del candidato, mensaje de bienvenida y version de la aplicacion")
    public ResponseEntity<WelcomeResponseDTO> getWelcome() {
        WelcomeResponseDTO response = new WelcomeResponseDTO(
                candidatoName,
                "Bienvenido " + candidatoName,
                appVersion
        );
        return ResponseEntity.ok(response);
    }
}
