import { Component } from '@angular/core';
import { AuthenticationmanagmentserviceService } from './services/authenticationmanagmentservice.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { jwtDecode } from 'jwt-decode';
import { CandidatemanagmentService } from './services/candidatemanagment.service';
import { CandidateDto } from './modules/candidate.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  state!: RouterStateSnapshot;
  roles:string[]=[];

  constructor(private candidateservice:CandidatemanagmentService,private ketcloak : KeycloakService,private authenticationservice: AuthenticationmanagmentserviceService,private router:Router ) { }

  ngOnInit(): void {
    this.state = this.router.routerState.snapshot;
    if(this.authenticationservice.IsAutheticated()){
      this.roles=this.authenticationservice.getRoles();
      if(this.roles.includes('HR')){
        this.router.navigateByUrl('/hr/recources')
      }
      else if (this.roles.includes('RECRUITOR')){
        this.router.navigateByUrl('/recruitor/offers')
      }
      else if (this.roles.includes('VALIDATOR')){
        this.router.navigateByUrl('/validator/offers')
      }
      else{
        //TODO CREATE AN CANDIDATE FOR THE REGISTRED USER FOR THE THE FIRT TIME
        this.ketcloak.getToken().then((token) => {
          const decodeJwt: any = jwtDecode(token);
          if(decodeJwt.sub){
            this.candidateservice.getCandidateByUserId(decodeJwt.sub).subscribe({
              next:(c)=>{
                this.router.navigateByUrl('/candidate/offers')
              },
              error:(err)=>{
                console.log(err.error);
                if(err.error.includes('user id not found')){
                  let candidate :CandidateDto={
                    id:'',
                    birthDate:new Date(),
                    city:'',
                    country:'France',
                    createdDate:new Date(),
                    email:decodeJwt.email,
                    firstName:decodeJwt.given_name,
                    hasAccount:true,
                    lastName:decodeJwt.family_name,
                    phone:'',
                    status:'Active',
                    userId:decodeJwt.sub,
                  }
                  console.log(candidate);
                  this.candidateservice.saveCandidats(candidate).subscribe({
                    next:(data)=>{
                      this.router.navigateByUrl('/hr/savecandidate/'+data.id);
                    },
                    error:(err)=>{
                    this.authenticationservice.LogOut();
                    }
                  });
                }
                else{
                  this.authenticationservice.LogOut();
                }
              }
            });
          }
          else{
            alert('invalid credancials try to logout');
            this.authenticationservice.LogOut();
          }
        }).catch(err=>{
          alert('server issues logOut and try again => '+err);
          this.router.navigateByUrl('/403');
        });
      }
    }
  }
}
