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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { SearchModule } from './search/search.module';
import { SearchFiltersComponent } from './search/search-filters/search-filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './navigation/spinner/spinner.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModifyPricesComponent } from './expert/modify-prices/modify-prices.component';
import { RateModule } from './rate/rate.module';
import { UpdateAvatarComponent } from './expert/update-avatar/update-avatar.component';
import { UpdateDataComponent } from './expert/update-data/update-data.component';
import { ErrorMessageComponent } from './navigation/error-message/error-message.component';
import { GetRatingsComponent } from './rate/get-ratings/get-ratings.component';
import { MovingComponent } from './navigation/moving/moving.component';
import { ServicesComponent } from './navigation/services/services.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotImplementedComponent } from './navigation/not-implemented/not-implemented.component';
import { ExpertModule } from './expert/expert.module';
import { MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    AllHomesComponent,
    FooterComponent,
    PleaseSignInComponent,
    SpinnerComponent,
    ErrorMessageComponent,
    MovingComponent,
    ServicesComponent,
    NotImplementedComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    UserModule,
    HomeModule,
    MatPaginatorModule,
    ExpertModule,
    SearchModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    RateModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
