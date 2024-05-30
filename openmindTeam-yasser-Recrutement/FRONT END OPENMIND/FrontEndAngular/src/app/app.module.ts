import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HumainrecourceshomeComponent } from './humainrecourceshome/humainrecourceshome.component';
import { HttpClientModule } from '@angular/common/http';
import { NewofferComponent } from './newoffer/newoffer.component';
import { HrComponent } from './hr/hr.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddvalidatorComponent } from './addvalidator/addvalidator.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NewcompanyComponent } from './newcompany/newcompany.component';
import { OfferlistComponent } from './offerlist/offerlist.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { ProfilelistComponent } from './profilelist/profilelist.component';
import { NewprofileComponent } from './newprofile/newprofile.component';
import { NewcandidateComponent } from './newcandidate/newcandidate.component';
import { CandidatelistComponent } from './candidatelist/candidatelist.component';
import { NewrecruitorComponent } from './newrecruitor/newrecruitor.component';
import { ApplicationlistComponent } from './applicationlist/applicationlist.component';
import { OnlynumbersDirective } from './derective/onlynumbers.directive';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { RecruitorlistComponent } from './recruitorlist/recruitorlist.component';
import { ApplicationvalidatedbyrecruitorComponent } from './applicationvalidatedbyrecruitor/applicationvalidatedbyrecruitor.component';
import { RecruitorComponent } from './recruitor/recruitor.component';
import { ApplicationsvalidatedbyvalidatorComponent } from './applicationsvalidatedbyvalidator/applicationsvalidatedbyvalidator.component';
import { CandidateComponent } from './candidate/candidate.component';
import { ValidatorComponent } from './validator/validator.component';
import { TrackapplicationsstatusComponent } from './trackapplicationsstatus/trackapplicationsstatus.component';
import { ValidatorlistComponent } from './validatorlist/validatorlist.component';
import { NewvalidatorComponent } from './newvalidator/newvalidator.component';
import { OffercandidateComponent } from './offercandidate/offercandidate.component';
import { CandidateprofilesComponent } from './candidateprofiles/candidateprofiles.component';
import { NewprofilebycandidateComponent } from './newprofilebycandidate/newprofilebycandidate.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { env  } from '../environments/environment';
import { UploadCvComponent } from './upload-cv/upload-cv.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: env.keycloakHost,
        realm: 'opemmindRealm',
        clientId: 'openmindClinetApp'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HumainrecourceshomeComponent,
    NewofferComponent,
    HrComponent,
    AddvalidatorComponent,
    NotfoundComponent,
    NewcompanyComponent,
    OfferlistComponent,
    CompanylistComponent,
    ProfilelistComponent,
    NewprofileComponent,
    NewcandidateComponent,
    CandidatelistComponent,
    NewrecruitorComponent,
    ApplicationlistComponent,
    OnlynumbersDirective,
    UpdateprofileComponent,
    RecruitorlistComponent,
    ApplicationvalidatedbyrecruitorComponent,
    RecruitorComponent,
    ApplicationsvalidatedbyvalidatorComponent,
    CandidateComponent,
    ValidatorComponent,
    TrackapplicationsstatusComponent,
    ValidatorlistComponent,
    NewvalidatorComponent,
    OffercandidateComponent,
    CandidateprofilesComponent,
    NewprofilebycandidateComponent,
    UploadCvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
