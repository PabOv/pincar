import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { CochesService } from '../services/coches.service'; // Importa el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-compramos-tu-coche',
  templateUrl: './compramos-tu-coche.component.html',
  styleUrls: ['./compramos-tu-coche.component.css']
})
export class CompramosTuCocheComponent implements OnInit {
  compraForm!: FormGroup;
  imagenes: File[] = []; // Para almacenar las imágenes seleccionadas

  constructor(private fb: FormBuilder,
              private formularioService: FormularioService,
              private cochesService: CochesService,
              private router: Router) { }

  ngOnInit() {
    this.compraForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: [''],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      km: ['', Validators.required],
      motor: ['', Validators.required],
      potencia: ['', Validators.required],
      anio: ['', Validators.required],
      mensaje: [''],
      fotos: [null, Validators.required] // Cambiar a null ya que las URLs se guardarán aquí
    }, { validators: this.emailMatchValidator });
  }

  emailMatchValidator(form: FormGroup) {
    const email = form.get('email')?.value;
    const confirmEmail = form.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { mismatch: true };
  }

  onFileChange(event: any) {
    this.imagenes = Array.from(event.target.files); // Almacena las imágenes seleccionadas

    // Actualiza el formulario con las imágenes seleccionadas
    if (this.imagenes.length > 0) {
      this.compraForm.patchValue({ fotos: this.imagenes });
    } else {
      this.compraForm.patchValue({ fotos: null }); // Manejo en caso de no seleccionar fotos
    }
  }

  async onSubmit() {
    if (this.compraForm.valid) {
      const formData = this.compraForm.value;

      try {
        // Sube las imágenes y obtiene las URLs
        const imageUrls = await this.cochesService.uploadImagesForm(this.imagenes);

        // Prepara los datos para enviar a EmailJS
        const emailParams = {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          telefono: formData.telefono,
          email: formData.email,
          confirmEmail: formData.confirmEmail,
          marca: formData.marca,
          modelo: formData.modelo,
          km: formData.km,
          motor: formData.motor,
          potencia: formData.potencia,
          anio: formData.anio,
          mensaje: formData.mensaje,
          fotos: imageUrls.map((url, index) => `<a href="${url}" target="_blank">Ver Imagen ${index + 1}</a>`).join('<br />') // Usa las URLs de las imágenes subidas
        };

        // Usar el servicio para enviar el formulario
        await this.formularioService.enviarFormulario(emailParams);
        this.router.navigate(['/agradecimiento']);
        // Mostrar mensaje de éxito al usuario
      } catch (error) {
        console.error('Error al enviar el formulario', error);
        // Mostrar mensaje de error al usuario
      }
    }
  }
}
