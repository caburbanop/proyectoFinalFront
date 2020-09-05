import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  providers: [UserService]
})
export class LineChartComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Enojo' },
    { data: [], label: 'Disgusto' },
    { data: [], label: 'Miedo' },
    { data: [], label: 'Feliz' },
    { data: [], label: 'Tristeza' },
    { data: [], label: 'Sorpresa' },
    { data: [], label: 'Neutral' },
  ];
  public lineChartLabels: Label[] = [];//'10', '20', '30', '40', '50', '60', '70'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {borderColor: 'red'},
    {borderColor: 'orange'},
    {borderColor: 'purple'},
    {borderColor: 'green'},
    {borderColor: 'blue'},
    {borderColor: 'yellow'},
    {borderColor: 'rgba(148,159,177,1)'}
  ];
  /*public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];*/
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  // Identificador del proceso
  public id;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private _user: UserService, private ruta: ActivatedRoute) { 
    debugger;
    this.id = this.ruta.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    debugger;
    var arrDatos = {};
    arrDatos['tipo'] = "facial";
    arrDatos['proceso'] = this.id;
    this._user.post('consultarInfo', arrDatos).subscribe(
      res => {  
        debugger;
        if(res['estado'] == 'Exito' && res['datos'] != ''){
          var lineas = res['datos'].split('\n');
          for (var i=0; i<lineas.length; i++) {
            if (lineas[i] != "") {
              var datos = lineas[i].split(',');
              var arreglo = [];
              arreglo[0] = datos[1] * 100;
              arreglo[1] = datos[2] * 100;
              arreglo[2] = datos[3] * 100;
              arreglo[3] = datos[4] * 100;
              arreglo[4] = datos[5] * 100;
              arreglo[5] = datos[6] * 100;
              arreglo[6] = datos[7] * 100; 
              this.pushOneData(datos[0], arreglo);
            }
          }
        }
      }
    );
  }

  public pushOneData(label, datos) {
    debugger;
    this.lineChartData.forEach((x, i) => {
      const num = datos[i];
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(label);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 100)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    debugger;
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}