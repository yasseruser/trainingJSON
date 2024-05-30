import { Component } from '@angular/core';
import { OfferDto, PageableOfferDto } from '../modules/offer.modul';
import { OffermanagmentService } from '../services/offermanagment.service';
import { ValidatorDto } from '../modules/validator.model';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { CompanyDto } from '../modules/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationmanagmentService } from '../services/applicationmanagment.service';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';
import { KeycloakService } from 'keycloak-angular';
import { jwtDecode } from 'jwt-decode';
import { RecruitormanagmentService } from '../services/recruitormanagment.service';
import { ValidatormanagmentService } from '../services/validatormanagment.service';

@Component({
  selector: 'app-offerlist',
  templateUrl: './offerlist.component.html',
  styleUrl: './offerlist.component.css'
})
export class OfferlistComponent {
  
  offerDetails!: OfferDto;
  offers!: PageableOfferDto;
  validators !: ValidatorDto[];
  company !: CompanyDto;
  currentPage: number = 0;
  size: number = 10;
  errorMessage!: string;
  offerIdFromRecourcesPage!: string;
  keyword: string = "";
  searchFormGroup !: FormGroup;
  roles:string[]=[];
  constructor(private validatorservice:ValidatormanagmentService,private recruitorservice:RecruitormanagmentService,private keycloak:KeycloakService,private authservice:AuthenticationmanagmentserviceService,private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private companyservice: CompanymanagmentService, private offerservice: OffermanagmentService) { }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      searchforoffer: this.fb.control(''),
    });
    this.roles=this.authservice.getRoles();
    if(this.roles.includes('HR')){
      this.offerservice.getOfferOrderByCreatedDateoriginal(this.currentPage, this.size).subscribe({
        next: (data: PageableOfferDto) => {
          this.offers = data;
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      })
          // Subscribe to value changes
      this.searchFormGroup.get('searchforoffer')?.valueChanges.subscribe(value => {
        this.keyword=value;
        this.GetOffers(value,this.currentPage,this.size);
    });
    }
    else{
      this.GetOffers("", this.currentPage, this.size);
    }

    if (this.route.snapshot.params['offerid']) {
      this.offerIdFromRecourcesPage = this.route.snapshot.params['offerid'];
      this.ViewOfferDetails(this.offerIdFromRecourcesPage);
    }

  }

  serchOfferByName() {
    //console.log(this.searchFormGroup);
  }


  GetOffers(keyword: string, page: number, size: number) {
    let roles : string[]=this.authservice.getRoles();

    if(roles.includes('HR') ){
      this.offerservice.getOfferOrderByCreatedDate(keyword, page, size).subscribe({
        next: (data: PageableOfferDto) => {
          this.offers = data;
        },
        error: (err) => {
          this.errorMessage = err.value;
          console.log(err);
        }
      })
    }

    else if(roles.includes('RECRUITOR')){
      this.keycloak.getToken().then((token) => {
        const decodeJwt: any = jwtDecode(token);
        if(decodeJwt.sub){
          this.recruitorservice.getRecruitorByUserId(decodeJwt.sub).subscribe({
            next:(data)=>{
              this.offerservice.getOfferByRecruitor(data.id,page,size).subscribe({
                next:(offers)=>{
                  this.offers =offers;
                },
                error:(offererr)=>{
                  this.errorMessage=offererr.value;
                }
              });
            },error:(recerr)=>{
              this.errorMessage=recerr.value;
            }
          });
        }
        else{
          alert('invalid credancials try to logout');
          this.router.navigateByUrl('/403');
        }
      }).catch(err=>{
        alert('server issues logOut and try again => '+err);
        this.router.navigateByUrl('/403');
      });
    }

    else if(roles.includes('VALIDATOR')){
      this.keycloak.getToken().then((token) => {
        const decodeJwt: any = jwtDecode(token);
        if(decodeJwt.sub){
          this.validatorservice.getValidatorByUserId(decodeJwt.sub).subscribe({
            next:(data)=>{
              this.offerservice.getOfferByValidator(data.id,page,size).subscribe({
                next:(offers)=>{
                  this.offers =offers;
                },
                error:(offererr)=>{
                  this.errorMessage=offererr.value;
                }
              });
            },error:(recerr)=>{
              this.errorMessage=recerr.value;
            }
          });
        }
        else{
          alert('invalid credancials try to logout');
          this.router.navigateByUrl('/403');
        }
      }).catch(err=>{
        alert('server issues logOut and try again => '+err);
        this.router.navigateByUrl('/403');
      });
    }

  }

  UpdateOfferDetails(offerid: string) {
    this.router.navigateByUrl("/hr/saveoffer/" + offerid);
  }



  GotoNextPage() {
    if (this.currentPage + 2 <= this.offers.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.GetOffers(this.keyword, this.currentPage, this.size)
    }
  }

  GotoPrevousPage() {
    if (this.currentPage - 1 >= 0) {
      this.currentPage = this.currentPage - 1;
      this.GetOffers(this.keyword, this.currentPage, this.size)
    }
  }

  ViewOfferDetails(id: string) {
    this.offerservice.getOfferById(id).subscribe({
      next: (data: OfferDto) => {
        this.offerDetails = data;
        this.companyservice.getCompanyById(data.companyid).subscribe({
          next: (comp: CompanyDto) => {
            this.company = comp
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }


  LogOut(){
    this.authservice.LogOut();
  }
}
