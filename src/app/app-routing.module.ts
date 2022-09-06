import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {paths} from './app-paths';
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
        redirectTo: '/' + paths.home
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
