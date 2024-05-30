import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateDto } from '../modules/candidate.model';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatemanagmentService } from '../services/candidatemanagment.service';
import { ProfilemanagmentService } from '../services/profilemanagment.service';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';
import { ProfileDto, Skill } from '../modules/profile.model';
import { KeycloakService } from 'keycloak-angular';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-newprofilebycandidate',
  templateUrl: './newprofilebycandidate.component.html',
  styleUrl: './newprofilebycandidate.component.css'
})
export class NewprofilebycandidateComponent {

  addProfileForm!: FormGroup;
  addInrviewForm!: FormGroup;
  addCvForm!: FormGroup;
  addAudioForm!: FormGroup;
  remuneration!: number;
  isButtonDisabled: boolean = true;
  savecv: boolean = false;
  saveaudio: boolean = false;
  showfilButtons: boolean = false;
  selectedCv!: File;
  selectedAudio!: File;
  showerro!: any;
  relocation!: string;
  succesmsjapplay!: string;
  currency!:string;
  authCandidateObject!:CandidateDto;
  profile_id!:string;
  linkProfileId!:string;
  apiProfile!:ProfileDto;

  constructor(private keycloak:KeycloakService,private route:ActivatedRoute,private authservice:AuthenticationmanagmentserviceService,private candidateservice:CandidatemanagmentService,private companyservice:CompanymanagmentService,  private router: Router, private fb: FormBuilder, private profileService: ProfilemanagmentService) { }


  ngOnInit(): void {
    this.isButtonDisabled = true;
    this.addProfileForm = this.fb.group({
      profileTitle: this.fb.control("", [Validators.required]),
      profileType: this.fb.control("", [Validators.required]),
      remuneration: this.fb.control(null),
      skillName0: this.fb.control("",Validators.required),
      year0: this.fb.control(null,Validators.required),
      skillName1: this.fb.control(""),
      year1: this.fb.control(null),
      skillName2: this.fb.control(""),
      year2: this.fb.control(null),
      skillName3: this.fb.control(""),
      year3: this.fb.control(null),
      skillName4: this.fb.control(""),
      year4: this.fb.control(null),
      skillName5: this.fb.control(""),
      year5: this.fb.control(null),
      skillName6: this.fb.control(""),
      year6: this.fb.control(null),
      skillName7: this.fb.control(""),
      year7: this.fb.control(null),
      skillName8: this.fb.control(""),
      year8: this.fb.control(null),
      skillName9: this.fb.control(""),
      year9: this.fb.control(null),
      skills: new FormArray([new FormControl("")]),
    });

    //update profile getting the profile id from link
    if(this.route.snapshot.params['profileId']){
      this.linkProfileId=this.route.snapshot.params['profileId'];
      this.profileService.getProfileById(this.linkProfileId).subscribe({
        next:(data)=>{
          this.apiProfile=data;
          this.addProfileForm = this.fb.group({
            profileTitle: this.fb.control(data.profileTitle, [Validators.required]),
            profileType: this.fb.control(data.profileType, [Validators.required]),
            remuneration: this.fb.control(this.apiProfile.salaryExpectations),
            skillName0: this.fb.control(this.apiProfile.skills[0].skillName,Validators.required),
            year0: this.fb.control(this.apiProfile.skills[0].yearsOfExperience,Validators.required),
            skillName1: this.fb.control(""),
            year1: this.fb.control(null),
            skillName2: this.fb.control(""),
            year2: this.fb.control(null),
            skillName3: this.fb.control(""),
            year3: this.fb.control(null),
            skillName4: this.fb.control(""),
            year4: this.fb.control(null),
            skillName5: this.fb.control(""),
            year5: this.fb.control(null),
            skillName6: this.fb.control(""),
            year6: this.fb.control(null),
            skillName7: this.fb.control(""),
            year7: this.fb.control(null),
            skillName8: this.fb.control(""),
            year8: this.fb.control(null),
            skillName9: this.fb.control(""),
            year9: this.fb.control(null),
            skills: new FormArray([new FormControl("")]),
          });
          this.isButtonDisabled=false;
        },
        error:(err)=>{
          alert('the profile id : '+this.linkProfileId+' not found ');
          this.router.navigateByUrl('/403');
        }
      });
    }

    this.addCvForm = this.fb.group({
      cv: this.fb.control(null),
    });
    this.addAudioForm = this.fb.group({
      audio: this.fb.control(null),
    });
    if(!this.linkProfileId) {
      this.keycloak.getToken().then(token=>{
      const decodeJwt: any = jwtDecode(token);
      if(decodeJwt.sub){
        this.candidateservice.getCandidateByUserId(decodeJwt.sub).subscribe({
          next:(data)=>{
            this.authCandidateObject=data;
            this.isButtonDisabled=false
          },
          error:(err)=>{
            alert('invalid credentials');
            this.router.navigateByUrl('/403');
          }
        });
      }
      else{
        alert('invalid credianls try to logOut');
        this.router.navigateByUrl('/403');
      }
      }).catch(err=>{
        alert('server issues logOut and try again => '+err);
        this.router.navigateByUrl('/403');
      });
    }    
  }

  onFileSelected(e: any) {
    const file: File = e.target.files[0];
    this.selectedCv = file;  }

  onFileSelectedAudio(e: any) {
    const file: File = e.target.files[0];
    this.selectedAudio = file;
  }

  onChangeRemuneration(e: any) {
    if(this.authCandidateObject){
          this.companyservice.getCurrencyBuCountry(this.authCandidateObject.country).subscribe({
            next:(d)=>{
              this.currency=d[0].currency;
              this.remuneration = this.addProfileForm.get('remuneration')?.value
            }
          });
        }
        else if (this.apiProfile){
          this.companyservice.getCurrencyBuCountry(this.apiProfile.country).subscribe({
            next:(d)=>{
              this.currency=d[0].currency;
              this.remuneration = this.addProfileForm.get('remuneration')?.value
            }
          });
        }
    }




  onclickAddskill() {
    (<FormArray>this.addProfileForm.get('skills')).push(this.fb.control(null));
  }

  onclickCancelskill(index: any) {
    (<FormArray>this.addProfileForm.get('skills')).removeAt(index);
  }

  get formskills(): AbstractControl[] {
    return (<FormArray>this.addProfileForm.get('skills')).controls;
  }




  onSubmit(): void {

    if (!this.addProfileForm.valid ) {
      alert('invalid inputs');
    } else {
      let profile: any;
      if(!this.linkProfileId){
        if(this.authCandidateObject){
          profile= {
            id: '',
            candidate_id:this.authCandidateObject.id,
            city: this.authCandidateObject.city,
            country: this.authCandidateObject.country,
            createdAt: new Date(),
            email: this.authCandidateObject.email,
            firstName: this.authCandidateObject.firstName,
            lastName: this.authCandidateObject.lastName,
            phone: this.authCandidateObject.phone,
            profileTitle: this.addProfileForm.get('profileTitle')?.value,
            profileType: this.addProfileForm.get('profileType')?.value,
            recruitmentStatus: '',
            salaryExpectations: this.addProfileForm.get('remuneration')?.value,
            status: '',
            skills: this.addSkills()
          }
          this.isButtonDisabled = true;
          this.profileService.saveBasicProfileInformation(profile).subscribe({
            next: (data: ProfileDto) => {
              this.profile_id = data.id;
              alert('profile ' + profile.profileTitle + ' of candidate ' + profile.lastName + ' has been saved with success ');
              this.showfilButtons = true;
              this.addProfileForm.reset();
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
        else{
          alert('invalid credanials ');
        }
      }
      else{
        profile= {
          id: this.linkProfileId,
          candidate_id:this.apiProfile.candidate_id,
          city: this.apiProfile.city,
          country: this.apiProfile.country,
          createdAt: new Date(),
          email: this.apiProfile.email,
          firstName: this.apiProfile.firstName,
          lastName: this.apiProfile.lastName,
          phone: this.apiProfile.phone,
          profileTitle: this.addProfileForm.get('profileTitle')?.value,
          profileType: this.addProfileForm.get('profileType')?.value,
          recruitmentStatus: '',
          salaryExpectations: this.addProfileForm.get('remuneration')?.value,
          status: '',
          skills: this.addSkills()
        }
        this.isButtonDisabled = true;
        this.profileService.updateBasicProfileInformation(profile).subscribe({
          next: (data: ProfileDto) => {
            this.profile_id = data.id;
            alert('profile ' + profile.profileTitle + ' of candidate ' + profile.lastName + ' has been Updated with success ');
            this.showfilButtons = true;
            this.addProfileForm.reset();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
  }



  onSubmitCv() {
    if (this.selectedCv && this.profile_id) {
      this.profileService.saveProfileCv(this.selectedCv, this.profile_id).subscribe({
        next: (data) => {
          alert("cv has been saved with success");
          this.addCvForm.reset();
          this.savecv = false;
          this.showerro = undefined;
        },
        error: (err) => {
          this.showerro = "file Name Aleady Exists";
          console.log(err);
        }
      });
    }
    else {
      alert("no file selected ");
    }
  }

  onSubmitAudio() {
    if (this.selectedAudio && this.profile_id) {
      this.profileService.saveProfileCv(this.selectedAudio, this.profile_id).subscribe({
        next: (data) => {
          alert("Media has been saved with success");
          this.addCvForm.reset();
          this.saveaudio = false;
          this.showerro = undefined;
        },
        error: (err) => {
          this.showerro = "file Name Aleady Exists";
          console.log(err);
        }
      });
    }
    else {
      alert("no file selected ");
    }
  }


  displayAudioForm() {
    this.savecv = false;
    this.saveaudio = true;
  }
  displayCvForm() {
    this.savecv = true;
    this.saveaudio = false;
  }




  addSkills(): Skill[] {
    let skills: Skill[] = [];
    if (this.addProfileForm.get('skillName0')?.value && this.addProfileForm.get('year0')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName0')?.value,
        yearsOfExperience: this.addProfileForm.get('year0')?.value
      })
    }
    if (this.addProfileForm.get('skillName1')?.value && this.addProfileForm.get('year1')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName1')?.value,
        yearsOfExperience: this.addProfileForm.get('year1')?.value
      })
    }
    if (this.addProfileForm.get('skillName2')?.value && this.addProfileForm.get('year2')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName2')?.value,
        yearsOfExperience: this.addProfileForm.get('year2')?.value
      })
    }
    if (this.addProfileForm.get('skillName3')?.value && this.addProfileForm.get('year3')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName3')?.value,
        yearsOfExperience: this.addProfileForm.get('year3')?.value
      })
    }
    if (this.addProfileForm.get('skillName4')?.value && this.addProfileForm.get('year4')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName4')?.value,
        yearsOfExperience: this.addProfileForm.get('year4')?.value
      })
    }
    if (this.addProfileForm.get('skillName5')?.value && this.addProfileForm.get('year5')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName5')?.value,
        yearsOfExperience: this.addProfileForm.get('year5')?.value
      })
    }
    if (this.addProfileForm.get('skillName6')?.value && this.addProfileForm.get('year6')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName6')?.value,
        yearsOfExperience: this.addProfileForm.get('year6')?.value
      })
    }
    if (this.addProfileForm.get('skillName7')?.value && this.addProfileForm.get('year7')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName7')?.value,
        yearsOfExperience: this.addProfileForm.get('year7')?.value
      })
    }
    if (this.addProfileForm.get('skillName8')?.value && this.addProfileForm.get('year8')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName8')?.value,
        yearsOfExperience: this.addProfileForm.get('year8')?.value
      })
    }
    if (this.addProfileForm.get('skillName9')?.value && this.addProfileForm.get('year9')?.value) {
      skills.push({
        id: '',
        skillName: this.addProfileForm.get('skillName9')?.value,
        yearsOfExperience: this.addProfileForm.get('year9')?.value
      })
    }
    return skills;
  }

  rest() {
    this.addProfileForm.reset();
  }


}
