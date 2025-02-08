import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCocheComponent } from './modificar-coche.component';

describe('ModificarCocheComponent', () => {
  let component: ModificarCocheComponent;
  let fixture: ComponentFixture<ModificarCocheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarCocheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
