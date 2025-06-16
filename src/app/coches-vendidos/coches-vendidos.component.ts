import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Coche } from '../models/coche';
import { CochesService } from '../services/coches.service';

@Component({
  selector: 'app-coches-vendidos',
  templateUrl: './coches-vendidos.component.html',
  styleUrl: './coches-vendidos.component.css'
})
export class CochesVendidosComponent {

  coches$!: Observable<Coche[]>;

  constructor(private _cochesService: CochesService, private router: Router) {}

  ngOnInit(): void {
    this.coches$ = this._cochesService.getCochesVendidos();
  }

  navigateToDetails(cocheId: string | undefined) {
    if (cocheId) {
      this.router.navigate(['/detalles-coche', cocheId]);
    }
  }

}
