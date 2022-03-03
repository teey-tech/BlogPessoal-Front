import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TemaModel } from '../model/TemaModel';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  constructor(private http: HttpClient) { }

  getAllThemes(): Observable<TemaModel[]>{
    return this.http.get<TemaModel[]>('https://blogpessoalgen.herokuapp.com/temas', this.token)
  }

  getByIdTema(id: number): Observable<TemaModel> {
    return this.http.get<TemaModel>(`https://blogpessoalgen.herokuapp.com/temas/${id}`, this.token)
  }

  postTheme(theme: TemaModel): Observable<TemaModel>{
    return this.http.post<TemaModel>('https://blogpessoalgen.herokuapp.com/temas', theme, this.token)
  }

  putTheme(theme: TemaModel): Observable<TemaModel>{
    return this.http.put<TemaModel>('https://blogpessoalgen.herokuapp.com/temas', theme, this.token)
  }

  deleteTheme(id: number){
    return this.http.delete(`https://blogpessoalgen.herokuapp.com/temas/delete/${id}`, this.token)
  }
}
