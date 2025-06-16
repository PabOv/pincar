import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CochesEnVentaComponent } from './coches-en-venta/coches-en-venta.component';
import { CompramosTuCocheComponent } from './compramos-tu-coche/compramos-tu-coche.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DetallesCocheComponent } from './detalles-coche/detalles-coche.component';
import { ErrorComponent } from './error/error.component';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { PoliticaCookiesComponent } from './politica-cookies/politica-cookies.component';
import { AgradecimientoComponent } from './agradecimiento/agradecimiento.component';
import { ModificarCocheComponent } from './modificar-coche/modificar-coche.component';
import { CochesVendidosComponent } from './coches-vendidos/coches-vendidos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coches-en-venta', component: CochesEnVentaComponent },
  { path: 'coches-vendidos', component: CochesVendidosComponent },
  { path: 'detalles-coche/:id', component: DetallesCocheComponent },
  { path: 'compramos-tu-coche', component: CompramosTuCocheComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'ubicacion', component: UbicacionComponent },
  { path: 'aviso-legal', component: AvisoLegalComponent },
  { path: 'politica-de-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'politica-de-cookies', component: PoliticaCookiesComponent },
  { path: 'agradecimiento', component: AgradecimientoComponent },
  { path: 'modificar-coche/:id', component: ModificarCocheComponent },
  
  // Ruta de login siempre accesible
  { path: 'login', component: LoginComponent },

  // Ruta de admin protegida por AuthGuard (solo accesible si es el administrador)
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },

  // Ruta de error
  { path: 'error', component: ErrorComponent },

  // Ruta wildcard para redirigir a home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
