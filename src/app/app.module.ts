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
import { BackgroundComponent } from './background/background.component';
import { ViewComponent } from './view/view.component';
import { Guard } from './guard.service';
import { BookmarksStoreService } from './items/bookmarksstore.service';
import { BackgroundService } from './background/background.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ViewService } from './view/view.service';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CategoryComponent,
        ItemComponent,
        LoginComponent,
        BackgroundComponent,
        ViewComponent
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
        }),
        DragDropModule
    ],
    providers: [Guard, BookmarksStoreService, BackgroundService, ViewService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
