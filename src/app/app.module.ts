import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductionComponent } from './production/production.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NumberBarWidgetComponent } from './number-bar-widget/number-bar-widget.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductionComponent,
    NavbarComponent,
    NumberBarWidgetComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
