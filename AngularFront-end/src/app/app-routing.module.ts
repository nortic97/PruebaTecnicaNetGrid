import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginGuard } from './guardians/login.guard';
import { UsuarioGuard } from './guardians/usuario.guard';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'usuario', component: UsuarioComponent, canActivate:[UsuarioGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
