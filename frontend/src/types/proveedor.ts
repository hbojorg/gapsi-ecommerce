export interface Proveedor {
  id: number;
  nombre: string;
  razonSocial: string;
  direccion: string;
}

export interface ProveedorPage {
  content: Proveedor[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface ProveedorFormData {
  nombre: string;
  razonSocial: string;
  direccion: string;
}
