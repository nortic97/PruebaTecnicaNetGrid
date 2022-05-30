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

  private usuarioU: any = '';
  private nombresU: any = '';
  private apellidosU: any = '';
  private tipoDeIdentificacionU: any = '';
  private numeroDeIdentificacionU: any = '';
  private fechaDeNacimientoU: any = '';
  private contrasenaU: any = '';

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


    this.usuarioU = usuariot.innerHTML.valueOf();
    this.nombresU = nombrest.innerHTML.valueOf();
    this.apellidosU = apellidost.innerHTML.valueOf();
    this.tipoDeIdentificacionU = tipodt.innerHTML.valueOf();
    this.numeroDeIdentificacionU = numerodt.innerHTML.valueOf();
    this.fechaDeNacimientoU = nacimientot.innerHTML.valueOf();
    this.contrasenaU = contrasenat.innerHTML.valueOf();

    var userEdit = new Usuario(1, this.usuarioU, this.nombresU, this.apellidosU, this.tipoDeIdentificacionU, this.numeroDeIdentificacionU, this.fechaDeNacimientoU, this.contrasenaU);

      console.log(form.usuarioeForm);

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
