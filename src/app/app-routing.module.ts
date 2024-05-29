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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reset-session', component: ResetSessionComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },

  { path: 'nav-sa', component: NavComponent,
    canActivate: [AuthGuardService, SaguardService],
    children: [
      { path: 'requests-ccp', component: RequestsCcpComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'chat', component: ChatComponent },
      {path: 'states', component: StatesComponent}
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
