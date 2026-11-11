import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaServiceIdperuComponent } from './valida-service-idperu.component';

describe('ValidaServiceIdperuComponent', () => {
  let component: ValidaServiceIdperuComponent;
  let fixture: ComponentFixture<ValidaServiceIdperuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidaServiceIdperuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidaServiceIdperuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
