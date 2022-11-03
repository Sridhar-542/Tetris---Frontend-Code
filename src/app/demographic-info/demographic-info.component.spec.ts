import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicInfoComponent } from './demographic-info.component';

describe('DemographicInfoComponent', () => {
  let component: DemographicInfoComponent;
  let fixture: ComponentFixture<DemographicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemographicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
