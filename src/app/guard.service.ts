import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { paths } from './app-paths';
import { tokenGetter } from './app.module';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|boolean {
    const page = route.queryParams['page'];
    /*
    console.log("abc");
    console.log(page);
    if (!page) {
      console.log("a");
      console.log(tokenGetter());
      if (tokenGetter()) {
        return true;
      }
      this.router.navigate(['/' + paths.login]);
      return false;
    }
    */

    this.router.navigate(['/' + page]);

    return false;
  }

}
