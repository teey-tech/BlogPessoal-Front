import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../model/PostagemModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }


  getAllPosts(): Observable<PostagemModel[]>{
    return this.http.get<PostagemModel[]>('https://blogpessoalgen.herokuapp.com/postagens', this.token)
  }

  getByIdPost(id: number): Observable<PostagemModel> {
    return this.http.get<PostagemModel>(`https://blogpessoalgen.herokuapp.com/postagens/${id}`, this.token)
  }

  postPost(post: PostagemModel): Observable<PostagemModel>{
    return this.http.post<PostagemModel>('https://blogpessoalgen.herokuapp.com/postagens', post, this.token)
  }

  putPost(post: PostagemModel): Observable<PostagemModel>{
    return this.http.put<PostagemModel>('https://blogpessoalgen.herokuapp.com/postagens', post, this.token)
  }

  deletePost(id: number){
    return this.http.delete(`https://blogpessoalgen.herokuapp.com/postagens/delete/${id}`, this.token)
  }
}
