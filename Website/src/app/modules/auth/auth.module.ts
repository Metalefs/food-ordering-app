import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginClienteComponent } from './page/login/login-cliente.component';
import { RegistroClienteComponent } from './page/registro/registro-cliente.component';
import { LoginRegistroClienteComponent } from './page/login-registro/login-registro-cliente.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoginClienteComponent,
    RegistroClienteComponent,
    LoginRegistroClienteComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AuthModule { }
