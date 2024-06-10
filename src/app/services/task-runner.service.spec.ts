import { TestBed } from '@angular/core/testing';

import { TaskRunnerService } from './task-runner.service';

describe('TaskRunnerService', () => {
  let service: TaskRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
