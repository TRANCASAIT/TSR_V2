import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  myData: [] = []!;
  constructor(
    private API: ApiService
  ){
    Chart.register(...registerables);
  }
  public chart!: Chart;

  ngOnInit(): void {

    this.getData();
  }

  getData(){
    this.API.getServiceCount().subscribe({
      next: (res: any) => {
        this.myData = res;
        const customerNames: string[] = [];
        const serviceCounts: number[] = [];
        console.log(this.myData)

        // const customerServicesMap = res.reduce((acc: any, customerService:any) => {
        //   labels = acc[customerService.customerName];
        //   serviceCount = customerService.serviceCount;
        //   acc[customerService.customerName] = customerService.serviceCount;
        //   return acc;
        // }, {} as { [key: string]: number });
        /*
          const { customerNames, serviceCounts } = customerServices.reduce((acc, customerService) => {
          acc.customerNames.push(customerService.customerName);
          acc.serviceCounts.push(customerService.serviceCount);
          return acc;
        }, { customerNames: [] as string[], serviceCounts: [] as number[] });
        */
        res.forEach((customerService:any) => {
          customerNames.push(customerService.customerName);
          serviceCounts.push(customerService.serviceCount);
        });
        console.log(customerNames, serviceCounts)

        // const data = {
        //   labels: ['January','February','March','April','May','June','July'],
        //   datasets: [
        //     {
        //       label: customerNames,
        //       data: serviceCounts,
        //       fill: false,
        //       borderColor: 'rgb(75, 192, 192)',
        //       backgroundColor: 'blue',
        //       tension: 0.1,
        //     }],
        // };

        // this.chart = new Chart("chart",{
        //   type: 'bar',
        //   data
        // });

        const ctx = document.getElementById('myChart') as HTMLCanvasElement;

        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: customerNames,
            datasets: [{
              label: 'Numero de CCP',
              data: serviceCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: false
              }
            }
          }
        });

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
