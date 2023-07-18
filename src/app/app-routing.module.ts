import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { authAdminGuard, authUserGuard } from './auth/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'profile', component: UserComponent, canActivate: [authUserGuard] },
  { path:'administration', component: AdminComponent, canActivate: [authAdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
