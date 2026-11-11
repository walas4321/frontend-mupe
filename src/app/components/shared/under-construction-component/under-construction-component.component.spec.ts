import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderConstructionComponentComponent } from './under-construction-component.component';

describe('UnderConstructionComponentComponent', () => {
  let component: UnderConstructionComponentComponent;
  let fixture: ComponentFixture<UnderConstructionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderConstructionComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderConstructionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
