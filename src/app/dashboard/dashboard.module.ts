import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { CommonModule } from '@angular/common';
import { Select2Module } from 'ng2-select2/ng2-select2';
import { AuthGuard } from '../services/auth-guard.service';
@NgModule({
    imports: [
        RouterModule.forChild(MODULE_ROUTES),
        FormsModule,
        BrowserModule,
        HttpModule,
        CommonModule,
        ReactiveFormsModule,
        Select2Module
    ],
    declarations: [
        MODULE_COMPONENTS
    ],
    providers: [AuthGuard]
})

export class DashboardModule{}
