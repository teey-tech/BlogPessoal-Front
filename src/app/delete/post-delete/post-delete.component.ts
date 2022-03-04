import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemModel } from 'src/app/model/PostagemModel';
import { PostService } from 'src/app/service/post.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {

  post: PostagemModel = new PostagemModel()
  idPost: number

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/login'])
      alert('Você previsa estar logado pra apagar a postagem.')
    }
    this.idPost = this.route.snapshot.params['id']
    this.findByIdPost(this.idPost)
  }

  findByIdPost(id: number){
    this.postService.getByIdPost(id).subscribe((resp: PostagemModel)=>{
      this.post = resp
    })
  }

  apagar(){
    this.postService.deletePost(this.idPost).subscribe(() =>{
      alert(`Tema apagado com sucesso!`)
      this.router.navigate(['/home'])
    })
  }
}
