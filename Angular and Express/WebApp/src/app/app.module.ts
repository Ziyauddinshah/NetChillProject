import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AddResultComponent } from './add-result/add-result.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentResultService } from './services/student-result.service';
import { AuthService } from './services/auth.service';
import { EditResultComponent } from './edit-result/edit-result.component';
import { DisplayResultComponent } from './display-result/display-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    TeacherComponent,
    AddResultComponent,
    HomeComponent,
    PageNotFoundComponent,
    EditResultComponent,
    DisplayResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, StudentResultService],
  bootstrap: [AppComponent],
})
export class AppModule {}
