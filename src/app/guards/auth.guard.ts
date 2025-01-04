// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    // Verificamos si el usuario está autenticado
    const user = await this.authService.getCurrentUser(); // Aquí pedimos el usuario autenticado

    // Si no está autenticado, lo redirigimos a login
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verificamos si es admin, si no es admin, redirigimos
    const isAdmin = await this.authService.isAdmin();
    if (!isAdmin) {
      this.router.navigate(['/login']); // Puede redirigir a una página de error si lo prefieres
      return false;
    }

    return true;
  }
}
