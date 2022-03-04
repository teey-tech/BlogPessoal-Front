import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemModel } from 'src/app/model/PostagemModel';
import { TemaModel } from 'src/app/model/TemaModel';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from 'src/app/service/post.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  post: PostagemModel = new PostagemModel()

  theme: TemaModel = new TemaModel()
  listaTheme: TemaModel[]
  idTheme: number

  constructor(
    private auth: AuthService,
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/login'])
      alert('Você previsa estar logado pra ver o feed.')
    }
    let id = this.route.snapshot.params['id']
    this.findByIdPost(id)
    this.findAllThemes()
  }

  findByIdPost(id: number){
    this.postService.getByIdPost(id).subscribe((resp: PostagemModel)=> {
      this.post = resp
    })
  }

  findByIdTheme(){
    this.themeService.getByIdTema(this.idTheme).subscribe((resp: TemaModel)=>{
     this.theme = resp
    })
  }
  findAllThemes(){
    this.themeService.getAllThemes().subscribe((resp: TemaModel[])=>{
      this.listaTheme = resp
    })
  }

  atualizar(){
    this.postService.putPost(this.post).subscribe((resp: PostagemModel) => {
      this.post = resp
      alert('Post atualizado com sucesso!')
      this.router.navigate(['/home'])
    })
  }
}
