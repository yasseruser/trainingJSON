import { Component } from '@angular/core';
import { ApplicationDto, PageableApplicationDto } from '../modules/application.modile';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationmanagmentService } from '../services/applicationmanagment.service';
import { OffermanagmentService } from '../services/offermanagment.service';
import { OfferDto } from '../modules/offer.modul';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { RecruitmentProcess } from '../modules/applay.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';

@Component({
  selector: 'app-applicationlist',
  templateUrl: './applicationlist.component.html',
  styleUrl: './applicationlist.component.css'
})
export class ApplicationlistComponent {

  errorMessage!: string;
  applications!:PageableApplicationDto;
  currentPage:number=0;
  pagesize:number=10;
  offerId!:string;
  offer!:OfferDto;
  currency!:string;
  applicationDtos:ApplicationDto[]=[];
  selectedTag!:string;
  msj!:any;
  msjsuccess!:any;
  applicationId!:any;
  keyword: string = "";
  searchFormGroup !: FormGroup;
  keywordProfile: string = "";
  searchFormGroupprofile !: FormGroup;
  roles:string[]=[];


  constructor(private auths:AuthenticationmanagmentserviceService,private fb: FormBuilder,private router : Router,private companyservice:CompanymanagmentService,private offerservice: OffermanagmentService,private route:ActivatedRoute,private applicationservice:ApplicationmanagmentService) { }

  ngOnInit(): void {
    this.offerId=this.route.snapshot.params['offerid'];
    if(!this.offerId)
      this.router.navigateByUrl('/403')
    this.roles=this.auths.getRoles();
    this.searchFormGroup = this.fb.group({
        searchtag: this.fb.control(''),
      });
    this.searchFormGroupprofile = this.fb.group({
        searchprofile: this.fb.control(''),
      });
    this.offerservice.getOfferById(this.offerId).subscribe({
      next:(data)=>{
        this.offer=data;
      }
    });
    this.getApplications("","",this.offerId,this.currentPage,this.pagesize);
    //subscribe to input
    this.searchFormGroup.get('searchtag')?.valueChanges.subscribe(value => {
      this.keyword=value;
      this.getApplications(this.keywordProfile,this.keyword,this.offerId,this.currentPage,this.pagesize);
    });
        //subscribe to input
        this.searchFormGroupprofile.get('searchprofile')?.valueChanges.subscribe(value => {
          this.keywordProfile=value;
          this.getApplications(this.keywordProfile,this.keyword,this.offerId,this.currentPage,this.pagesize);
        });
  }

  
  getApplications(profileTitle:string,tag:string,offer_id : string , page:number,size:number){
    this.applicationservice.getAppliationsByOffer(profileTitle,tag,offer_id,page,size)
      .subscribe(
        {
          next:(data)=>{
            if(data){
            this.applicationDtos=[];
            this.applications=data;
            this.applications.applicationDtos.forEach(element => {
              this.companyservice.getCurrencyBuCountry(element.country).subscribe({
                next:(d)=>{
                  element.currency=d[0].currency;
                  this.applicationDtos.push(element);
                }
              });
            });
          }
          },
          error:(err)=>{
            this.router.navigateByUrl('/403')
          }
        }
      ); 
}

  nextPage(): void {
    if (this.currentPage < this.applications.totalPages - 1) {
      this.currentPage++;
      this.getApplications(this.keywordProfile,this.keyword,this.offerId,this.currentPage,this.pagesize);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getApplications(this.keywordProfile,this.keyword,this.offerId,this.currentPage,this.pagesize);
    }
  }

  passIdApp(id:string){
    this.applicationId=id;
  }
  updateTag(){
    if(this.selectedTag!=="" && this.applicationId){
      let app = this.applicationDtos.find(app => app.id === this.applicationId);
      let applay ={
        id:this.applicationId,
        offerid:this.offerId,
        profileid:app?.profile_id,
        tag:this.selectedTag
      }
      this.offerservice.applaytoAnOfferAnyHr(applay).subscribe({
        next:(d)=>{
          this.msj=undefined;
          this.msjsuccess='operation has been updated with success';
          window.location.reload();
        },
        error:(err)=>{
          this.msj=err.value;
        }
      });
      this.applicationId=undefined;
    }
    else{
      this.msjsuccess=undefined
      this.msj="u didn't select any tag or application dosn't exist";
      }
  }
  onSelectTag(e:any){
    this.selectedTag=e.target.value;
  }

  deleteApplication(appid:string){
    let r : RecruitmentProcess ={
      id:appid,
      offerid:'',
      profileid:'',
      tag:''
    }
    this.applicationservice.deleteAnApplication(r).subscribe({
      next:(data)=>{
        const indexToDelete = this.applicationDtos.findIndex(app => app.id === appid);
        if (indexToDelete !== -1) {
          this.applicationDtos = this.applicationDtos.slice(0, indexToDelete).concat(this.applicationDtos.slice(indexToDelete + 1));
        }
      }
    });
  }
  validatedApplication(idapp:string){
    let app = this.applicationDtos.find(app => app.id === idapp);
    if (!app?.profile_id || !app?.recruitment_status) {
      return
    }
    else {
      let applay = {
        id: idapp,
        offerid: this.offerId,
        profileid: app?.profile_id,
        tag: app?.recruitment_status,
        validatedByValidator: false,
        validatedByRecruitor: true,
      }
      this.offerservice.applaytoAnOfferAnybyRecruitor(applay).subscribe({
        next: (data) => {
          const indexToDelete = this.applicationDtos.findIndex(app => app.id === idapp);
          if (indexToDelete !== -1) {
            this.applicationDtos = this.applicationDtos.slice(0, indexToDelete).concat(this.applicationDtos.slice(indexToDelete + 1));
          }
          alert("success");
        }
      });
    }
  }

  LogOut(){
    this.auths.LogOut();
  }
}
