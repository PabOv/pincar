import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  // Solo aquí debe estar
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { CochesEnVentaComponent } from './coches-en-venta/coches-en-venta.component';
import { CompramosTuCocheComponent } from './compramos-tu-coche/compramos-tu-coche.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { DetallesCocheComponent } from './detalles-coche/detalles-coche.component';
import { ErrorComponent } from './error/error.component';
import { CustomNumberPipe } from './custom-number.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Importación de Firebase y AngularFire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';  // Para autenticación
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { PoliticaCookiesComponent } from './politica-cookies/politica-cookies.component';
import { AgradecimientoComponent } from './agradecimiento/agradecimiento.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    CochesEnVentaComponent,
    CompramosTuCocheComponent,
    SobreNosotrosComponent,
    ContactoComponent,
    UbicacionComponent,
    AdminComponent,
    LoginComponent,
    DetallesCocheComponent,
    ErrorComponent,
    CustomNumberPipe,
    AvisoLegalComponent,
    PoliticaPrivacidadComponent,
    PoliticaCookiesComponent,
    AgradecimientoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({
      "projectId": "pincar-7bf8f",
      "appId": "1:640578875477:web:eb1c7e89a306bb1bd324dc",
      "storageBucket": "pincar-7bf8f.appspot.com",
      "apiKey": "AIzaSyCYmPueXOHierTi9DJY6urWItQaRepcEm0",
      "authDomain": "pincar-7bf8f.firebaseapp.com",
      "messagingSenderId": "640578875477"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
