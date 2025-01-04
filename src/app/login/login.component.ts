// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    const success = await this.authService.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Credenciales incorrectas o no tienes acceso';
    }
  }
}
