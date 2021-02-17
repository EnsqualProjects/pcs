import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CreateProjectComponent } from '../../createproject/createproject.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ScopeDocumentComponent } from '../../scopedocument/scopedocument.component';
import { StakeHolderComponent } from '../../stakeholder/stakeholder.component';
import { MaterialsComponent } from '../../materials/materials.component';
import { CableComponent } from '../../cable/cable.component';
import { ReceiveMaterialComponent } from '../../receivematerial/receivematerial.component';
import { CableDashbComponent } from '../../cable-dashb/cable-dashb.component';

import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'setupProject',      component: CreateProjectComponent },
    { path: 'scopedocument', component: ScopeDocumentComponent },
    { path: 'stakeholders', component: StakeHolderComponent },
    { path: 'receivematerial', component: ReceiveMaterialComponent },
    { path: 'materialmanagement', component: MaterialsComponent },
    { path: 'cablemanagement', component: CableComponent, 
    children: [ 
        { path: 'cable-dashb', component: CableDashbComponent },]
      

    },
    //{ path: 'cable-dashb', component: CableDashbComponent },

    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent }
];
