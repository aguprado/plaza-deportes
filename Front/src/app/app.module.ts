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
import { NewGroupComponent } from './new-group/new-group.component';
import { AuthGuard } from './guards/authGuard';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { DesinscripcionComponent } from './desinscripcion/desinscripcion.component';
import { InscriptionReportComponent } from './inscription-report/inscription-report.component';

const appRoutes: Routes = [
  { path: 'groups-list', component: GroupsListComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'group-detail/:id', component: GroupDetailComponent, canActivate: [AuthGuard] },
  { path: 'group-edit/:id', component: GroupEditComponent, canActivate: [AuthGuard] },
  { path: 'group-enroll/:id', component: InscripcionComponent },
  { path: 'group-unroll', component: DesinscripcionComponent },
  { path: 'confirmed/:documento/:idGroup', component: InscriptionReportComponent },
  { path: 'new-group', component: NewGroupComponent, canActivate: [AuthGuard] },
  { path: '', component: GroupsListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    GroupsListComponent,
    GroupDetailComponent,
    LoginComponent,
    NewGroupComponent,
    GroupEditComponent,
    InscripcionComponent,
    DesinscripcionComponent,
    InscriptionReportComponent
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
  providers: [ApiService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
