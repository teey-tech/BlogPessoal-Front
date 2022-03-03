import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaModel } from 'src/app/model/TemaModel';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrls: ['./theme-delete.component.css']
})
export class ThemeDeleteComponent implements OnInit {
  theme: TemaModel = new TemaModel()
  idTheme: number
  constructor(private themeService: ThemeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/login'])
      alert('Você previsa estar logado pra editar o thema.')
    }

    this.idTheme = this.route.snapshot.params['id']
    this.findByIdTheme(this.idTheme)
  }

  findByIdTheme(id: number){
    this.themeService.getByIdTema(id).subscribe((resp: TemaModel)=>{
      this.theme = resp
    })
  }

  apagar(){
    this.themeService.deleteTheme(this.idTheme).subscribe(() =>{
      alert(`Tema apagado com sucesso!`)
      this.router.navigate(['/theme'])

    })
  }
}
