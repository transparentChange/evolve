import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {paths} from './app-paths';
import { BackgroundComponent } from './background/background.component';
import { Guard } from './guard.service';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {
        path: paths.home,
        component: HomeComponent
    },
    {
        path: paths.login,
        component: LoginComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/' + paths.login,
    },
    { 
        path: paths.background, 
        component: BackgroundComponent 
    },
    {
        path: '**',
        canActivate: [Guard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
