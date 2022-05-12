import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {paths} from './app-paths';
import {HomeComponent} from "./home/home.component";

const appRoutes: Routes = [
    {
        path: paths.home,
        component: HomeComponent
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
