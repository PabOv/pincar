import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coche } from '../models/coche'; // Asegúrate de que esta importación sea correcta
import { CochesService } from '../services/coches.service'; // Asegúrate de que esta importación sea correcta
import * as bootstrap from 'bootstrap'; // Asegúrate de que Bootstrap esté importado

@Component({
  selector: 'app-detalles-coche',
  templateUrl: './detalles-coche.component.html',
  styleUrls: ['./detalles-coche.component.css']
})
export class DetallesCocheComponent implements OnInit {
  coche: Coche = {} as Coche;
  telefonoVisible: boolean = false;
  telefono: string = '671 477 718 / 659 479 272';
  activeIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cochesService: CochesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID del parámetro de la ruta
    if (id) {
      this.cochesService.getCocheById(id).subscribe(
        coche => {
          if (coche) {
            this.coche = coche;
          }
        },
        error => {
          console.error('Error al cargar el coche:', error); // Manejo de errores
        }
      );
    } else {
      console.error('ID del coche no encontrado en la ruta'); // Manejo de error si ID es nulo
    }
  }

  mostrarTelefono(): void {
    this.telefonoVisible = !this.telefonoVisible; // Alterna la visibilidad del número de teléfono
  }

  // Método para manejar el cambio de diapositiva al hacer clic en una imagen pequeña
  setActiveSlide(index: number): void {
    this.activeIndex = index; // Establece el índice activo
    const carouselElement = document.getElementById('carouselExample');
    if (carouselElement) {
      const carouselInstance = new bootstrap.Carousel(carouselElement);
      carouselInstance.to(index); // Mueve el carrusel a la diapositiva especificada
    }
  }
}
