import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackStepComponent } from './back-step.component';

describe('BackStepComponent', () => {
  let component: BackStepComponent;
  let fixture: ComponentFixture<BackStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
