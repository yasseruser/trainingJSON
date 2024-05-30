import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { CompanyDto } from '../modules/company.model';
import { ValidatorDto } from '../modules/validator.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatormanagmentService } from '../services/validatormanagment.service';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { UserApp } from '../modules/userApp.model';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';
import { EmailFormat } from '../modules/emailformat.model';

@Component({
  selector: 'app-newvalidator',
  templateUrl: './newvalidator.component.html',
  styleUrl: './newvalidator.component.css'
})
export class NewvalidatorComponent {

  addValidatorForm!: FormGroup;
  companys!: Observable<CompanyDto[]>;
  validator_id_link!: string;
  errorMessage!: string;
  validatorId!: string;
  validatorDto!: ValidatorDto;

  constructor(
    private auths : AuthenticationmanagmentserviceService,
    private route: ActivatedRoute,
    private validatorService: ValidatormanagmentService,
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanymanagmentService,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['validator_id']) {
      this.validator_id_link = this.route.snapshot.params['validator_id'];
    }
    this.addValidatorForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      phone: this.fb.control('', Validators.required),
      city: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.email, Validators.required]),
      selectedCompany: this.fb.control('', Validators.required),
    });
    if (this.route.snapshot.params['validator_id']) {
      this.validatorId = this.route.snapshot.params['validator_id']
      this.validatorService.getvalidatorbyid(this.validatorId).subscribe({
        next: (data) => {
          this.validatorDto = data;
          this.addValidatorForm = this.fb.group({
            firstName: [this.validatorDto.firstName, Validators.required],
            lastName: [this.validatorDto.lastName, Validators.required],
            phone: [this.validatorDto.phone, Validators.required],
            city: [this.validatorDto.city, Validators.required],
            country: [this.validatorDto.country, Validators.required],
            email: [this.validatorDto.email, [Validators.email, Validators.required]],
            selectedCompany: [this.validatorDto.companyid, Validators.required],
          });
        }
      });
    }
    this.fillOutCompanies();
  }

  fillOutCompanies(): void {
    this.companys = this.companyService.getCompaniesByName('').pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  onSubmit(): void {
    if (this.addValidatorForm.valid) {
      if (this.validatorId) {
        const validator: any = {
          id: this.validatorId,
          firstName: this.addValidatorForm.get('firstName')?.value,
          lastName: this.addValidatorForm.get('lastName')?.value,
          phone: this.addValidatorForm.get('phone')?.value,
          city: this.addValidatorForm.get('city')?.value,
          country: this.addValidatorForm.get('country')?.value,
          email: this.addValidatorForm.get('email')?.value,
          company_id: this.addValidatorForm.get('selectedCompany')?.value
        };
        this.updateValidator(validator);
      }
      else {
        const user: UserApp = {
          credentials: [{
            temporary: false,
            type: 'password',
            value: this.auths.generateRandomString()
          }],
          email: this.addValidatorForm.get('email')?.value,
          emailVerified: false,
          enabled: true,
          firstName: this.addValidatorForm.get('firstName')?.value,
          lastName:this.addValidatorForm.get('lastName')?.value,
          username: this.auths.generateUniqueUsername(this.addValidatorForm.get('lastName')?.value,this.addValidatorForm.get('firstName')?.value)
        }
        this.auths.CreateUser(user).subscribe({
          next:(ok)=>{
            this.auths.GetUserByUserName(user.username).subscribe({
              next:(userdat:UserApp[])=>{
                this.auths.GetRoleByName('VALIDATOR').subscribe({
                  next:(role)=>{
                    this.auths.AsignRoleToUser(userdat[0].id,[role]).subscribe({
                      next:(OK204)=>{
                        const validator: ValidatorDto = {
                          id: '',
                          firstName: this.addValidatorForm.get('firstName')?.value,
                          lastName: this.addValidatorForm.get('lastName')?.value,
                          phone: this.addValidatorForm.get('phone')?.value,
                          city: this.addValidatorForm.get('city')?.value,
                          country: this.addValidatorForm.get('country')?.value,
                          email: this.addValidatorForm.get('email')?.value,
                          company_id: this.addValidatorForm.get('selectedCompany')?.value,
                          userId:userdat[0].id
                        };
                        this.saveValidator(validator,user);
                      }
                    });
                  },
                  error:(roleerr)=>{
                    alert(roleerr.error.errorMessage + ' try again');
                  }
                });
              },
              error:(err)=>{
                alert(err.error.errorMessage + ' try again');
              }
            });
          },
          error:(er)=>{
            alert( er.error.errorMessage + ' try again');
          }
        });
      }
    } else {
      alert('Invalid Form');
    }
  }
  saveValidator(validator: ValidatorDto,user:UserApp): void {
    this.validatorService.saveValidator(validator).subscribe({
      next: (data) => {
        const emailbody:EmailFormat={
          to:this.addValidatorForm.get('email')?.value,
          subject:'OpenMind Accounts Credantials',
          htmlBody:this.auths.BodyEmail(user.username,user.credentials[0].value)
        }
        this.companyService.senMail(emailbody).subscribe({
          next:(ok)=>{
            alert('validator ' + data.firstName + ' ' + data.lastName + ' has been saved with success also an email has been send to the user with the account crediantls');
            this.router.navigateByUrl('/hr/validators');
          },
          error:(errmail)=>{
            this.errorMessage='email never sent to the user ! '+errmail.value;
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateValidator(validator: ValidatorDto): void {
    this.validatorService.updateValidator(validator).subscribe({
      next: (data) => {
        alert(`Validator ${data.firstName} ${data.lastName} has been updated successfully`);
        this.router.navigateByUrl('/hr/validators');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  goToAddCompany() {
    this.router.navigateByUrl('/hr/savecompany');
  }
}
