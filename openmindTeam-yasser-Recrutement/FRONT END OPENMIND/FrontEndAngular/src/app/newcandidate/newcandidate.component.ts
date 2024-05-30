import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatemanagmentService } from '../services/candidatemanagment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateDto } from '../modules/candidate.model';
import { Observable, catchError, throwError } from 'rxjs';
import { CurrencyCountry } from '../modules/company.model';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';
import { EmailFormat } from '../modules/emailformat.model';
import { UserApp } from '../modules/userApp.model';



@Component({
  selector: 'app-newcandidate',
  templateUrl: './newcandidate.component.html',
  styleUrl: './newcandidate.component.css'
})
export class NewcandidateComponent {

  candidateIdLink!: string;
  updateCandidate!: CandidateDto;
  countries!: Observable<CurrencyCountry[]>;
  errormsj!: string;
  buttondisabled: boolean = false;


  addCandidatsFormGroup!: FormGroup;
  constructor(private authservice: AuthenticationmanagmentserviceService, private companyservice: CompanymanagmentService, private route: ActivatedRoute, private fb: FormBuilder, private candidateservice: CandidatemanagmentService, private router: Router) { }


  ngOnInit(): void {
    this.addCandidatsFormGroup = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      phone: this.fb.control('', Validators.required),
      city: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.email),
      status: this.fb.control('', Validators.required),
      birthDate: this.fb.control('', Validators.required),
    })
    if (this.route.snapshot.params['candidateid']) {
      this.candidateIdLink = this.route.snapshot.params['candidateid'];
      this.candidateservice.getCandidateById(this.candidateIdLink).subscribe({
        next: (data: CandidateDto) => {
          this.updateCandidate = data;
          this.addCandidatsFormGroup = this.fb.group({
            firstName: this.fb.control(data.firstName, Validators.required),
            lastName: this.fb.control(data.lastName, Validators.required),
            phone: this.fb.control(data.phone, Validators.required),
            city: this.fb.control(data.city, Validators.required),
            country: this.fb.control(data.country, Validators.required),
            email: this.fb.control(data.email, Validators.email),
            status: this.fb.control(data.status, Validators.required),
            birthDate: this.fb.control(data.birthDate, Validators.required),
          })
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    this.countries = this.companyservice.getCountries().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  rest() {
    this.addCandidatsFormGroup.reset()
  }

  onSubmit() {
    if (this.addCandidatsFormGroup.valid) {
      if (!this.candidateIdLink) {
        this.buttondisabled = false
        const user: UserApp = {
          credentials: [{
            temporary: false,
            type: 'password',
            value: this.authservice.generateRandomString()
          }],
          email: this.addCandidatsFormGroup.get('email')?.value,
          emailVerified: false,
          enabled: true,
          firstName: this.addCandidatsFormGroup.get('firstName')?.value.trim(),
          lastName: this.addCandidatsFormGroup.get('lastName')?.value.trim(),
          username: this.authservice.generateUniqueUsername(this.addCandidatsFormGroup.get('lastName')?.value.trim(), this.addCandidatsFormGroup.get('firstName')?.value.trim())
        }
        this.authservice.CreateUser(user).subscribe({
          next: (res) => {
            this.authservice.GetUserByUserName(user.username).subscribe({
              next: (userdata: UserApp[]) => {
                this.authservice.GetRoleByName('CANDIDATE').subscribe({
                  next: (role: any) => {
                    this.authservice.AsignRoleToUser(userdata[0].id, [role]).subscribe({
                      next: (ok204) => {
                        const candidat: any = {
                          firstName: this.addCandidatsFormGroup.get('firstName')?.value.trim(),
                          lastName: this.addCandidatsFormGroup.get('lastName')?.value.trim(),
                          phone: this.addCandidatsFormGroup.get('phone')?.value,
                          city: this.addCandidatsFormGroup.get('city')?.value,
                          country: this.addCandidatsFormGroup.get('country')?.value,
                          email: this.addCandidatsFormGroup.get('email')?.value,
                          status: this.addCandidatsFormGroup.get('status')?.value,
                          birthDate: this.addCandidatsFormGroup.get('birthDate')?.value,
                          hasAccount: true,
                          id: '',
                          userId: userdata[0].id
                        };

                        // save candidate
                        this.candidateservice.saveCandidats(candidat).subscribe({
                          next: (data: CandidateDto) => {
                            const emailbody: EmailFormat = {
                              to: this.addCandidatsFormGroup.get('email')?.value,
                              subject: 'OpenMind Accounts Credantials',
                              htmlBody: this.authservice.BodyEmail(user.username, user.credentials[0].value)
                            }
                            this.companyservice.senMail(emailbody).subscribe({
                              next: (ok) => {
                                alert('candidate' + data.firstName + ' ' + data.lastName + ' has been saved with success also and email has been send to the user with accounts crediantls');
                                this.router.navigateByUrl('/hr/candidates');
                              },
                              error: (errmail) => {
                                this.errormsj = 'email never sent to the user ! ' + errmail;
                              }
                            });
                          },
                          error: (err) => {
                            console.log(err);
                            this.rest();
                          }
                        });
                      }
                    });
                  }
                });

              },
              error: (erro) => {
                this.errormsj = erro.value;
              }
            });
          },
          error: (err) => {
            console.log(err);
            this.errormsj = err.error.errorMessage + ' try again';
          },
        });
      }
      else {
        const candidat: any = {
          id: this.candidateIdLink,
          firstName: this.addCandidatsFormGroup.get('firstName')?.value.trim(),
          lastName: this.addCandidatsFormGroup.get('lastName')?.value.trim(),
          phone: this.addCandidatsFormGroup.get('phone')?.value,
          city: this.addCandidatsFormGroup.get('city')?.value,
          country: this.addCandidatsFormGroup.get('country')?.value,
          email: this.addCandidatsFormGroup.get('email')?.value,
          status: this.addCandidatsFormGroup.get('status')?.value,
          birthDate: this.addCandidatsFormGroup.get('birthDate')?.value,
          slots: [],
          hasAccount: false,
        };
        this.candidateservice.updateCandidats(candidat).subscribe({
          next: (data: CandidateDto) => {
            alert('candidate ' + data.firstName + ' ' + data.lastName + ' has been Updated with success');
            if(this.authservice.getRoles().includes('Hr'))
              this.router.navigateByUrl('/hr/candidates');
            else
              this.router.navigateByUrl('/candidate/offers');
          },
          error: (err) => {
            console.log(err);
            this.rest();
          }
        });
      }


    } else {
      alert('Formulaire invalide');
    }
  }

}
