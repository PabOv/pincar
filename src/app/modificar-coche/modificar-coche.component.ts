import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CochesService } from '../services/coches.service';
import { Coche } from '../models/coche';

@Component({
  selector: 'app-modificar-coche',
  templateUrl: './modificar-coche.component.html',
  styleUrls: ['./modificar-coche.component.css']
})
export class ModificarCocheComponent implements OnInit {
  cocheForm: FormGroup;
  cocheId!: string;
  coche!: Coche;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cochesService: CochesService
  ) {
    this.cocheForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      kms: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      potencia: [''],
      combustible: ['', Validators.required],
      detalles: [''],
      tamanoMotor: [''],
      cajaCambios: [''],
      carroceria: [''],
      intColor: [''],
      extColor: [''],
      propietarios: [0]
    });
  }

  ngOnInit() {
    this.cocheId = this.route.snapshot.paramMap.get('id')!;
    
    if (!this.cocheId) {
      console.error('No se encontró el ID del coche en la URL.');
      return;
    }
  
    this.cochesService.getCocheById(this.cocheId).subscribe(coche => {
      if (!coche) {
        console.error('El coche no existe.');
        return;
      }
      this.coche = coche;
      this.cocheForm.patchValue(coche);
    });
  }  

  async onSubmit() {
    if (this.cocheForm.valid) {
      try {
        // Recogemos todos los valores del formulario (tanto modificados como no)
        const fieldsToUpdate: Partial<Coche> = this.cocheForm.value;
  
        // Llamamos al servicio para actualizar el coche con todos los campos
        await this.cochesService.updateCocheFields(this.cocheId, fieldsToUpdate);
  
        // Mostrar mensaje de éxito
        alert('Coche actualizado con éxito');
        
        // Redirigir a la página del administrador
        this.router.navigate(['/admin']);
      } catch (error) {
        console.error('Error al actualizar el coche:', error);
        alert('Hubo un error al actualizar el coche.');
      }
    }
  }
  
}
