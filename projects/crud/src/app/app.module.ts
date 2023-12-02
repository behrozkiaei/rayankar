import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AddModule } from '../lib/feature/add/add.module';
import { ListModule } from '../lib/feature/list/list.module';
import { ViewModule } from '../lib/feature/view/view.module';
import { AppRoutingProdModule } from './app-routing-prod.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DomainModule } from '../lib/domain/domain.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // environment.production ? AppRoutingProdModule : AppRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule , 
    DomainModule,
    AddModule,
    ViewModule,
    ListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
