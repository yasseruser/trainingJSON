import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IntrviewData, PageableProfileDto, ProfileDto } from '../modules/profile.model';
import { ProfilemanagmentService } from '../services/profilemanagment.service';
import { ApplicationmanagmentService } from '../services/applicationmanagment.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OffermanagmentService } from '../services/offermanagment.service';
import { RecruitmentProcess } from '../modules/applay.model';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';

@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrl: './profilelist.component.css'
})
export class ProfilelistComponent {

  profileDetails!: ProfileDto;
  profiles!: PageableProfileDto;
  currentPage: number = 0;
  size: number = 10;
  errorMessage!: string;
  offerId!: string;
  test !: any;
  audioUrl!: SafeUrl;
  cvUrl!: SafeUrl;
  currency!: string;
  checkedProfiles: string[] = [];
  attachdisabele: boolean = false;
  intrviewData!:IntrviewData;
  roles:string[]=[];
  rederctedfromappliactiontoprofiledetailsprofileId!:string;


  constructor(private  authenticationservice:AuthenticationmanagmentserviceService,private companyservice: CompanymanagmentService, private rout: ActivatedRoute, private profileservice: ProfilemanagmentService, private sanitizer: DomSanitizer, private applicationservice: ApplicationmanagmentService, private offerservice: OffermanagmentService,private router:Router) { }


  ngOnInit(): void {
    this.offerId = this.rout.snapshot.params['offerid'];
    this.roles=this.authenticationservice.getRoles();
    if(this.offerId){
      this.offerservice.getOfferById(this.offerId).subscribe({
        next:(data)=>{
          //pass good
        },
        error:(err)=>{
          //whitch means that the offer id doent exist so we can, t attach profiles to inexisting offer
          this.router.navigateByUrl('/hr/profiles');
        }
      });
    }
    this.rederctedfromappliactiontoprofiledetailsprofileId=this.rout.snapshot.params['profileId'];
    if(this.rederctedfromappliactiontoprofiledetailsprofileId){
      this.ViewProfileDetails(this.rederctedfromappliactiontoprofiledetailsprofileId);
    }
    this.GetProfiles(this.currentPage, this.size);
  }

  onCheckboxChange(event: any, profileId: string) {
    const checked = event.target.checked;
    if (checked) {
      this.checkedProfiles.push(profileId);
    } else {
      const index = this.checkedProfiles.indexOf(profileId);
      if (index !== -1) {
        this.checkedProfiles.splice(index, 1);
      }
    }
  }


  isProfileAssociated(profile_id: string, offer_is: string) {
    this.applicationservice.isProfileAssociatedToOffer(offer_is, profile_id).subscribe({
      next: (data: any) => {
        this.test = data.isIt;
      }
    });
  }


  GetProfiles(page: number, size: number) {
    if (this.offerId) {
      this.profileservice.getProfilesWithProfileNotAssociatedToOffer(page, size, this.offerId).subscribe({
        next: (data: PageableProfileDto) => {
          this.profiles = data;
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      })
    }
    else {
      this.profileservice.getProfiles(page, size).subscribe({
        next: (data: PageableProfileDto) => {
          this.profiles = data;
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      })
    }
  }



  GotoNextPage() {
    if (this.currentPage + 2 <= this.profiles.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.GetProfiles(this.currentPage, this.size);
    }
  }

  GotoPrevousPage() {
    if (this.currentPage - 1 >= 0) {
      this.currentPage = this.currentPage - 1;
      this.GetProfiles(this.currentPage, this.size);
    }
  }
  ViewProfileDetails(id: string) {
    this.profileservice.getProfileById(id).subscribe({
      next: (data: ProfileDto) => {
        this.profileDetails = data;
        this.getCurrency(data.country);
        this.generateUrls(this.profileDetails);
      }
    });
  }


  getCurrency(country: string) {
    this.companyservice.getCurrencyBuCountry(country).subscribe({
      next: (fata) => {
        this.currency = fata[0].currency
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

  downloadFiles(profileDetails: ProfileDto): void {
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
        const audio = new Audio(url);
        audio.play();
      });
    }
  }

  attachProfile() {
    if (this.offerId) {
      if (this.checkedProfiles.length == 0) {
        alert("you should select profiles to attach them ");
      }
      else {
        this.attachdisabele = true;
        let i=0;
        this.checkedProfiles.forEach(element => {
          let applay: RecruitmentProcess = {
            id: '',
            offerid: this.offerId,
            profileid: element,
            tag: 'initialisation'
          }
          this.offerservice.applaytoAnOffer(applay).subscribe({
            next: (data) => {
              i++;
              if(i===this.checkedProfiles.length){
                this.router.navigateByUrl('/hr/applications/'+this.offerId);
              }
            }
          });
        });
      }
    }
  }

  viewintrviewdat(intrview:IntrviewData){
    this.intrviewData=intrview;
  }

  LogOut(){
    this.authenticationservice.LogOut();
  }
}

