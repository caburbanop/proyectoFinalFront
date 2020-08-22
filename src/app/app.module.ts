import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CargarComponent } from './components/cargar/cargar.component';
import { HomeComponent } from './components/home/home.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CargarComponent,
    HomeComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ChartsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
