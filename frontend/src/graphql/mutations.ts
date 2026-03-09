import { gql } from '@apollo/client';

export const CREATE_PROVEEDOR = gql`
  mutation CrearProveedor($input: ProveedorInput!) {
    crearProveedor(input: $input) {
      id
      nombre
      razonSocial
      direccion
    }
  }
`;

export const DELETE_PROVEEDOR = gql`
  mutation EliminarProveedor($id: ID!) {
    eliminarProveedor(id: $id)
  }
`;
