import { gql } from '@apollo/client';

export const GET_PROVEEDORES = gql`
  query GetProveedores($page: Int, $size: Int) {
    proveedores(page: $page, size: $size) {
      content {
        id
        nombre
        razonSocial
        direccion
      }
      totalElements
      totalPages
      number
      size
    }
  }
`;

export const GET_WELCOME = gql`
  query GetWelcome {
    welcome {
      candidatoName
      welcomeMessage
      appVersion
    }
  }
`;
