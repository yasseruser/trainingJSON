import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDto } from '../modules/company.model';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatormanagmentService } from '../services/validatormanagment.service';
import { ValidatorDto } from '../modules/validator.model';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';
import { UserApp } from '../modules/userApp.model';
import { EmailFormat } from '../modules/emailformat.model';

@Component({
  selector: 'app-addvalidator',
  templateUrl: './addvalidator.component.html',
  styleUrl: './addvalidator.component.css'
})
export class AddvalidatorComponent {

  company!:CompanyDto;
  companyId! : string;
  addValidatorForm! : FormGroup;

  constructor(private auths:AuthenticationmanagmentserviceService,private validatorservice:ValidatormanagmentService,private fb : FormBuilder,private route:ActivatedRoute,private router : Router,private compayservice : CompanymanagmentService){}

  ngOnInit():void{
    this.company = this.router.getCurrentNavigation()?.extras.state as CompanyDto;
    if(!this.company){
      this.companyId = this.route.snapshot.params['id'];
      this.compayservice.getCompanyById(this.companyId).subscribe(
        {
          next:(data)=>{
            this.company=data
          },
          error:(err)=>{
            console.log(err);
          }
        }
      );
    }

    this.addValidatorForm=this.fb.group({
      firstName : this.fb.control('',Validators.required),
      lastName : this.fb.control('',Validators.required),
      phone : this.fb.control('',Validators.required),
      city : this.fb.control('',Validators.required),
      country : this.fb.control('',Validators.required),
      email:this.fb.control('',[Validators.email,Validators.required]),
    })
  }

  rest(){
    this.addValidatorForm.reset();
  }
  onSubmit(){
    if(this.addValidatorForm){
      let lastnames : string = this.addValidatorForm.get('lastName')?.value;
      let lastname : string = lastnames.replace(/\s/g, '');
      let fnames : string = this.addValidatorForm.get('firstName')?.value;
      let fname : string = fnames.replace(/\s/g, '');

      const user: UserApp = {
        credentials: [{
          temporary: false,
          type: 'password',
          value: this.auths.generateRandomString()
        }],
        email: this.addValidatorForm.get('email')?.value,
        emailVerified: false,
        enabled: true,
        firstName:fname,
        lastName: lastname,
        username: this.auths.generateUniqueUsername(lastname, fname)
      }
      this.auths.CreateUser(user).subscribe({
        next:(ok)=>{
          this.auths.GetRoleByName('VALIDATOR').subscribe({
            next:(role:any)=>{
              this.auths.GetUserByUserName(user.username).subscribe({
                next:(userdat:UserApp[])=>{
                  let validator : ValidatorDto={
                    id:"",
                    city:this.addValidatorForm.get('city')?.value,
                    country:this.addValidatorForm.get('country')?.value,
                    email:this.addValidatorForm.get('email')?.value,
                    firstName:fname,
                    lastName:lastname,
                    phone:this.addValidatorForm.get('phone')?.value,
                    company_id:this.companyId,
                    userId:userdat[0].id,
                  };
                  this.auths.AsignRoleToUser(userdat[0].id,[role]).subscribe({
                    next:(ok402)=>{
                      this.validatorservice.saveValidator(validator).subscribe({
                        next:(data:ValidatorDto)=>{
                          const emailbody:EmailFormat={
                            to:this.addValidatorForm.get('email')?.value,
                            subject:'OpenMind Accounts Credantials',
                            htmlBody:this.auths.BodyEmail(user.username,user.credentials[0].value)
                          }
                          this.compayservice.senMail(emailbody).subscribe({
                            next:(ok)=>{
                              alert('validator ' + data.firstName + ' ' + data.lastName + ' has been saved with success also an email has been send to the user with the account crediantls');
                              this.router.navigateByUrl('/hr/saveoffer');
                            },
                            error:(errmail)=>{
                              alert('email never sent to the user ! '+errmail);
                            }
                          });
                        },
                        error:(err)=>{
                          console.log(err.value);
                          alert(err.value +' server issues');
                        }
                      });
                    },
                    error:(asignerr)=>{
                      alert( asignerr.error.errorMessage + ' try again');
                    }
                  });
                }
              });
            },
            error:(roleerr)=>{
              alert( roleerr.error.errorMessage + ' try again');
            }
          });
        },
        error:(err)=>{
          alert( err.error.errorMessage + ' try again');
        }
      });
    }
    else
    alert('form inValid');
  }

}
