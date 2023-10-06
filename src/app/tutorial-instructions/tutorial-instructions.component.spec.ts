import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialInstructionsComponent } from './tutorial-instructions.component';

describe('TutorialInstructionsComponent', () => {
  let component: TutorialInstructionsComponent;
  let fixture: ComponentFixture<TutorialInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
