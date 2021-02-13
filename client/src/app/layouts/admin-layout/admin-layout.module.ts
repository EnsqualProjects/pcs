import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog'; 
// import { MatDialogConfigModule } from '@angular/material/dialogconfig'; 

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CreateProjectComponent } from '../../createproject/createproject.component';
import { ScopeDocumentComponent } from '../../scopedocument/scopedocument.component';
import { StakeHolderComponent } from '../../stakeholder/stakeholder.component';
import { ReceiveMaterialComponent } from '../../receivematerial/receivematerial.component';
import { MaterialsComponent } from '../../materials/materials.component';
import { CableComponent } from '../../cable/cable.component';
import { CableDashbComponent } from '../../cable-dashb/cable-dashb.component';

import { CablePullDialogComponent } from '../../_dialog/cablepull/cablepulldialog.component';
import { CableGlandDialogComponent } from '../../_dialog/cablegland/cableglanddialog.component';
import { CableTerminateDialogComponent } from '../../_dialog/cableterminate/cableterminatedialog.component';


import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  declarations: [
    DashboardComponent,
    CreateProjectComponent,
    ScopeDocumentComponent,
    StakeHolderComponent,
    ReceiveMaterialComponent,
    MaterialsComponent,
    CableComponent,
    CableDashbComponent,

    CablePullDialogComponent,
    CableGlandDialogComponent,
    CableTerminateDialogComponent,

    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent
  ]
})

export class AdminLayoutModule {}
