// error.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div class="error-container">
      <h2>Acceso denegado</h2>
      <p>No tienes permiso para acceder a esta página.</p>
    </div>
  `,
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {}