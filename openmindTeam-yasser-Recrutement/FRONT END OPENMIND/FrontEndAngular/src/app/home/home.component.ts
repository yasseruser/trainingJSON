import { Component } from '@angular/core';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  state!: RouterStateSnapshot;
  roles:string[]=[];
  constructor(private authenticationservice: AuthenticationmanagmentserviceService,private router:Router ) { }

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
        this.router.navigateByUrl('/candidate/offers')
      }
    }
  }


  async logIn(){
    this.authenticationservice.LogIn(this.state);
  }
  async SignUp(){
    this.authenticationservice.SIgnUp(this.state);
  }



}
