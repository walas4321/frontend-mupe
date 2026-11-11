import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDenuncia2Component } from './registro-denuncia.component';

describe('RegistroDenuncia2Component', () => {
  let component: RegistroDenuncia2Component;
  let fixture: ComponentFixture<RegistroDenuncia2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDenuncia2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDenuncia2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
