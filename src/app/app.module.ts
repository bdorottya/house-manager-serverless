import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AllExpertsComponent } from './expert/all-experts/all-experts.component';
import { OneExpertComponent } from './expert/one-expert/one-expert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpertDashboardComponent } from './expert/expert-dashboard/expert-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { HomePageComponent } from './navigation/home-page/home-page.component';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { AllHomesComponent } from './home/all-homes/all-homes.component';
import { HomeModule } from './home/home.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FooterComponent } from './navigation/footer/footer.component';
import { PleaseSignInComponent } from './navigation/please-sign-in/please-sign-in.component';
import { environment } from "../environments/environment";




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AllExpertsComponent,
    OneExpertComponent,
    ExpertDashboardComponent,
    HomePageComponent,
    AllHomesComponent,
    FooterComponent,
    PleaseSignInComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    UserModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatRadioModule,
    HomeModule,
    MatExpansionModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
