import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatemanagmentService } from '../services/candidatemanagment.service';
import { ProfilemanagmentService } from '../services/profilemanagment.service';
import { CandidateDto } from '../modules/candidate.model';
import { IntrviewData, ProfileDto, Skill } from '../modules/profile.model';
import { RecruitorDto } from '../modules/recruitor.model';
import { OfferDto } from '../modules/offer.modul';
import { OffermanagmentService } from '../services/offermanagment.service';
import { RecruitormanagmentService } from '../services/recruitormanagment.service';
import { RecruitmentProcess } from '../modules/applay.model';
import { ApplicationmanagmentService } from '../services/applicationmanagment.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  profile_id!: string;
  isButtonDisabled: boolean = false;
  showfilButtons: boolean = false;
  addProfileForm!: FormGroup;
  addCvForm!: FormGroup;
  addAudioForm!: FormGroup;

  candidates!: CandidateDto[];
  selectedCv!: File;
  selectedAudio!: File;
  remuneration!: number;
  showerro!: any;
  savecv: boolean = false;
  saveaudio: boolean = false;
  Profile !: ProfileDto;
  errmsjintrviewdata!: string;
  relocation!: string;
  quationbooleanshow: boolean = false;
  recruitors !: RecruitorDto[];
  offers!: OfferDto[];
  offer_id!: string;
  succesmsjapplay!: string;
  addInrviewForm!: FormGroup;
  savePreEntrviewFile: boolean = false;
  intrviewdataId!: string;
  inrviewdata!: IntrviewData;
  isAleadyAssocviatedToAnOffer: boolean = false;

  constructor(private applicationservice: ApplicationmanagmentService, private offerservice: OffermanagmentService, private route: ActivatedRoute, private recruitorservice: RecruitormanagmentService, private router: Router, private fb: FormBuilder, private candidateservice: CandidatemanagmentService, private profileService: ProfilemanagmentService) { }


  ngOnInit(): void {
    this.addProfileForm = this.fb.group({
      profileTitle: this.fb.control('', [Validators.required]),
      profileType: this.fb.control('', [Validators.required]),
      remuneration: this.fb.control(null),
      selectedCandidate: ['', [Validators.required]],
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
    this.candidateservice.getCandidateByName('').subscribe(
      {
        next: (data: CandidateDto[]) => {
          this.candidates = data;
        }
      }
    );
    this.addCvForm = this.fb.group({
      cv: this.fb.control(null),
    });
    this.addAudioForm = this.fb.group({
      audio: this.fb.control(null),
    });

    this.addInrviewForm = this.fb.group({
      linkdin: this.fb.control('', Validators.required),
      github: this.fb.control('', Validators.required),
      portfolio: this.fb.control('',),
      yourMotivationForChangePosition: this.fb.control('', Validators.required),
      PointsDefinedByClient: this.fb.control('', Validators.required),
      otherPoints: this.fb.control('', Validators.required),
      softSkills: this.fb.control('', Validators.required),
      expectations: this.fb.control('', Validators.required),
      trainingPlans: this.fb.control('', Validators.required),
      currentBenifits: this.fb.control('', Validators.required),
      desiredBenifits: this.fb.control('', Validators.required),
      currentSalary: this.fb.control(null, Validators.required),
      fixedSalary: this.fb.control(null, Validators.required),
      desiredSalary: this.fb.control(null, Validators.required),
      noticePeriodDuration: this.fb.control('', Validators.required),
      recruitor: this.fb.control('', Validators.required),
      offer: this.fb.control('', Validators.required),
      employedStatus: this.fb.control('', Validators.required),
      statusSearch: this.fb.control('', Validators.required),
      onGoingProcesses: this.fb.control('', Validators.required),
      progressLevel: this.fb.control('', Validators.required),
      relocation: this.fb.control('', Validators.required),
      mobilityArea: this.fb.control(''),
      quation: this.fb.control('', Validators.required),
      availabilityDate: this.fb.control(null, Validators.required),
      intrviewedVideoCallDate: this.fb.control(null, Validators.required),
      offerAssociated:this.fb.control('')
    });
    // Subscribe to value changes
    this.addInrviewForm.get('relocation')?.valueChanges.subscribe(value => {
      this.relocation = value;
      if (value === 'Yes')
        this.quationbooleanshow = true;
      else
        this.quationbooleanshow = false;
    })

    if (this.route.snapshot.params['profile_id']) {
      this.profile_id = this.route.snapshot.params['profile_id'];
      this.profileService.getProfileById(this.profile_id).subscribe({


        next: (data) => {
          this.Profile = data;
          this.addProfileForm = this.fb.group({
            profileTitle: this.fb.control(this.Profile.profileTitle, [Validators.required]),
            profileType: this.fb.control(this.Profile.profileType, [Validators.required]),
            remuneration: this.fb.control(this.Profile.salaryExpectations),
            selectedCandidate: [this.Profile.candidate_id, [Validators.required]],
            skillName0: this.fb.control(this.Profile.skills[0].skillName,Validators.required),
            year0: this.fb.control(this.Profile.skills[0].yearsOfExperience,Validators.required),
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
          if (data.intrviewData) {
            this.inrviewdata = data.intrviewData;
            this.intrviewdataId = data.intrviewData.id;
            this.addInrviewForm = this.fb.group({
              linkdin: this.fb.control(data.intrviewData.linkdin, Validators.required),
              github: this.fb.control(data.intrviewData.github, Validators.required),
              portfolio: this.fb.control(data.intrviewData.portfolio,),
              yourMotivationForChangePosition: this.fb.control(data.intrviewData.yourMotivationForChangePosition, Validators.required),
              PointsDefinedByClient: this.fb.control(data.intrviewData.pointsDefinedByClient, Validators.required),
              otherPoints: this.fb.control(data.intrviewData.otherPoints, Validators.required),
              softSkills: this.fb.control(data.intrviewData.softSkills, Validators.required),
              expectations: this.fb.control(data.intrviewData.expectations, Validators.required),
              trainingPlans: this.fb.control(data.intrviewData.trainingPlans, Validators.required),
              currentBenifits: this.fb.control(data.intrviewData.currentBenifits, Validators.required),
              desiredBenifits: this.fb.control(data.intrviewData.desiredBenifits, Validators.required),
              currentSalary: this.fb.control(data.intrviewData.currentSalary, Validators.required),
              fixedSalary: this.fb.control(data.intrviewData.fixedSalary, Validators.required),
              desiredSalary: this.fb.control(data.intrviewData.desiredSalary, Validators.required),
              noticePeriodDuration: this.fb.control(data.intrviewData.noticePeriodDuration, Validators.required),
              recruitor: this.fb.control('', Validators.required),
              offer: this.fb.control('', Validators.required),
              employedStatus: this.fb.control(data.intrviewData.employedStatus, Validators.required),
              statusSearch: this.fb.control(data.intrviewData.statusSearch, Validators.required),
              onGoingProcesses: this.fb.control(data.intrviewData.onGoingProcesses, Validators.required),
              progressLevel: this.fb.control(data.intrviewData.progressLevel, Validators.required),
              relocation: this.fb.control(data.intrviewData.relocation, Validators.required),
              mobilityArea: this.fb.control(''),
              quation: this.fb.control(data.intrviewData.quation, Validators.required),
              availabilityDate: this.fb.control(data.intrviewData.availabilityDate, Validators.required),
              intrviewedVideoCallDate: this.fb.control(data.intrviewData.intrviewedVideoCallDate, Validators.required),
            });
          }
        },
        error: (err) => {
          console.log(err);
          this.router.navigateByUrl('/hr/recources');
        }
      });



    }
    else {
      this.router.navigateByUrl('/hr/recources');
    }
  }


  onFileSelected(e: any) {
    const file: File = e.target.files[0];
    this.selectedCv = file;
  }

  onFileSelectedAudio(e: any) {
    const file: File = e.target.files[0];
    this.selectedAudio = file;
  }

  onChangeRemuneration(e: any) {
    this.remuneration = this.addProfileForm.get('remuneration')?.value
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

  onSubmitCv() {
    if (this.selectedCv && this.profile_id) {
      this.profileService.saveProfileCv(this.selectedCv, this.profile_id).subscribe({
        next: (data) => {
          alert("cv has been updated with success");
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
          alert("media has been updated with success");
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


  onSubmit(): void {
    if (!this.addProfileForm.valid) {
      false;
    } else {
      let selectedCandidateDtoObject: any = this.candidates.find(candidate => candidate.id === this.addProfileForm.get('selectedCandidate')?.value);
      let profile: any = {
        intrviewData: this.inrviewdata,
        id: this.profile_id,
        candidate_id: this.addProfileForm.get('selectedCandidate')?.value,
        city: selectedCandidateDtoObject.city,
        country: selectedCandidateDtoObject.country,
        createdAt: new Date(),
        email: selectedCandidateDtoObject.email,
        firstName: selectedCandidateDtoObject.firstName,
        lastName: selectedCandidateDtoObject.lastName,
        phone: selectedCandidateDtoObject.phone,
        profileTitle: this.addProfileForm.get('profileTitle')?.value,
        profileType: this.addProfileForm.get('profileType')?.value,
        recruitmentStatus: '',
        salaryExpectations: this.addProfileForm.get('remuneration')?.value,
        status: '',
        interviewFile: '',
        skills: this.addSkills()
      }
      this.profileService.updateBasicProfileInformation(profile).subscribe({
        next: (data: ProfileDto) => {
          this.profile_id = data.id;
          if(data.interviewFile)
            this.intrviewdataId=data.intrviewData.id;
          alert('profile ' + profile.profileTitle + ' of candidate ' + profile.lastName + ' has been Updated with success ');
          this.showfilButtons = true;
          this.addProfileForm.reset();
          this.isButtonDisabled = true;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }




  displayAudioForm() {
    this.savecv = false;
    this.saveaudio = true;
    this.savePreEntrviewFile = false;
  }
  displayCvForm() {
    this.savecv = true;
    this.saveaudio = false;
    this.savePreEntrviewFile = false;
  }

  displayIntrviewForm() {
    this.savecv = false;
    this.saveaudio = false;
    this.savePreEntrviewFile = true;
    this.recruitorservice.getAllRecruitors().subscribe({
      next: (data) => {
        this.recruitors = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.offerservice.getOffernopagination().subscribe({
      next: (data) => {
        this.offers = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  onSubmitPreIntrviewData() {
    if (this.profile_id) {
      let intrview: IntrviewData = {
        id: '',
        profile_id: this.profile_id,
        linkdin: this.addInrviewForm.get('linkdin')?.value,
        github: this.addInrviewForm.get('github')?.value,
        portfolio: this.addInrviewForm.get('portfolio')?.value,
        yourMotivationForChangePosition: this.addInrviewForm.get('yourMotivationForChangePosition')?.value,
        pointsDefinedByClient: this.addInrviewForm.get('PointsDefinedByClient')?.value,
        otherPoints: this.addInrviewForm.get('otherPoints')?.value,
        softSkills: this.addInrviewForm.get('softSkills')?.value,
        expectations: this.addInrviewForm.get('expectations')?.value,
        trainingPlans: this.addInrviewForm.get('trainingPlans')?.value,
        currentBenifits: this.addInrviewForm.get('currentBenifits')?.value,
        desiredBenifits: this.addInrviewForm.get('desiredBenifits')?.value,
        currentSalary: this.addInrviewForm.get('currentSalary')?.value,
        fixedSalary: this.addInrviewForm.get('fixedSalary')?.value,
        desiredSalary: this.addInrviewForm.get('desiredSalary')?.value,
        noticePeriodDuration: this.addInrviewForm.get('noticePeriodDuration')?.value,
        recruitorId: this.addInrviewForm.get('recruitor')?.value,
        employedStatus: this.addInrviewForm.get('employedStatus')?.value,
        statusSearch: this.addInrviewForm.get('statusSearch')?.value,
        onGoingProcesses: this.addInrviewForm.get('onGoingProcesses')?.value,
        progressLevel: this.addInrviewForm.get('progressLevel')?.value,
        relocation: this.addInrviewForm.get('relocation')?.value,
        mobilityArea: this.addInrviewForm.get('mobilityArea')?.value,
        quation: this.addInrviewForm.get('quation')?.value,
        availabilityDate: this.addInrviewForm.get('availabilityDate')?.value,
        intrviewedVideoCallDate: this.addInrviewForm.get('intrviewedVideoCallDate')?.value,
      }
      if (this.intrviewdataId) {
            intrview = {
          id: this.intrviewdataId,
          profile_id: this.profile_id,
          linkdin: this.addInrviewForm.get('linkdin')?.value,
          github: this.addInrviewForm.get('github')?.value,
          portfolio: this.addInrviewForm.get('portfolio')?.value,
          yourMotivationForChangePosition: this.addInrviewForm.get('yourMotivationForChangePosition')?.value,
          pointsDefinedByClient: this.addInrviewForm.get('PointsDefinedByClient')?.value,
          otherPoints: this.addInrviewForm.get('otherPoints')?.value,
          softSkills: this.addInrviewForm.get('softSkills')?.value,
          expectations: this.addInrviewForm.get('expectations')?.value,
          trainingPlans: this.addInrviewForm.get('trainingPlans')?.value,
          currentBenifits: this.addInrviewForm.get('currentBenifits')?.value,
          desiredBenifits: this.addInrviewForm.get('desiredBenifits')?.value,
          currentSalary: this.addInrviewForm.get('currentSalary')?.value,
          fixedSalary: this.addInrviewForm.get('fixedSalary')?.value,
          desiredSalary: this.addInrviewForm.get('desiredSalary')?.value,
          noticePeriodDuration: this.addInrviewForm.get('noticePeriodDuration')?.value,
          recruitorId: this.addInrviewForm.get('recruitor')?.value,
          employedStatus: this.addInrviewForm.get('employedStatus')?.value,
          statusSearch: this.addInrviewForm.get('statusSearch')?.value,
          onGoingProcesses: this.addInrviewForm.get('onGoingProcesses')?.value,
          progressLevel: this.addInrviewForm.get('progressLevel')?.value,
          relocation: this.addInrviewForm.get('relocation')?.value,
          mobilityArea: this.addInrviewForm.get('mobilityArea')?.value,
          quation: this.addInrviewForm.get('quation')?.value,
          availabilityDate: this.addInrviewForm.get('availabilityDate')?.value,
          intrviewedVideoCallDate: this.addInrviewForm.get('intrviewedVideoCallDate')?.value,
        }
      }
      this.profileService.saveIntrviewData(intrview).subscribe({
        next: (data) => {
          //get recruitment process 
          if (this.addInrviewForm.get('offer')?.value) {
            this.applicationservice.isProfileAssociatedToOffer(this.addInrviewForm.get('offer')?.value, this.profile_id).subscribe({
              next: (isit) => {
                this.isAleadyAssocviatedToAnOffer = isit.isIt;
                if (this.isAleadyAssocviatedToAnOffer) {  
                  this.isAleadyAssocviatedToAnOffer = false;
                  this.addInrviewForm.reset();
                }
                else {
                  let recruitmentprocess: RecruitmentProcess = {
                    id: '',
                    offerid: this.addInrviewForm.get('offer')?.value,
                    profileid: this.profile_id,
                    tag: 'initialisation'
                  }
                  this.offerservice.applaytoAnOffer(recruitmentprocess).subscribe({
                    next: (data) => {
                      this.succesmsjapplay = 'profile has been pushed to the offer with success ';
                      this.addInrviewForm.reset();
                    },
                    error: (err) => {
                      this.succesmsjapplay = err;
                    }
                  });
                }
              },
              error: (err) => {
              }
            });
          }
          alert('intrview Data has been Saved With Success');
          this.savePreEntrviewFile = false;
        },
        error: (err) => {
          this.errmsjintrviewdata = err;
        }
      });
    }
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

  gotoCandidate() {
    this.router.navigateByUrl("/hr/savecandidate");
  }

}
