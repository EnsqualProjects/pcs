import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register';
import { VerifyAuthCodeComponent } from './verifyauthcode';
import { CreateProjectComponent } from './createproject/createproject.component';
import { CableDashbComponent } from './cable-dashb/cable-dashb.component';
//import { ScopeDocumentComponent } from './scopedocument/scopedocument.component';
//import { StakeHolderComponent } from './stakeholder/stakeholder.component';
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

const routes: Routes =[
  { path: '', redirectTo: 'login', pathMatch: 'full',}, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifyAuthCode', component: VerifyAuthCodeComponent },
  { path: '', component: AdminLayoutComponent, children: [
      {path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule' },
      
      // { path: 'setupProject', component: CreateProjectComponent},
       
      // { path: 'scopedocument', component: ScopeDocumentComponent },
      // { path: 'stakeholders', component: StakeHolderComponent },
      // { path: 'material', component: MaterialsComponent },
      // { path: 'receivematerial', component: ReceiveMaterialComponent },
      // { path: 'issuematerial', component: IssuematerialComponent },
      // { path: 'returnmaterial', component: ReturnmaterialComponent },
      // { path: 'requestmaterial', component: RequestmaterialComponent },
      // { path: 'manageproject', component: ManageProjectComponent},
      // { path: 'cablemaster', component: CablemasterComponent },
      // { path: 'cable-progress', component: CableprogressComponent },
      // { path: 'cable-glanding', component: CableglandingComponent},
      // { path: 'termination-', component: TerminationComponent},
      // { path: 'punchlist_inputform', component: PunchlistinputformComponent },
      // { path: 'punchlist', component: PunchlistComponent },
      // { path: 'punchlist-closeout', component: PunchlistcloseoutComponent   },
      // { path: 'add-manpower', component: AddmanpowerComponent },
      // { path: 'manpower', component: ManpowerComponent }
    ]
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
