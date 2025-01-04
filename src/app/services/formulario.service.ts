import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private userId = '7d5ySy8wxl_FY8uMJ';  // Valor sacado de EmailJS
  private serviceId = 'service_6n2jgqn';  // Valor sacado de EmailJS
  private templateId = 'template_j5coryk'; // Valor sacado de EmailJS

  enviarFormulario(formData: any) {
    return emailjs.send(this.serviceId, this.templateId, formData, this.userId);
  }
}