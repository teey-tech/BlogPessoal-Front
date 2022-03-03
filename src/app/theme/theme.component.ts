import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaModel } from '../model/TemaModel';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  theme: TemaModel = new TemaModel()
  listaThemes: TemaModel[]
  constructor(private router: Router, private themeService: ThemeService) { }

  ngOnInit(){
    window.scroll(0,0)
      if(environment.token == ''){
      this.router.navigate(['/login'])
      alert('Você previsa estar logado pra ver o feed.')
    }

    this.listThemes()
  }

  listThemes(){
    this.themeService.getAllThemes().subscribe((resp: TemaModel[]) => {
      this.listaThemes = resp
    })
  }
  cadastrar(){
    this.themeService.postTheme(this.theme).subscribe((resp: TemaModel) =>{
      this.theme = resp;
      alert("Tema cadastrado")
      this.theme = new TemaModel
      this.listThemes()
    })
  }
}
