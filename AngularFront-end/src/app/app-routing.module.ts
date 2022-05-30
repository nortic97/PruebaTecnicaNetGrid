import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginGuard } from './guardians/login.guard';
import { UsuarioGuard } from './guardians/usuario.guard';

const routes: Routes = [
  {path: '', component: LoginComponent,  },
  {path: 'login', component: UsuarioComponent,   },
  {path: 'usuario', component: UsuarioComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
