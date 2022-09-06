import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

  login(username: string, password: string) {
    const postUrl = environment.lumenUrl + '/login';
    return this.http.post<any>(postUrl, {username: username, password: password}, this.httpOptions)
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.headers.get('Authorization')!);
          return true;
        })
      )
  }
}
