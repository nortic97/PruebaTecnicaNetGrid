import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../models/UsuarioModel';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuario: Usuario[] = [];
  private pagination = [];

  public numberPage: any = '1';

  constructor(
    private usuarioService: UsuarioService,
    private router:Router
  ) {
  }

  ngOnInit(): void {

    this.ListarUsuarios();

  }

  ListarUsuarios() {

    this.usuarioService.getUsuarios(this.numberPage).subscribe(
      response => {

        if (response.status != 'Error') {

          this.usuario = response.data;
          this.pagination = response.from;

        }

      },error => {

        alert("Error: "+error.status+"\n"+"Bad request");
        localStorage.clear();

      }
    );

  }

  eliminar(id: any) {

    let respuesta = confirm("¿Desea eliminar el registro?");

    if (respuesta == true) {

      this.usuarioService.deleteUsuarios(id).subscribe(
        response => {

          alert(JSON.stringify(response.search));

        }
      );

    }

    this.ListarUsuarios();

  }

  CerrarSesion(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
