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
  private pagination = [];

  private identificador = '';

  public numberPage: any = '1';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
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

      }, error => {

        alert("Error: " + error.status + "\n" + "Bad request");
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
          this.ListarUsuarios();
          form.reset();

        },error=>{
          alert(error.status+'\n');
          console.log(error);
        });

    }

  }

  editarDato(form: NgForm){

    const usuarioU = form.value.usuarioeForm;
    const nombresU = form.value.nombreseForm;
    const apellidosU = form.value.apellidoseForm;
    const tipoDeIdentificacionU = form.value.tipoDeDocumentoeForm;
    const numeroDeIdentificacionU = form.value.numeroDeDocumentoeForm;
    const fechaDeNacimientoU = form.value.fechaDeNacimientoeForm;
    const contrasenaU = form.value.contrasenaeForm;

    var userEdit = new Usuario(1, usuarioU, nombresU, apellidosU, tipoDeIdentificacionU, numeroDeIdentificacionU, fechaDeNacimientoU, contrasenaU);

      console.log(userEdit);

      var respuesta = confirm("¿Seguro de editar el formulario?");

      if(respuesta == true){

        this.usuarioService.putUsuarios(userEdit, this.identificador).subscribe(
          response => {

            alert("Dato Guardado con éxito");
            this.ListarUsuarios();
            form.reset();

          },
          error => {

            alert(error.status+'\n');
            console.log(error);

          }
        );

      }

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

  CerrarSesion() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  mostrar(
    idt : HTMLTableCellElement,
    usuariot: HTMLTableCellElement,
    nombrest: HTMLTableCellElement,
    apellidost: HTMLTableCellElement,
    tipodt: HTMLTableCellElement,
    numerodt: HTMLTableCellElement,
    nacimientot: HTMLTableCellElement,
    contrasenat: HTMLTableCellElement
    ){

      this.identificador = idt.innerHTML.valueOf();
      this.usuarioeForm.nativeElement.value = usuariot.innerHTML.valueOf();
      this.nombreseForm.nativeElement.value = nombrest.innerHTML.valueOf();
      this.apellidoseForm.nativeElement.value = apellidost.innerHTML.valueOf();
      this.tipoDeDocumentoeForm.nativeElement.value = tipodt.innerHTML.valueOf();
      this.numeroDeDocumentoeForm.nativeElement.value = numerodt.innerHTML.valueOf();
      this.fechaDeNacimientoeForm.nativeElement.value = nacimientot.innerHTML.valueOf();
      this.contrasenaeForm.nativeElement.value = contrasenat.innerHTML.valueOf();

  }

}
