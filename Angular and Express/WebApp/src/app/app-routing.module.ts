import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddResultComponent } from './add-result/add-result.component';
import { AppComponent } from './app.component';
import { EditResultComponent } from './edit-result/edit-result.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AuthGuard } from './services/auth.guard';
import { DisplayResultComponent } from './display-result/display-result.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuard] },
  {
    path: 'add-result',
    component: AddResultComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-result',
    component: EditResultComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'display-result',
    component: DisplayResultComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
