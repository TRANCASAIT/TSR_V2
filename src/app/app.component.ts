import { ApplicationRef, Component, NgZone, inject, ɵglobal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TSR_V2';
  private ngZone = inject(NgZone);
  constructor() {
    const ngZone = ɵglobal.Zone;
    const TaskTrackingZone = ngZone.current._parent?._properties?.TaskTrackingZone;

    if(!TaskTrackingZone) {
      return;
    }

    inject(ApplicationRef).isStable.subscribe(stable => {
      this.printNgZone(TaskTrackingZone, 0);
      console.log('Is stable:', stable);
    });

    this.printNgZone(TaskTrackingZone, 2000);
  }


  private printNgZone(zone: any, delay: number): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Print to the console all pending tasks
        // (micro tasks, macro tasks and event listeners):
        console.debug('👀 Pending tasks in NgZone: 👀');
        console.debug({
          microTasks: zone.getTasksFor('microTask'),
          macroTasks: zone.getTasksFor('macroTask'),
          eventTasks: zone.getTasksFor('eventTask')
        });

        // Advice how to find the origin of Zone tasks:
        console.debug();
      }, delay);
    });
  }
}
