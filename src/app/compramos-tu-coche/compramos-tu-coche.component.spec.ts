import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompramosTuCocheComponent } from './compramos-tu-coche.component';

describe('CompramosTuCocheComponent', () => {
  let component: CompramosTuCocheComponent;
  let fixture: ComponentFixture<CompramosTuCocheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompramosTuCocheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompramosTuCocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
