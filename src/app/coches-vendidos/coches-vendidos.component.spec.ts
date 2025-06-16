import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CochesVendidosComponent } from './coches-vendidos.component';

describe('CochesVendidosComponent', () => {
  let component: CochesVendidosComponent;
  let fixture: ComponentFixture<CochesVendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CochesVendidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CochesVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
