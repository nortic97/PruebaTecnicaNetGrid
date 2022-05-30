import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../models/UsuarioModel';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuario:Usuario[] = [] ;
  private pagination = [];

  public numberPage:any = '1';

  constructor(
    private usuarioService: UsuarioService
  ) {
   }

  ngOnInit(): void {

    this.ListarUsuarios();

  }

  ListarUsuarios(){

   this.usuarioService.getUsuarios(this.numberPage).subscribe(
     response => {

        if(response.status != 'Error'){

          this.usuario = response.data;
          this.pagination = response.from;

          console.log(this.usuario);
          console.log(this.pagination);

        }

     }
   );

  }

}
