import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDeleteComponent } from './delete/post-delete/post-delete.component';
import { ThemeDeleteComponent } from './delete/theme-delete/theme-delete.component';
import { PostEditComponent } from './edit/post-edit/post-edit.component';
import { ThemeEditComponent } from './edit/theme-edit/theme-edit.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
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
  {path:'post-edit/:id', component: PostEditComponent},
  {path:'post-delete/:id', component: PostDeleteComponent},
  {path:'user-edit/:id', component: UserEditComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
