import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenedRequestsComponent } from './reopened-requests.component';

describe('ReopenedRequestsComponent', () => {
  let component: ReopenedRequestsComponent;
  let fixture: ComponentFixture<ReopenedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReopenedRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReopenedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
