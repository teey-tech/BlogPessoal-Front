import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeDeleteComponent } from './delete/theme-delete/theme-delete.component';
import { ThemeEditComponent } from './edit/theme-edit/theme-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomeComponent},
  {path:'theme', component: ThemeComponent},
  {path:'theme-edit/:id', component: ThemeEditComponent},
  {path:'theme-delete/:id', component: ThemeDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
