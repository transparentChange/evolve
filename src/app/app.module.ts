import { HttpClientModule } from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './category/item/item.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { MatCommonModule } from '@angular/material/core';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CategoryComponent,
        ItemComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCommonModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ['localhost:8080'],
                disallowedRoutes: ['http://localhost:8080/lumen/login']
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
