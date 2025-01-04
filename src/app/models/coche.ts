export class Coche {
  id?: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  kms: number;
  imagenes: string[];
  detalles: string;
  potencia: string;
  combustible: string;
  vendido: boolean;
  reservado: boolean;             // Nuevo campo "Reservado" opcional

  // Nuevos campos opcionales
  tamanoMotor: string;           // Tamaño motor
  cajaCambios: string;           // Caja de cambios
  carroceria: string;            // Carrocería
  intColor: string;              // Color interior
  extColor: string;              // Color exterior
  propietarios: number;          // Propietarios

  constructor(
    marca: string,
    modelo: string,
    anio: number,
    precio: number,
    kms: number,
    imagenes: string[],
    detalles: string,
    potencia?: string,
    combustible?: string,
    vendido?: boolean,
    reservado?: boolean,            // Nuevo parámetro opcional para "Reservado"
    tamanoMotor?: string,           // Tamaño motor
    cajaCambios?: string,           // Caja de cambios
    carroceria?: string,            // Carrocería
    intColor?: string,              // Color interior
    extColor?: string,              // Color exterior
    propietarios?: number           // Propietarios
  ) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.precio = precio;
    this.kms = kms;
    this.imagenes = imagenes;
    this.detalles = detalles;

    // Asignación de atributos opcionales
    this.potencia = potencia || 'n/s';
    this.combustible = combustible || 'n/s';
    this.vendido = vendido ?? false;
    this.reservado = reservado ?? false;

    // Nuevas propiedades opcionales
    this.tamanoMotor = tamanoMotor || '';
    this.cajaCambios = cajaCambios || '';
    this.carroceria = carroceria || '';
    this.intColor = intColor || '';
    this.extColor = extColor || '';
    this.propietarios = propietarios ?? 0;
  }
}
