import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { AuthGuard } from '../services/auth-guard.service';
export const MODULE_ROUTES: Route[] =[
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'subscriber', canActivate: [AuthGuard], component: SubscriberComponent },
    {
        path: 'tag',
        canActivate: [AuthGuard],
        loadChildren: 'app/dashboard/tag/tag.module#TagModule'
    },
    {
        path: 'article',
        canActivate: [AuthGuard],
        loadChildren: 'app/dashboard/article/article.module#ArticleModule'
    },
    { path: '', redirectTo: 'subscriber', pathMatch: 'full' }
]

export const MODULE_COMPONENTS = [
    LoginComponent,
    LogoutComponent,
    SubscriberComponent
]
