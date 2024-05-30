import { Component } from '@angular/core';
import { OffermanagmentService } from '../services/offermanagment.service';
import { Observable, catchError, throwError } from 'rxjs';
import { PageableOfferDto } from '../modules/offer.modul';
import { ValidatormanagmentService } from '../services/validatormanagment.service';
import { PageableValidatorDTO } from '../modules/validator.model';
import { PageableCandidateDTO } from '../modules/candidate.model';
import { CandidatemanagmentService } from '../services/candidatemanagment.service';
import { PageableProfileDto } from '../modules/profile.model';
import { ProfilemanagmentService } from '../services/profilemanagment.service';
import { Route, Router } from '@angular/router';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';

@Component({
  selector: 'app-humainrecourceshome',
  templateUrl: './humainrecourceshome.component.html',
  styleUrl: './humainrecourceshome.component.css'
})
export class HumainrecourceshomeComponent {
  offersObservable! : Observable<PageableOfferDto>;
  validatorObservable! : Observable<PageableValidatorDTO>;
  profileObservable !: Observable<PageableProfileDto>;


  currentPage : number =0;
  pageSize : number =3;
  loadingstate : boolean=true;
  errorMessage !: String;
  constructor(private auths:AuthenticationmanagmentserviceService,private offerservice : OffermanagmentService, private validatorservice : ValidatormanagmentService,private profileservice : ProfilemanagmentService) { }

  ngOnInit(): void {
    this.offersObservable=this.offerservice.getOfferOrderByCreatedDate("",this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

    this.validatorObservable= this.validatorservice.getValidatorsWithOfferDetailsAssociateToit(this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        alert("server is down ");
        return throwError(err);
      })
    );

    this.profileObservable=this.profileservice.getProfiles(this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        alert("server is down ");
        return throwError(err);
      })
    );
  }

  LogOut(){
    this.auths.LogOut();
  }
}
