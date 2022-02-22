import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../model/UsuarioModel';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel
  confirmarSenha: string
  tipoUser: string

  constructor(private auth: AuthService , private router: Router) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.usuario.tipo = this.tipoUser

    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas.')

    } else {
      this.auth.cadastro(this.usuario).subscribe((resp: UsuarioModel) => {
          this.usuario = resp
          this.router.navigate(['/login'])
          alert('Usuário cadstrado com sucesso!')
      })
    }
  }
}
