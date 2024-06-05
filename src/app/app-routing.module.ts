import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetSessionComponent } from './reset-session/reset-session.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { NavComponent } from './nav/nav.component';
import { SaguardService } from './services/saguard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RequestsComponent } from './components/requests/requests.component';
import { RequestsCcpComponent } from './components/requests-ccp/requests-ccp.component';
import { ChatComponent } from './components/chat/chat.component';
import { StatesComponent } from './components/states/states.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OperationTypesComponent } from './components/operation-types/operation-types.component';
import { ExternalUsersComponent } from './components/external-users/external-users.component';
import { InternalUsersComponent } from './components/internal-users/internal-users.component';
import { StatusesComponent } from './components/statuses/statuses.component';
import { RequestReportsComponent } from './components/request-reports/request-reports.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { CustomerguardService } from './services/customerguard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reset-session', component: ResetSessionComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },

  { path: 'nav-sa', component: NavComponent,
    canActivate: [AuthGuardService, SaguardService],
    children: [
      { path: 'requests-ccp', component: RequestsCcpComponent },
      { path: 'requests-reports', component: RequestReportsComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'chat', component: ChatComponent },
      {path: 'states', component: StatesComponent},
      {path: 'cities', component: CitiesComponent},
      { path: 'customers', component: CustomersComponent },
      { path: 'customer-users', component: ExternalUsersComponent },
      { path: 'users', component: InternalUsersComponent },
      { path: 'operation-types', component: OperationTypesComponent },
      { path: 'status', component: StatusesComponent },
      { path: 'linea', component: LineChartComponent },
    ]
  },
  {path: 'nav-custom', component: NavComponent,
    canActivate: [AuthGuardService, CustomerguardService],
    children: [
      { path: 'requests', component: RequestsComponent },
      { path: 'services-reports', component: RequestReportsComponent },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
