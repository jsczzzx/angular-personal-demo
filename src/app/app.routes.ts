import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FeedComponent } from './components/feed/feed.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    { 
        path: '',
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: 'feed',
        component: FeedComponent,
        canActivate: [AuthGuard]
    }
];
