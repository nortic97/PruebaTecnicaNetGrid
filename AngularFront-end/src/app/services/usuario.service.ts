import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../components/models/UsuarioModel';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url:string = 'http://127.0.0.1:8000/api/usuario';

  constructor(public http:HttpClient,
              private loginService: LoginService){ }

    getUsuarios(numberPage:any): Observable<any>{

      var token = this.loginService.getTokenCode();

      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Autorization', token);

      return this.http.get<any>(this.url+"?page="+numberPage, {headers: headers});

    }

    deleteUsuarios(id:any){

      var token = this.loginService.getTokenCode();

      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Autorization', token);

      return this.http.delete<any>(this.url+"/"+id, {headers: headers});

    }

    postUsuarios(user: Usuario): Observable<any>{

      var token = this.loginService.getTokenCode();

      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Autorization', token);

      var params = JSON.stringify(user);

      var json = 'json='+params;

      return this.http.post<any>(this.url, json, {headers: headers});

    }

    putUsuarios(user: Usuario, id:any): Observable<any>{

      var token = this.loginService.getTokenCode();

      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Autorization', token);

      var params = JSON.stringify(user);

      var json = 'json='+params;

      return this.http.put<any>(this.url+"/"+id, json, {headers: headers});

    }



}
