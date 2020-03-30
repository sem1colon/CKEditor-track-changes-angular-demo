import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { EditorComponent } from './editor/editor.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: "", canActivate: [AuthGuard], component: EditorComponent },
  { path: "login", component: LoginComponent },
  // { path: "signup", component: SignupComponent },
  { path: "editor", canActivate: [AuthGuard], component: EditorComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
