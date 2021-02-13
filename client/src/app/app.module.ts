import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import {CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import {AgmCoreModule} from '@agm/core';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app.routing';

import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { AlertComponent } from './_directives';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { VerifyAuthCodeComponent } from './verifyauthcode';
// import { CreateProjectComponent } from './createproject/createproject.component';
// import { ScopeDocumentComponent } from './scopedocument/scopedocument.component';
// import { StakeHolderComponent } from './stakeholder/stakeholder.component';
// import { MaterialsComponent } from './materials/materials.component';

// import { ReceiveMaterialComponent } from './receivematerial/receivematerial.component';
// import { IssuematerialComponent } from './issuematerial/issuematerial.component';
// import { ReturnmaterialComponent } from './returnmaterial/returnmaterial.component';
// import { RequestmaterialComponent } from './requestmaterial/requestmaterial.component';
// import { CableprogressComponent } from './cableprogress/cableprogress.component';
// import { CableglandingComponent } from './cableglanding/cableglanding.component';
// import { TerminationComponent } from './termination/termination.component';
// import { ManageProjectComponent } from './manageproject/manageproject.component';
// import { CablemasterComponent } from './cablemaster/cablemaster.component';
// import { PunchlistinputformComponent } from './punchlistinputform/punchlistinputform.component';
// import { PunchlistComponent } from './punchlist/punchlist.component';
// import { PunchlistcloseoutComponent } from './punchlistcloseout/punchlistcloseout.component';
// import { AddmanpowerComponent } from './addmanpower/addmanpower.component';
// import { ManpowerComponent } from './manpower/manpower.component';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { ProjectService } from './_services/project.service';
import { StakeHolderService } from './_services/stakeholder.service';
import { ScopeDocumentService } from './_services/scopedocument.service';
import { FileService } from './_services/file.service';
import { MaterialService } from './_services/material.service';
import { CableService } from './_services/cable.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    VerifyAuthCodeComponent,
    
   // CreateProjectComponent,
   // ScopeDocumentComponent,
   // StakeHolderComponent,
    // MaterialsComponent

    // ReceiveMaterialComponent,
    // IssuematerialComponent,
    // ReturnmaterialComponent,
    // RequestmaterialComponent,
    // CableprogressComponent,
    // CableglandingComponent,
    // TerminationComponent,
    // ManageProjectComponent,
    // CablemasterComponent,
    // PunchlistinputformComponent,
    // PunchlistComponent,
    // PunchlistcloseoutComponent,
    // AddmanpowerComponent,
    // ManpowerComponent,

  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
  ProjectService,
  StakeHolderService,
  ScopeDocumentService,
  FileService,
  MaterialService,
  CableService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
