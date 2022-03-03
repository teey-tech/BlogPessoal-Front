import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaModel } from 'src/app/model/TemaModel';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit {

  theme: TemaModel = new TemaModel
  constructor(private themeService: ThemeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/login'])
      alert('Você previsa estar logado pra editar o thema.')
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTheme(id)
  }

  findByIdTheme(id: number){
    this.themeService.getByIdTema(id).subscribe((resp: TemaModel) => {
      this.theme = resp
    })
  }

  atualizar(){
    this.themeService.putTheme(this.theme).subscribe((resp: TemaModel) => {
      this.theme = resp
      alert('Tema atualizado com sucesso!')
      this.router.navigate(['/theme'])
    })
  }
}
