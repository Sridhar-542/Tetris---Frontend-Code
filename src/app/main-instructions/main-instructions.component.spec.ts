import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInstructionsComponent } from './main-instructions.component';

describe('MainInstructionsComponent', () => {
  let component: MainInstructionsComponent;
  let fixture: ComponentFixture<MainInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
