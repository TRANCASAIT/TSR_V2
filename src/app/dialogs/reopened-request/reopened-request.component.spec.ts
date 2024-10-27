import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenedRequestComponent } from './reopened-request.component';

describe('ReopenedRequestComponent', () => {
  let component: ReopenedRequestComponent;
  let fixture: ComponentFixture<ReopenedRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReopenedRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReopenedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
