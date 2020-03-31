import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: "", canActivate: [AuthGuard], component: HomeComponent },
  { path: "login", component: LoginComponent },
  // { path: "signup", component: SignupComponent },
  { path: "home", canActivate: [AuthGuard], component: HomeComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
