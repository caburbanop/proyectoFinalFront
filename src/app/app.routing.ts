import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargarComponent } from './components/cargar/cargar.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {path: '', component: CargarComponent},
    {path: 'cargar', component: CargarComponent},
    {path: 'grafica', component: LineChartComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);