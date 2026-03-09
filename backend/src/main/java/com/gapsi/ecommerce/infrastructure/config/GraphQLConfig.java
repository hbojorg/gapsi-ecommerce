package com.gapsi.ecommerce.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;
import org.springframework.context.annotation.Bean;

/**
 * Configuracion adicional de GraphQL.
 * Permite personalizar el runtime wiring si es necesario.
 */
@Configuration
public class GraphQLConfig {

    /**
     * Configura el runtime wiring de GraphQL.
     * Se puede extender para registrar scalar types personalizados u otros configuraciones.
     *
     * @return configurador del runtime wiring
     */
    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return wiringBuilder -> {
            // Configuracion adicional si se necesita en el futuro
        };
    }
}
