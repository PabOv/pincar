import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CochesEnVentaComponent } from './coches-en-venta.component';

describe('CochesEnVentaComponent', () => {
  let component: CochesEnVentaComponent;
  let fixture: ComponentFixture<CochesEnVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CochesEnVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CochesEnVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
