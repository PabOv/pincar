import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CochesService } from '../services/coches.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Coche } from '../models/coche';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cocheForm: FormGroup;
  imagenes: File[] = [];
  imagePreviewUrls: string[] = [];
  coches: Coche[] = []; // Propiedad para almacenar los coches

  constructor(
    private fb: FormBuilder,
    private cochesService: CochesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cocheForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      kms: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      potencia: [''], // Campo opcional
      combustible: ['', Validators.required], // Campo obligatorio
      detalles: [''], // Campo opcional
      tamanoMotor: [''], // Campo opcional
      cajaCambios: [''], // Campo opcional
      carroceria: [''], // Campo opcional
      intColor: [''], // Campo opcional
      extColor: [''], // Campo opcional
      propietarios: [0], // Campo opcional
      vendido: [false], // Checkbox para vendido
      reservado: [false] // Checkbox para reservado
    });
  }

  ngOnInit() {
    // Obtener la lista de coches al iniciar el componente
    this.cochesService.getCoches().subscribe(coches => {
      this.coches = coches;
    });
  }

  onFileSelected(event: any) {
    this.imagenes = Array.from(event.target.files);
    this.imagePreviewUrls = [];
    this.imagenes.forEach(image => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrls.push(e.target.result);
      };
      reader.readAsDataURL(image);
    });
  }

  async onSubmit() {
    if (this.cocheForm.valid && this.imagenes.length > 0) {
      try {
        const imageUrls = await this.cochesService.uploadImages(this.imagenes);
        
        const coche = {
          ...this.cocheForm.value,
          imagenes: imageUrls
        };

        await this.cochesService.addCoche(coche);

        this.cocheForm.reset();
        this.imagenes = [];
        this.imagePreviewUrls = [];
        
        alert('Coche añadido con éxito');
      } catch (error) {
        console.error('Error al añadir el coche:', error);
        alert('Hubo un error al añadir el coche. Por favor, inténtalo de nuevo.');
      }
    }
  }

  async toggleVendido(coche: Coche) {
    try {
      coche.vendido = !coche.vendido; // Cambia el estado de "vendido"
      await this.cochesService.updateCoche(coche); // Actualiza el coche en la base de datos
    } catch (error) {
      console.error('Error al actualizar el coche:', error);
    }
  }
  
  async toggleReservado(coche: Coche) {
    try {
      console.log('Estado anterior de reservado:', coche.reservado); // Mensaje de depuración
      coche.reservado = !coche.reservado; // Cambia el estado de "reservado"
      console.log('Estado nuevo de reservado:', coche.reservado); // Mensaje de depuración
      await this.cochesService.updateCoche(coche); // Actualiza el coche en la base de datos
    } catch (error) {
      console.error('Error al actualizar el coche:', error);
    }
  }

  async deleteCoche(cocheId: string) {
    try {
      await this.cochesService.deleteCoche(cocheId); // Borra el coche de la base de datos
      this.coches = this.coches.filter(coche => coche.id !== cocheId); // Elimina el coche de la lista
      alert('Coche eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el coche:', error);
      alert('Hubo un error al eliminar el coche. Por favor, inténtalo de nuevo.');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
