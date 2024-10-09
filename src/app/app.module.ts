import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MaterialPropertiesModule } from './material-properties'; // Import MaterialPropertiesModule
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, withFetch, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CitiesComponent } from './components/cities/cities.component';
import { ExternalUsersComponent, CustomerStateDialog } from './components/external-users/external-users.component';
import { InternalUsersComponent, UserStatusDialog } from './components/internal-users/internal-users.component';
import { CustomersComponent, CompanyStateDialog } from './components/customers/customers.component';
import { OperationTypesComponent } from './components/operation-types/operation-types.component';
import { RequestsComponent, RemoveRequestCustomerDialog, UpdateBoxCustomDialog, UpdateReferenceCustomer, UpdateOperationCustomer } from './components/requests/requests.component';
import { RequestReportsComponent } from './components/request-reports/request-reports.component';
import { StatesComponent } from './components/states/states.component';
import { StatusesComponent } from './components/statuses/statuses.component';
import { CityComponent } from './dialogs/city/city.component';
import { CommentsComponent } from './dialogs/comments/comments.component';
import { CustomerComponent } from './dialogs/customer/customer.component';
import { ExternalUserComponent } from './dialogs/external-user/external-user.component';
import { OperationTypeComponent } from './dialogs/operation-type/operation-type.component';
import { InternalUserComponent } from './dialogs/internal-user/internal-user.component';
import { StateComponent } from './dialogs/state/state.component';
import { RequestComponent } from './dialogs/request/request.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { ResetSessionComponent } from './reset-session/reset-session.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RequestsCcpComponent, ReturnStatusDialog, RemoveRequestAdminDialog, UpdateBoxDialog, UpdateReferenceAdm, UpdateOperationAdm, UpdateTmwAdm, UuidDialog } from './components/requests-ccp/requests-ccp.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { DocumentsComponent, ConsignmentNoteDialog, AcceptRejectLayout, DocumentOptions } from './dialogs/documents/documents.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChatComponent } from './components/chat/chat.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({ declarations: [
        AppComponent,
        CitiesComponent,
        ExternalUsersComponent,
        CustomerStateDialog,
        InternalUsersComponent,
        UserStatusDialog,
        CustomersComponent,
        OperationTypesComponent,
        RequestsComponent,
        UpdateReferenceCustomer,
        RemoveRequestCustomerDialog,
        RequestReportsComponent,
        UpdateBoxCustomDialog,
        StatesComponent,
        StatusesComponent,
        CityComponent,
        CommentsComponent,
        CustomerComponent,
        ExternalUserComponent,
        OperationTypeComponent,
        InternalUserComponent,
        StateComponent,
        RequestComponent,
        UpdateOperationCustomer,
        NavComponent,
        LoginComponent,
        ResetSessionComponent,
        RecoverPasswordComponent,
        RequestsCcpComponent,
        ReturnStatusDialog,
        DocumentsComponent,
        RemoveRequestAdminDialog,
        ChartComponent,
        UpdateBoxDialog,
        UpdateReferenceAdm,
        UpdateOperationAdm,
        UpdateTmwAdm,
        UuidDialog,
        ConsignmentNoteDialog,
        ChatComponent,
        DocumentOptions,
        AcceptRejectLayout,
        CompanyStateDialog,
        LineChartComponent,
    ],
    bootstrap: [AppComponent], imports: [FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        MaterialPropertiesModule,
        NgxMatSelectSearchModule], providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(withFetch()), // Enable fetch API
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
