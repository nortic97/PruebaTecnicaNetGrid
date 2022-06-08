import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { Usuario } from '../models/UsuarioModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: Usuario;
  public status: string;
  public token: any;
  public identity: any;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.user = new Usuario(1, '', '', '', '', '', '', '');
    this.status = '';
  }

  ngOnInit(): void {

  }

  Login(form: NgForm) {

    this.user.usuario = form.value.usuario;
    this.user.contrasena = form.value.contrasena;

    this.loginService.Login(this.user).subscribe(

      response => {

        if (response.status != 'Error') {

          this.token = response;
          localStorage.setItem('token', this.token);

          this.loginService.Login(this.user, true).subscribe(
            response => {

              this.identity = response;
              localStorage.setItem('identity', JSON.stringify(this.identity));
              this.router.navigate(['usuario']);

            }, error => {

              this.status = error;

            }
          );

        } else {

          alert("Contraseña o Usuario inválidos");

        }

      },
      error => {
        this.status = error;
      });
  }

}
