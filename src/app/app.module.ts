import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
    imports: [
        DashboardModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([])
    ],
    declarations: [
        DashboardComponent,
        AppComponent,
        NavbarComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}