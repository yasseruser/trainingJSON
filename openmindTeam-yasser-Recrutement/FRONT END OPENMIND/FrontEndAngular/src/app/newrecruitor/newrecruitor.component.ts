import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDto } from '../modules/company.model';
import { Observable, catchError, throwError } from 'rxjs';
import { RecruitorDto } from '../modules/recruitor.model';
import { RecruitormanagmentService } from '../services/recruitormanagment.service';
import { UserApp } from '../modules/userApp.model';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';
import { EmailFormat } from '../modules/emailformat.model';

@Component({
  selector: 'app-newrecruitor',
  templateUrl: './newrecruitor.component.html',
  styleUrl: './newrecruitor.component.css'
})
export class NewrecruitorComponent {
  addRecruitorForm!: FormGroup;
  companys  !: Observable<CompanyDto[]>;
  errmsj!: string;
  profile_id_link!: string;
  recruitorid!: string;
  recruitorDto!: RecruitorDto;
  constructor(private authservice:AuthenticationmanagmentserviceService,private route: ActivatedRoute, private recrutorservice: RecruitormanagmentService, private fb: FormBuilder, private router: Router, private compayservice: CompanymanagmentService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['profile_id']) {
      this.profile_id_link = this.route.snapshot.params['profile_id'];
    }
    this.addRecruitorForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      phone: this.fb.control('', Validators.required),
      city: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.email, Validators.required]),
      selectedCompany: this.fb.control('', Validators.required),
    });
    if (this.route.snapshot.params['recruitor_id']) {
      this.recruitorid = this.route.snapshot.params['recruitor_id']
      this.recrutorservice.getrecruitorbyid(this.recruitorid).subscribe({
        next: (data) => {
          this.recruitorDto = data;
          this.addRecruitorForm = this.fb.group({
            firstName: [this.recruitorDto.firstName, Validators.required],
            lastName: [this.recruitorDto.lastName, Validators.required],
            phone: [this.recruitorDto.phone, Validators.required],
            city: [this.recruitorDto.city, Validators.required],
            country: [this.recruitorDto.country, Validators.required],
            email: [this.recruitorDto.email, [Validators.email, Validators.required]],
            selectedCompany: [this.recruitorDto.companyid, Validators.required],
          });
        }
      });
    }
    this.fillOutValidatorsByCompany();
  }

  fillOutValidatorsByCompany() {
    this.companys = this.compayservice.getCompaniesByName('').pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }


  onSubmit(): void {
    if (this.addRecruitorForm.valid) {
      if (this.recruitorid) {
        const recruitor: any = {
          id: this.recruitorid,
          city: this.addRecruitorForm.get('city')?.value,
          country: this.addRecruitorForm.get('country')?.value,
          createdDate: new Date(),
          email: this.addRecruitorForm.get('email')?.value,
          firstName: this.addRecruitorForm.get('firstName')?.value,
          lastName: this.addRecruitorForm.get('lastName')?.value,
          companyid: this.addRecruitorForm.get('selectedCompany')?.value,
          phone: this.addRecruitorForm.get('phone')?.value,

        };
        this.updateRecruitor(recruitor);
      } else {
        const user: UserApp = {
          credentials: [{
            temporary: false,
            type: 'password',
            value: this.authservice.generateRandomString()
          }],
          email: this.addRecruitorForm.get('email')?.value,
          emailVerified: false,
          enabled: true,
          firstName: this.addRecruitorForm.get('firstName')?.value.trim(),
          lastName: this.addRecruitorForm.get('lastName')?.value.trim(),
          username: this.authservice.generateUniqueUsername(this.addRecruitorForm.get('lastName')?.value.trim(), this.addRecruitorForm.get('firstName')?.value.trim())
        }
        this.authservice.CreateUser(user).subscribe({
          next:(Ok)=>{
            this.authservice.GetUserByUserName(user.username).subscribe({
              next:(userdata:UserApp[])=>{
                this.authservice.GetRoleByName('RECRUITOR').subscribe({
                  next:(role)=>{
                    this.authservice.AsignRoleToUser(userdata[0].id,[role]).subscribe({
                      next:(OK204)=>{
                        const recruitor: RecruitorDto = {
                          id: '',
                          city: this.addRecruitorForm.get('city')?.value,
                          country: this.addRecruitorForm.get('country')?.value,
                          createdDate: new Date(),
                          email: this.addRecruitorForm.get('email')?.value,
                          firstName: this.addRecruitorForm.get('firstName')?.value,
                          lastName: this.addRecruitorForm.get('lastName')?.value,
                          companyid: this.addRecruitorForm.get('selectedCompany')?.value,
                          phone: this.addRecruitorForm.get('phone')?.value,
                          userId:userdata[0].id,
                        };
                        this.saveRecruitor(recruitor,user);
                      },
                      error:(assignerr)=>{
                        this.errmsj = assignerr.error.errorMessage + ' try again';
                      }
                    });
                  },
                  error:(roleer)=>{
                    this.errmsj = roleer.error.errorMessage + ' try again';
                  }
                });
              },
              error:(er)=>{
                this.errmsj = er.error.errorMessage + ' try again';
              }
            });
          }
        });
      }
    } else {
      alert('Invalid Form');
    }
  }

  saveRecruitor(recruitor: RecruitorDto,user:UserApp): void {
    this.recrutorservice.saveRecruitor(recruitor).subscribe({
      next: (data) => {
        const emailbody:EmailFormat={
          to:this.addRecruitorForm.get('email')?.value,
          subject:'OpenMind Accounts Credantials',
          htmlBody:this.authservice.BodyEmail(user.username,user.credentials[0].value)
        }
        this.compayservice.senMail(emailbody).subscribe({
          next:(ok)=>{
            alert('recruitor ' + data.firstName + ' ' + data.lastName + ' has been saved with success also an email has been send to the user with the account crediantls');
            if (this.profile_id_link)
              this.router.navigateByUrl(`/hr/saveprofile/${this.profile_id_link}`);
            else
              this.router.navigateByUrl('/hr/recruitors');
          },
          error:(errmail)=>{
            this.errmsj='email never sent to the user ! '+errmail;
          }
        });
      },
      error: (err) => {
        this.errmsj = err.message;
      }
    });
  }

  updateRecruitor(recruitor: RecruitorDto): void {
    this.recrutorservice.updateRecruitor(recruitor).subscribe({
      next: (data) => {
        alert(`Recruiter ${data.lastName} has been updated successfully`);

        this.router.navigateByUrl('/hr/recruitors');
      },
      error: (err) => {
        this.errmsj = err.message;
      }
    });
  }

  goToAddCompany() {
    this.router.navigateByUrl('/hr/savecompany');
  }
}
