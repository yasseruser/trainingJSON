import { Component } from '@angular/core';
import { OfferDto, PageableOfferDto } from '../modules/offer.modul';
import { ValidatorDto } from '../modules/validator.model';
import { CompanyDto } from '../modules/company.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { OffermanagmentService } from '../services/offermanagment.service';
import { ProfileDto } from '../modules/profile.model';
import { ProfilemanagmentService } from '../services/profilemanagment.service';
import { RecruitmentProcess } from '../modules/applay.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';
import { KeycloakService } from 'keycloak-angular';
import { CandidatemanagmentService } from '../services/candidatemanagment.service';
import { CandidateDto } from '../modules/candidate.model';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-offercandidate',
  templateUrl: './offercandidate.component.html',
  styleUrl: './offercandidate.component.css'
})
export class OffercandidateComponent {

  offerDetails!: OfferDto;
  offers!: PageableOfferDto;
  validators !: ValidatorDto[];
  company !: CompanyDto;
  currentPage: number = 0;
  size: number = 10;
  errorMessage!: string;
  offerId!: string;
  offerIdLink!: string;
  keyword: string = "";
  searchFormGroup !: FormGroup;
  msj!:any;
  msjsuccess!:any;
  selectedProfileId!:string;
  profilesofancandidate!:ProfileDto[];
  authenticatedCandidate!:CandidateDto;

  constructor( private candidateservice:CandidatemanagmentService,protected readonly keycloak: KeycloakService,private route:ActivatedRoute,private authenticationsrvice:AuthenticationmanagmentserviceService,private router:Router,private profileservice:ProfilemanagmentService,private fb: FormBuilder, private companyservice: CompanymanagmentService, private offerservice: OffermanagmentService) { }
  ngOnInit(): void {
    if (this.route.snapshot.params['offerId']) {
      this.offerIdLink = this.route.snapshot.params['offerId'];
      this.ViewOfferDetails(this.offerIdLink);
    }
    this.searchFormGroup = this.fb.group({
      searchforoffer: this.fb.control(''),
    });
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

  serchOfferByName() {
    //console.log(this.searchFormGroup);
  }


  GetOffers(keyword: string, page: number, size: number) {
    this.offerservice.getOfferOrderByCreatedDate(keyword, page, size).subscribe({
      next: (data: PageableOfferDto) => {
        this.offers = data;
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(err);
      }
    })
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


  passOfferId(id:string){
    this.offerId=id
    this.keycloak.getToken().then((token) => {
      const decodeJwt: any = jwtDecode(token);
      if(decodeJwt.sub){
        this.candidateservice.getCandidateByUserId(decodeJwt.sub).subscribe({
          next:(candidate:CandidateDto)=>{
            this.authenticatedCandidate=candidate;
            this.profileservice.getProfilesOfAnCandidate(candidate.id,0,100).subscribe({
              next:(data)=>{
                this.profilesofancandidate=data.profileDtos;
              }
            });
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

  onSelectProfile(events:any){
    this.selectedProfileId=events.target.value;
  }
  applaytooffer(){
    if(this.selectedProfileId && this.offerId){
      let applay:RecruitmentProcess={
        id:'',
        offerid:this.offerId,
        profileid:this.selectedProfileId,
        tag:'initialisation',
      }
      this.offerservice.applaytoAnOffer(applay).subscribe({
        next:(data)=>{
          this.msjsuccess='operation has been done with success';
        },
        error:(err)=>{
          this.msj='Already applied or server error';
        }
      });
    }
    else{
      this.msj='offer or profile not selected';
    }
  }

  LogOut(){
    this.authenticationsrvice.LogOut();
  }
}
