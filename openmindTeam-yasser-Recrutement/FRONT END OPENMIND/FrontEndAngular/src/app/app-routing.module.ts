import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HumainrecourceshomeComponent } from './humainrecourceshome/humainrecourceshome.component';
import { NewofferComponent } from './newoffer/newoffer.component';
import { HrComponent } from './hr/hr.component';
import { AddvalidatorComponent } from './addvalidator/addvalidator.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OfferlistComponent } from './offerlist/offerlist.component';
import { NewcompanyComponent } from './newcompany/newcompany.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { ProfilelistComponent } from './profilelist/profilelist.component';
import { NewprofileComponent } from './newprofile/newprofile.component';
import { CandidatelistComponent } from './candidatelist/candidatelist.component';
import { NewcandidateComponent } from './newcandidate/newcandidate.component';
import { NewrecruitorComponent } from './newrecruitor/newrecruitor.component';
import { ApplicationlistComponent } from './applicationlist/applicationlist.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { RecruitorlistComponent } from './recruitorlist/recruitorlist.component';
import { ApplicationvalidatedbyrecruitorComponent } from './applicationvalidatedbyrecruitor/applicationvalidatedbyrecruitor.component';
import { RecruitorComponent } from './recruitor/recruitor.component';
import { ApplicationsvalidatedbyvalidatorComponent } from './applicationsvalidatedbyvalidator/applicationsvalidatedbyvalidator.component';
import { ValidatorComponent } from './validator/validator.component';
import { CandidateComponent } from './candidate/candidate.component';
import { TrackapplicationsstatusComponent } from './trackapplicationsstatus/trackapplicationsstatus.component';
import { ValidatorlistComponent } from './validatorlist/validatorlist.component';
import { NewvalidatorComponent } from './newvalidator/newvalidator.component';
import { OffercandidateComponent } from './offercandidate/offercandidate.component';
import { CandidateprofilesComponent } from './candidateprofiles/candidateprofiles.component';
import { NewprofilebycandidateComponent } from './newprofilebycandidate/newprofilebycandidate.component';
import { GalaxyGuard } from './guard/galaxy-guard.guard';

//note that validator and recruitor u will not give them permession to acces all offers just they offer attached with
const routes: Routes = [
  {path : "recruitor" , component: RecruitorComponent , children: [
    {path:"offers",canActivate:[GalaxyGuard],data:{roles:['RECRUITOR']},component: OfferlistComponent },
    {path:"valid/applications/recruitor/:offerid",canActivate:[GalaxyGuard],data:{roles:['RECRUITOR','VALIDATOR']},component: ApplicationvalidatedbyrecruitorComponent},
  ]},
  {path : "validator" , component: ValidatorComponent ,canActivate:[GalaxyGuard],data:{roles:['VALIDATOR']}, children: [
    //{path:"valid/applications/recruitor/:offerid",component: ApplicationvalidatedbyrecruitorComponent},
    {path:"offers",component: OfferlistComponent },
    {path:"valid/applications/validator/:offerid",component: ApplicationsvalidatedbyvalidatorComponent},
  ]},
  {path : "candidate" , component: CandidateComponent , children: [
    {path:"applications/:profileid", canActivate:[GalaxyGuard],data:{roles:['CANDIDATE','HR']} ,component: TrackapplicationsstatusComponent},
    {path:"offers", canActivate:[GalaxyGuard],data:{roles:['CANDIDATE']} ,component: OffercandidateComponent},
    {path:"offers/:offerId", canActivate:[GalaxyGuard],data:{roles:['CANDIDATE']} ,component: OffercandidateComponent},
    {path:"profiles", canActivate:[GalaxyGuard],data:{roles:['HR','CANDIDATE']} ,component:CandidateprofilesComponent},
    {path:"saveprofile", canActivate:[GalaxyGuard],data:{roles:['CANDIDATE']} ,component:NewprofilebycandidateComponent},
    {path:"updateprofile/:profileId", canActivate:[GalaxyGuard],data:{roles:['CANDIDATE']} ,component:NewprofilebycandidateComponent},
  ]},
  {path:"hr",component: HrComponent ,children: [
    {path:"saveoffer", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewofferComponent},
    {path:"saverecruitor", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewrecruitorComponent},
    {path:"saverecruitor/:profile_id", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewrecruitorComponent},
    {path:"saveoffer/:offerid", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewofferComponent},
    {path:"recources", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: HumainrecourceshomeComponent },
    {path:"savevalidator/:id", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: AddvalidatorComponent },
    {path:"savevalidator", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewvalidatorComponent  },
    {path:"offers",component: OfferlistComponent },
    {path:"profiles/:offerid", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: ProfilelistComponent },
    {path:"profiles", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: ProfilelistComponent },
    {path:"profiles/view/:profileId",component: ProfilelistComponent, canActivate:[GalaxyGuard],data:{roles:['HR','VALIDATOR','RECRUITOR']} },
    {path:"candidate/profiles/:candidateId", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component:CandidateprofilesComponent},
    {path:"applications/:offerid", canActivate:[GalaxyGuard],data:{roles:['HR','RECRUITOR']} ,component: ApplicationlistComponent },
    {path:"offers/:offerid", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: OfferlistComponent },
    {path:"savecompany", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewcompanyComponent },
    {path:"savecandidate", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewcandidateComponent},
    {path:"savecandidate/:candidateid", canActivate:[GalaxyGuard],data:{roles:['HR','CANDIDATE']} ,component: NewcandidateComponent},
    {path:"companies", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: CompanylistComponent },
    {path:"saveprofile", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewprofileComponent},
    {path:"saveprofile/:profile_id", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewprofileComponent},
    {path:"updateprofile/:profile_id", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: UpdateprofileComponent},
    {path:"candidates", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: CandidatelistComponent },
    {path:"recruitors", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: RecruitorlistComponent },
    {path:"validators", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: ValidatorlistComponent },
    {path:"updaterecruitor/update/:recruitor_id", canActivate:[GalaxyGuard],data:{roles:['HR','RECRUITOR']} ,component: NewrecruitorComponent},
    {path:"updatevalidator/update/:validator_id", canActivate:[GalaxyGuard],data:{roles:['HR','VALIDATOR']} ,component: NewvalidatorComponent},
    {path:"updatecompany/update/:companyid", canActivate:[GalaxyGuard],data:{roles:['HR']} ,component: NewcompanyComponent},
  ]},
  {path : "home" , component: HomeComponent},
  { path :"", redirectTo:"/home",pathMatch:"full"},
  {path : "**" , component: NotfoundComponent},
  {path : "403" , component: NotfoundComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
