// auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly adminUid = 'GJ280plEe0WBkBXd1F0zhcgd8013';

  constructor(private auth: Auth, private router: Router) {}

  // Método para hacer login
  async login(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user?.uid === this.adminUid) {
        return true;
      } else {
        await signOut(this.auth); // Cerrar sesión si no es admin
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  }

  // Método para hacer logout
  async logout() {
    await signOut(this.auth);
  }

  // Verificar si el usuario es admin
  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser(); // Obtenemos el usuario actual de forma asíncrona
    return user?.uid === this.adminUid;  // Verifica si el UID del usuario coincide con el del admin
  }

  // Obtener el usuario actual
  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = this.auth.currentUser;
      if (user) {
        resolve(user);
      } else {
        reject('No user logged in');
      }
    });
  }
}
