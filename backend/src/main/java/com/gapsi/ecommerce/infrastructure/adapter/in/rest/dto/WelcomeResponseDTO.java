package com.gapsi.ecommerce.infrastructure.adapter.in.rest.dto;

/**
 * DTO de salida para el endpoint de bienvenida.
 * Contiene la informacion del candidato y la version de la aplicacion.
 */
public class WelcomeResponseDTO {

    private String candidatoName;
    private String welcomeMessage;
    private String appVersion;

    public WelcomeResponseDTO() {
    }

    public WelcomeResponseDTO(String candidatoName, String welcomeMessage, String appVersion) {
        this.candidatoName = candidatoName;
        this.welcomeMessage = welcomeMessage;
        this.appVersion = appVersion;
    }

    public String getCandidatoName() {
        return candidatoName;
    }

    public void setCandidatoName(String candidatoName) {
        this.candidatoName = candidatoName;
    }

    public String getWelcomeMessage() {
        return welcomeMessage;
    }

    public void setWelcomeMessage(String welcomeMessage) {
        this.welcomeMessage = welcomeMessage;
    }

    public String getAppVersion() {
        return appVersion;
    }

    public void setAppVersion(String appVersion) {
        this.appVersion = appVersion;
    }
}
