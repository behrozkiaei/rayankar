import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddModule } from '../lib/feature/add/add.module';
import { ListModule } from '../lib/feature/list/list.module';
import { ViewModule } from '../lib/feature/view/view.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule , 
    AddModule,
    ViewModule,
    ListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
