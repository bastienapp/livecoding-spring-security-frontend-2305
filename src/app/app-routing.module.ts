import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { roleAdminGuard, roleUserGuard } from './auth/auth.guard';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'profile', component: UserComponent, canActivate: [roleUserGuard] },
  { path:'administration', component: AdminComponent, canActivate: [roleAdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
