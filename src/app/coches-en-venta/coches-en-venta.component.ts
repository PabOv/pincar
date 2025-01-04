import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Coche } from '../models/coche';
import { CochesService } from '../services/coches.service';

@Component({
  selector: 'app-coches-en-venta',
  templateUrl: './coches-en-venta.component.html',
  styleUrls: ['./coches-en-venta.component.css']
})
export class CochesEnVentaComponent implements OnInit {

  coches$!: Observable<Coche[]>;

  constructor(private _cochesService: CochesService, private router: Router) {}

  ngOnInit(): void {
    this.coches$ = this._cochesService.getCoches();
  }

  navigateToDetails(cocheId: string | undefined) {
    if (cocheId) {
      this.router.navigate(['/detalles-coche', cocheId]);
    }
  }
}
