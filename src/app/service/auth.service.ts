import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  entrar(usuarioLogin: UsuarioLoginDTO): Observable<UsuarioLoginDTO> {
    return this.http.post<UsuarioLoginDTO>('https://blogpessoalgen.herokuapp.com/usuarios/logar', usuarioLogin)
  }

  cadastro(usuarioCadastro: UsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>('https://blogpessoalgen.herokuapp.com/usuarios/cadastrar', usuarioCadastro)
  }

  getByIdUsuario(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`https://blogpessoalgen.herokuapp.com/usuarios/${id}`, this.token)
  }

  putUsuario(user: UsuarioModel): Observable<UsuarioModel>{
    return this.http.put<UsuarioModel>('https://blogpessoalgen.herokuapp.com/usuarios', user, this.token)
  }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }
}
