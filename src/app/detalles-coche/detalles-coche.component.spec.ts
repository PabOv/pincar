import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCocheComponent } from './detalles-coche.component';

describe('DetallesCocheComponent', () => {
  let component: DetallesCocheComponent;
  let fixture: ComponentFixture<DetallesCocheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesCocheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesCocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
