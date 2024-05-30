import { Component } from '@angular/core';
import { OffermanagmentService } from '../services/offermanagment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationDto, PageableApplicationDto } from '../modules/application.modile';
import { ProfileDto } from '../modules/profile.model';
import { ProfilemanagmentService } from '../services/profilemanagment.service';
import { RecruitmentProcess } from '../modules/applay.model';
import { ApplicationmanagmentService } from '../services/applicationmanagment.service';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';

@Component({
  selector: 'app-trackapplicationsstatus',
  templateUrl: './trackapplicationsstatus.component.html',
  styleUrl: './trackapplicationsstatus.component.css'
})
export class TrackapplicationsstatusComponent {
  profileId!:string;
  Applications!:ApplicationDto[];
  pageableapplication!:PageableApplicationDto;
  profile!:ProfileDto;
  currentPage: number = 0;
  pageSize: number = 10;
  errorMessage!:any;
  roles:string[]=[];
  constructor(private authservice:AuthenticationmanagmentserviceService,private applicationservice:ApplicationmanagmentService,private profileservice:ProfilemanagmentService,private route:ActivatedRoute,private router:Router,private offerservice:OffermanagmentService) { }

  ngOnInit(): void {
    this.roles=this.authservice.getRoles();
    if(this.route.snapshot.params['profileid']){
      this.profileId=this.route.snapshot.params['profileid'];
      this.profileservice.getProfileById(this.profileId).subscribe({
        next:(data)=>{
          this.profile=data;
        },
        error:(err)=>{
          alert('invalide profile id  '+this.profileId+' err :'+err );
          this.router.navigateByUrl('/403');
        }
      });
      this.getAppliactionOfAnProfile(this.profileId,this.currentPage,this.pageSize);
    }
    else{
      this.router.navigateByUrl('/403');
    }
  }

  getAppliactionOfAnProfile(profileid:string,page:number,size:number){
    this.offerservice.getApplicationOfAnProfile(profileid,page,size).subscribe({
      next:(data)=>{
        this.pageableapplication=data;
        this.Applications=data.applicationDtos;
      },
      error:(err)=>{
        this.errorMessage=err;
        this.router.navigateByUrl('/candidate/profiles');
      }
    });
  }

  
  nextPage(): void {
    if (this.currentPage < this.pageableapplication.totalPages - 1) {
      this.currentPage++;
      this.getAppliactionOfAnProfile(this.profileId,this.currentPage,this.pageSize);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAppliactionOfAnProfile(this.profileId,this.currentPage,this.pageSize);
    }
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
        const indexToDelete = this.Applications.findIndex(app => app.id === appid);
        if (indexToDelete !== -1) {
          this.Applications = this.Applications.slice(0, indexToDelete).concat(this.Applications.slice(indexToDelete + 1));
        }
      }
    });
  }

  LogOut(){
    this.authservice.LogOut();
  }
}
