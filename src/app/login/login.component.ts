import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLoginDTO = new UsuarioLoginDTO()

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLoginDTO) => {
        this.usuarioLogin = resp

        environment.foto = this.usuarioLogin.foto
        environment.nome = this.usuarioLogin.nome
        environment.id = this.usuarioLogin.id
        environment.token = this.usuarioLogin.token
        environment.tipo = this.usuarioLogin.tipo
        this.router.navigate(['/home'])
      },
      error: erro => {
        if(erro.status == 401){
          alert("Usuario ou senha inválidos")
        }
      }
    })
  }
}
