import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { CargarComponent } from './components/cargar/cargar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CargarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
