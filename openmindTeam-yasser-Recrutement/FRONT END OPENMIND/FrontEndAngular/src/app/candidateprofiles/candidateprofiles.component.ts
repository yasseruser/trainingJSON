import { Component } from '@angular/core';
import { PageableProfileDto, ProfileDto } from '../modules/profile.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilemanagmentService } from '../services/profilemanagment.service';
import { ApplicationmanagmentService } from '../services/applicationmanagment.service';
import { KeycloakService } from 'keycloak-angular';
import { jwtDecode } from 'jwt-decode';
import { CandidatemanagmentService } from '../services/candidatemanagment.service';

@Component({
  selector: 'app-candidateprofiles',
  templateUrl: './candidateprofiles.component.html',
  styleUrl: './candidateprofiles.component.css'
})
export class CandidateprofilesComponent {

  profileDetails!: ProfileDto;
  profiles!: PageableProfileDto;
  currentPage: number = 0;
  size: number = 10;
  errorMessage!: string;
  candidateId!: string;
  test !: any;
  audioUrl!: SafeUrl;
  cvUrl!: SafeUrl;
  currency!: string;
  roles:string[]=[];
  constructor(private route:ActivatedRoute,private auths:AuthenticationmanagmentserviceService,private router:Router,private candidateService:CandidatemanagmentService,private keycloak:KeycloakService,private companyservice: CompanymanagmentService,  private profileservice: ProfilemanagmentService, private sanitizer: DomSanitizer) { }
  
  ngOnInit(): void {
    if(this.route.snapshot.params['candidateId']){
      this.candidateId=this.route.snapshot.params['candidateId'];
      this.roles=this.auths.getRoles();
      this.getProfiles(this.currentPage, this.size);
    }
    else{
      this.keycloak.getToken().then(token=>{
        const tokenDecod : any = jwtDecode(token);
        if(tokenDecod.sub){
          this.candidateService.getCandidateByUserId(tokenDecod.sub).subscribe({
            next:(candidatedata)=>{
              this.candidateId=candidatedata.id;
              this.getProfiles(this.currentPage, this.size);
            },
            error:(err)=>{
              alert('server issues=> '+err);
              this.router.navigateByUrl('/403');
            }
          });
        }
        else{
          alert('invalid credianls logout and try again ');
          this.router.navigateByUrl('/403');
        }
      }).catch(er=>{
        alert('invalid credianls or authentication issues logout and try again => '+er);
        this.router.navigateByUrl('/403');
      })
    }
  }

  getProfiles(page: number, size: number) {
    if (this.candidateId) { 
      this.profileservice.getProfilesOfAnCandidate(this.candidateId, page, size).subscribe({
        next: (data: PageableProfileDto) => {
          this.profiles = data;
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      });
    }
  }

  goToNextPage() {
    if (this.currentPage + 2 <= this.profiles.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.getProfiles(this.currentPage, this.size);
    }
  }

  goToPreviousPage() {
    if (this.currentPage - 1 >= 0) {
      this.currentPage = this.currentPage - 1;
      this.getProfiles(this.currentPage, this.size);
    }
  }

  viewProfileDetails(id: string) {
    this.profileservice.getProfileById(id).subscribe({
      next: (data: ProfileDto) => {
        this.profileDetails = data;
        this.getCurrency(data.country);
        this.generateUrls(this.profileDetails);
      }
    });
  }

  downloadFiles(profileDetails: ProfileDto) {
    if (profileDetails.cv) {
      this.profileservice.getCvFile(profileDetails.id).subscribe((data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
  if (profileDetails.audio) {
    this.profileservice.getAudioFile(profileDetails.id).subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'audio/mp3' }); 
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}


  getCurrency(country: string) {
    this.companyservice.getCurrencyBuCountry(country).subscribe({
      next: (data) => {
        this.currency = data[0].currency;
      }
    });
  }

  generateUrls(profileDetails: ProfileDto): void {
    if (profileDetails.cv) {
      this.profileservice.getCvFile(profileDetails.id).subscribe((data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
    }

    if (profileDetails.audio) {
      this.profileservice.getAudioFile(profileDetails.id).subscribe((data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'audio/mpeg' });
        const url = window.URL.createObjectURL(blob);
        this.audioUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
    }
  } 

  LogOut(){
    this.auths.LogOut()
  }
}
