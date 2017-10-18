import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './effects';

import { AppComponent } from './app.component';
import { MinesGridComponent } from './mines-grid/mines-grid.component';
import { ApiService } from './services/apiService';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    MinesGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(Effects),
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
