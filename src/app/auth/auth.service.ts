import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { httpOptions } from '../http-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const postUrl = "http://localhost:8080/lumen" + '/login';
    return this.getAuthorization(username, password, postUrl);
  }

  register(username: string, password: string) {
    const postUrl = "http://localhost:8080/lumen" + '/register';
    return this.getAuthorization(username, password, postUrl).pipe(
      switchMap(sourceValue => {
        return this.login(username, password); // .pipe(catchError(err =>))
      })
    )
  }

  getAuthorization(username: string, password: string, postUrl: string) {
    return this.http.post<any>(postUrl, {username: username, password: password}, httpOptions)
      .pipe(
        map(result => {
          console.log(result.headers.get('Authorization'));
          localStorage.setItem('access_token', result.headers.get('Authorization')!);
          return true;
        })
      );
  }
}
