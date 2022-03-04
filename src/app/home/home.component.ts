import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { PostService } from '../service/post.service';
import { PostagemModel } from '../model/PostagemModel';
import { ThemeService } from '../service/theme.service';
import { TemaModel } from '../model/TemaModel';
import { UsuarioModel } from '../model/UsuarioModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: PostagemModel = new PostagemModel()
  listaPosts: PostagemModel[]

  listaThemes: TemaModel[]
  theme: TemaModel = new TemaModel()
  idTheme: number

  usuario: UsuarioModel = new UsuarioModel()
  idUsuario = environment.id

  constructor(
    private auth: AuthService,
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService,) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/login'])
      alert('Você previsa estar logado pra ver o feed.')
    }
    this.auth.refreshToken()
    this.listThemes()
    this.listPosts()

  }

  listThemes(){
    this.themeService.getAllThemes().subscribe((resp: TemaModel[]) => {
      this.listaThemes = resp
    })
  }

  listPosts(){
    this.postService.getAllPosts().subscribe((resp: PostagemModel[]) => {
      this.listaPosts = resp
    })
  }

  findThemeById(){
    this.themeService.getByIdTema(this.idTheme).subscribe((resp: TemaModel) =>{
      this.theme = resp
    })
  }

  findByIdUser(){
    this.auth.getByIdUsuario(this.idUsuario).subscribe((resp: UsuarioModel) =>{
      this.usuario = resp
    })
  }

  publicar(){
    this.theme.id = this.idTheme
    this.post.tema = this.theme

    this.usuario.id = this.idUsuario
    this.post.usuario = this.usuario

    this.postService.postPost(this.post).subscribe((resp: PostagemModel) => {
      this.post = resp
      alert('Postagem cadastrada!')
      this.post = new PostagemModel()
      this.listPosts()
      this.listThemes()
    })
  }


}
