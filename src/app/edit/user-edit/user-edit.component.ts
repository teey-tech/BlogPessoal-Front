import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/model/UsuarioModel';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel()
  idUsuario: number

  confirmarSenha: string
  tipoUser: string
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/login'])
      alert('Você previsa estar logado pra ver o feed.')
    }
    this.authService.refreshToken()
    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUser(this.idUsuario)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUser = event.target.value
  }

  findByIdUser(id: number){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: UsuarioModel) =>{
      this.usuario = resp
    })
  }

 atualizar(){
    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas.')

    } else {
      this.authService.putUsuario(this.usuario).subscribe((resp: UsuarioModel) => {
          this.usuario = resp
          this.router.navigate(['/login'])
          alert('Usuário atualizado com sucesso, faça o login novamente')
          environment.token = ''
          environment.foto = ''
          environment.nome = ''
          environment.id = 0
      })
    }
  }
}
