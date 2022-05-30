import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url:string = 'http://127.0.0.1:8000/api/usuario?page=';

  constructor(public http:HttpClient,
              private loginService: LoginService){ }

    getUsuarios(numberPage:any): Observable<any>{

      var token = this.loginService.getTokenCode();

      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Autorization', token);

      return this.http.get<any>(this.url+numberPage, {headers: headers});

    }
}
