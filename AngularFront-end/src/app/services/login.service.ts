import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../components/models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public token:any;

  constructor(
    public http:HttpClient
  ) {
    this.token = '';
  }


  Login(usuario:Usuario, token:any = null): Observable<any>{

    let json = JSON.stringify(usuario);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post<any>('http://127.0.0.1:8000/api/login', params, {headers: headers});

  }

  getToken(){

    return this.token = localStorage.getItem('token') != null;

  }

  getTokenCode(){

    let token = localStorage.getItem('token');

    if(token != ''){

      this.token = token;

    }else{

      this.token = null;

    }

    return this.token;

  }

}
