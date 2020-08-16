import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargarComponent } from './components/cargar/cargar.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {path: '', component: CargarComponent},
    {path: 'cargar', component: CargarComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);