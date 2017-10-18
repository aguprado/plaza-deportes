import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './services/apiService';
import { HttpModule } from '@angular/http';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { AuthService } from './services/authService';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'groups-list', component: GroupsListComponent},
  { path: 'group-detail/:id', component: GroupDetailComponent},
  { path: 'admin', component: LoginComponent },
  { path: '', component: GroupsListComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    GroupsListComponent,
    GroupDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpModule
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
