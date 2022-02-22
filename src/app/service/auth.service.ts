import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  entrar(usuarioLogin: UsuarioLoginDTO): Observable<UsuarioLoginDTO> {
    return this.http.post<UsuarioLoginDTO>('https://blogpessoalgen.herokuapp.com/usuarios/logar', usuarioLogin)
  }

  cadastro(usuarioCadastro: UsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>('https://blogpessoalgen.herokuapp.com/usuarios/cadastrar', usuarioCadastro)
  }
}
