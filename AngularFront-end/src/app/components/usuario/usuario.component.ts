import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../models/UsuarioModel';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild('usuarioeForm')
  usuarioeForm!: ElementRef;
  @ViewChild('nombreseForm')
  nombreseForm!: ElementRef;
  @ViewChild('apellidoseForm')
  apellidoseForm!: ElementRef;
  @ViewChild('tipoDeDocumentoeForm')
  tipoDeDocumentoeForm!: ElementRef;
  @ViewChild('numeroDeDocumentoeForm')
  numeroDeDocumentoeForm!: ElementRef;
  @ViewChild('fechaDeNacimientoeForm')
  fechaDeNacimientoeForm!: ElementRef;
  @ViewChild('contrasenaeForm')
  contrasenaeForm!: ElementRef;

  public usuario: Usuario[] = [];
  public CantidadPaginas:number = 0;
  public current_page:number = 1;
  public last_page:number = 0;
  public total_elements:number = 0;
  public identidad:any;

  private identificador = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.ListarUsuarios();
    this.obtenerIdentidad();

  }

  ListarUsuarios() {

    this.usuarioService.getUsuarios(this.current_page).subscribe(
      response => {

        if (response.status != 'Error') {

          this.usuario = response.data;
          this.CantidadPaginas = response.from;
          this.current_page = response.current_page;
          this.last_page = response.last_page;
          this.total_elements = response.total;

        }

      }, error => {

          let message = [];

          message = error.error.message;

          alert("status: "+error.error.status+"\n\ncode: "+error.error.code+"\n\nmessage: "+ JSON.stringify(message).replace(/[,{}]/g , '\n\n'));

          localStorage.clear();

      }
    );

  }

  guardarDato(form: NgForm) {

    var respuesta = confirm("¿Seguro de guardar el formulario?");

    if (respuesta == true) {

      const usuario = form.value.usuarioForm;
      const nombres = form.value.nombresForm;
      const apellidos = form.value.apellidosForm;
      const tipoDeDocumento = form.value.tipoDeDocumentoForm;
      const numeroDeDocumento = form.value.numeroDeDocumentoForm;
      const fechaDeNacimiento = form.value.fechaDeNacimientoForm;
      const contrasena = form.value.contrasenaForm;

      var user = new Usuario(1, usuario, nombres, apellidos, tipoDeDocumento, numeroDeDocumento, fechaDeNacimiento, contrasena);

      this.usuarioService.postUsuarios(user).subscribe(
        response => {

          alert("Dato Guardado con éxito");
          this.current_page = this.last_page;
          this.ListarUsuarios();
          form.reset();

        }, error => {

          let message = [];

          message = error.error.message;

          alert("status: "+error.error.status+"\n\ncode: "+error.error.code+"\n\nmessage: "+ JSON.stringify(message).replace(/[,{}]/g , '\n\n'));

        });

    }

  }

  editarDato(form: NgForm) {

    var respuesta = confirm("¿Seguro de editar el formulario?");

    if (respuesta == true) {

      const usuarioU = this.usuarioeForm.nativeElement.value;
      const nombresU = this.nombreseForm.nativeElement.value;
      const apellidosU = this.apellidoseForm.nativeElement.value;
      const tipoDeIdentificacionU = this.tipoDeDocumentoeForm.nativeElement.value;
      const numeroDeIdentificacionU = this.numeroDeDocumentoeForm.nativeElement.value;
      const fechaDeNacimientoU = this.fechaDeNacimientoeForm.nativeElement.value;
      const contrasenaU = this.contrasenaeForm.nativeElement.value;

      var userEdit = new Usuario(1, usuarioU, nombresU, apellidosU, tipoDeIdentificacionU, numeroDeIdentificacionU, fechaDeNacimientoU, contrasenaU);

      this.usuarioService.putUsuarios(userEdit, this.identificador).subscribe(
        response => {

          console.log("ERROR");

        },
        error => {

          alert("Dato Guardado con éxito");
          this.ListarUsuarios();
          form.reset();

        }
      );

    }

  }

  eliminar(id: any) {

    let respuesta = confirm("¿Desea eliminar el registro?");

    if (respuesta == true) {

      this.usuarioService.deleteUsuarios(id).subscribe(
        response => {

          alert("Usuario eliminado \n"+JSON.stringify(response.search).replace(/[,{}]/g , '\n\n'));
          this.ListarUsuarios();

        }
      );

    }

  }

  CerrarSesion() {

    let r = confirm("¿ Desea cerrar su sesión?")

    if(r){

      localStorage.clear();
      this.router.navigate(['login']);

    }
  }

  mostrar(
    idt: HTMLTableCellElement,
    usuariot: HTMLTableCellElement,
    nombrest: HTMLTableCellElement,
    apellidost: HTMLTableCellElement,
    tipodt: HTMLTableCellElement,
    numerodt: HTMLTableCellElement,
    nacimientot: HTMLTableCellElement,
    contrasenat: HTMLTableCellElement
  ) {

    this.identificador = idt.innerHTML.valueOf();
    this.usuarioeForm.nativeElement.value = usuariot.innerHTML.valueOf();
    this.nombreseForm.nativeElement.value = nombrest.innerHTML.valueOf();
    this.apellidoseForm.nativeElement.value = apellidost.innerHTML.valueOf();
    this.tipoDeDocumentoeForm.nativeElement.value = tipodt.innerHTML.valueOf();
    this.numeroDeDocumentoeForm.nativeElement.value = numerodt.innerHTML.valueOf();
    this.fechaDeNacimientoeForm.nativeElement.value = nacimientot.innerHTML.valueOf();
    this.contrasenaeForm.nativeElement.value = contrasenat.innerHTML.valueOf();

  }

  nextPage() {


    if (this.current_page < this.last_page) {

      this.current_page = this.current_page + 1;
      this.ListarUsuarios();

    }

  }

  bakPage() {

    if (this.current_page > 1) {

      this.current_page = this.current_page - 1;

      this.ListarUsuarios();

    }
  }

  obtenerIdentidad(){

    this.identidad = this.usuarioService.getIdentity();

  }
}
