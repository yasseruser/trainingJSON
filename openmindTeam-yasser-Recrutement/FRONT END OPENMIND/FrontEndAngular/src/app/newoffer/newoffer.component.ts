import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffermanagmentService } from '../services/offermanagment.service';
import { OfferDto } from '../modules/offer.modul'
import { CompanymanagmentService } from '../services/companymanagment.service';
import { ValidatormanagmentService } from '../services/validatormanagment.service';
import { Observable, catchError, throwError } from 'rxjs';
import { ValidatorDto } from '../modules/validator.model';
import { CompanyDto, CurrencyCountry } from '../modules/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruitorDto } from '../modules/recruitor.model';
import { RecruitormanagmentService } from '../services/recruitormanagment.service';

@Component({
  selector: 'app-newoffer',
  templateUrl: './newoffer.component.html',
  styleUrl: './newoffer.component.css'
})
export class NewofferComponent {
  
  addOfferForm!: FormGroup;
  addFile!: FormGroup;
  validatorsDtos!: Observable<ValidatorDto[]>;
  recruitorDtos!: Observable<RecruitorDto[]>;
  selectedValidators: string[] = [];
  selectedRecruitors: string[] = [];
  selectedcompany: string = "";
  companys!: Observable<CompanyDto[]>;
  remuneration!: number;
  validator !: ValidatorDto;
  validator_ids: string[] = []
  companies !: CompanyDto[];
  selecedcompanys: string[] = [];
  //selectedFile!: File;
  companyid !: string;
  //addFileStatus: boolean = false;
  savedOffer!: OfferDto;
  isButtonDisabled: boolean = true;
  offerLinkId !: string;
  updateOffer!: OfferDto;
  countries!:Observable<CurrencyCountry[]>;
  currency!:string;




  constructor(private recruitorservice:RecruitormanagmentService,private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private offerservice: OffermanagmentService, private companyservice: CompanymanagmentService, private validatorservice: ValidatormanagmentService) { }

  ngOnInit(): void {
    this.addOfferForm = this.fb.group({
      offerTitle: this.fb.control("", Validators.required),
      addressLine1: this.fb.control("", Validators.required),
      addressLine2: this.fb.control("",),
      country: this.fb.control("", Validators.required),
      state: this.fb.control(""),
      city: this.fb.control("", Validators.required),
      zipCode: this.fb.control(""),
      remuneration: this.fb.control(null),
      desiredProfile: this.fb.control("", Validators.required),
      offerDesc: this.fb.control("", Validators.required),
      keys: this.fb.control("", Validators.required),
      benefits: this.fb.control("", Validators.required),
      selectedCompany: ['', [Validators.required]],
      selectedValidators: ['', [Validators.required]],
      selectedRecruitors: ['', [Validators.required]],
      status: this.fb.control(null, Validators.required),
    });

    // update offer process
    if (this.route.snapshot.params['offerid']) {
      this.offerLinkId = this.route.snapshot.params['offerid'];
      this.offerservice.getOfferById(this.offerLinkId).subscribe({
        next: (updateofferlink: OfferDto) => {
          this.updateOffer = updateofferlink;
          this.addOfferForm = this.fb.group({
            offerTitle: this.fb.control(this.updateOffer.offer_title, Validators.required),
            addressLine1: this.fb.control("", Validators.required),
            addressLine2: this.fb.control("",),
            country: this.fb.control("", Validators.required),
            state: this.fb.control(""),
            city: this.fb.control("", Validators.required),
            zipCode: this.fb.control(""),
            remuneration: this.fb.control(this.updateOffer.remuneration),
            desiredProfile: this.fb.control(this.updateOffer.desired_profile, Validators.required),
            offerDesc: this.fb.control(this.updateOffer.offer_description, Validators.required),
            keys: this.fb.control(this.updateOffer.key_points, Validators.required),
            benefits: this.fb.control(this.updateOffer.benefits, Validators.required),
            selectedCompany: ['', [Validators.required]],
            selectedValidators: ['', [Validators.required]],
            selectedRecruitors: ['', [Validators.required]],
            status: this.fb.control(this.updateOffer.offer_availability, Validators.required),
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    //end of update offer process
    this.countries=this.companyservice.getCountries().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
    this.companys = this.companyservice.getCompaniesByName('').pipe(
      catchError(err => {
        return throwError(err);
      })
    );

    this.addFile = this.fb.group(
      {
        offerFile: this.fb.control(null, Validators.required),
      }
    );
  }

  onChangeRemuneration(e: any) {
    if(this.addOfferForm.get('country')?.value)
    this.companyservice.getCurrencyBuCountry(this.addOfferForm.get('country')?.value).subscribe({
      next:(data)=>{
          this.currency=data[0].currency;
          this.remuneration = this.addOfferForm.get('remuneration')?.value
      }
    });
  }

  onSelectValidators(e: any) {
    const selectedArray = this.addOfferForm.get('selectedValidators')?.value as string[];
    if (selectedArray.includes(e.target.value)) {
      this.selectedValidators = selectedArray.filter(item => item !== e.target.value);
    } else {
      this.selectedValidators.push(e.target.value);
    }
  }

  onSelectRecruitors(e: any) {
    const selectedArray = this.addOfferForm.get('selectedRecruitors')?.value as string[];
    if (selectedArray.includes(e.target.value)) {
      this.selectedRecruitors = selectedArray.filter(item => item !== e.target.value);
    } else {
      this.selectedRecruitors.push(e.target.value);
    }
  }

  onSelectedCompany(e: any) {
    const selectedArray = this.addOfferForm.get('selectedCompany')?.value as string[];
    if (selectedArray.includes(e.target.value)) {
      this.selecedcompanys = selectedArray.filter(item => item !== e.target.value);
    } else {
      this.selecedcompanys.push(e.target.value);
    }
  }



  fillOutInfosByCompany(e: any) {
    let keywod: any = this.addOfferForm.get('selectedCompany')?.value;
    this.companyservice.getCompaniesByName(keywod).subscribe(
      {
        next: (data: CompanyDto[]) => {
          this.companies = data;
          data.forEach(comp => {
            this.validatorsDtos = this.validatorservice.filterValidatorsByCompany(comp.id);
            this.recruitorDtos = this.recruitorservice.filterRecruitorsByCompany(comp.id);
            this.companyid = comp.id;
          });
        }
      }
    );
  }




  handleSaveOffer() {
    let localisation: string = this.addOfferForm.value.addressLine1 + " " + this.addOfferForm.value.addressLine2 + " " + this.addOfferForm.value.city + " " + this.addOfferForm.value.state + " " + this.addOfferForm.value.country + " " + this.addOfferForm.value.zipCode
    if ((!this.updateOffer) && (!this.offerLinkId)) {
      let offer: any = {
        id: "",
        offer_title: this.addOfferForm.value.offerTitle,
        localisation: localisation,
        benefits: this.addOfferForm.value.benefits,
        desired_profile: this.addOfferForm.value.desiredProfile,
        key_points: this.addOfferForm.value.keys,
        offer_availability: this.addOfferForm.value.status,
        remuneration: this.addOfferForm.value.remuneration,
        offer_description: this.addOfferForm.value.offerDesc,
        company_id: this.companyid,
        currency:this.currency
      };
      //saveoffer
      this.offerservice.saveOffer(offer).subscribe({
        next: (data) => {
          if(this.addOfferForm.get('selectedRecruitors')?.value){
            this.offerservice.saveOfferRecruitor(data.id,this.addOfferForm.get('selectedRecruitors')?.value).subscribe({
              next:(dt)=>{
                console.log('recruitors attached to the offer with success');
              }
            });
          }
          
          let i = 0;
          this.validator_ids.forEach(idv => {
            this.offerservice.saveOfferValidator(data.id, idv).subscribe(
              {
                next: (jsondata) => {
                  if (i == this.validator_ids.length) {
                    alert('offer has benn saved with success');
                    this.router.navigateByUrl('/hr/offers');
                  }
                  i++;
                },
                error: (e) => {
                  console.log(e);
                }
              }
            );
          });
          this.savedOffer = data;
          this.addOfferForm.reset();
          this.validator_ids = [];
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      let offer: any = {
        id: this.offerLinkId,
        offer_title: this.addOfferForm.value.offerTitle,
        localisation: localisation,
        benefits: this.addOfferForm.value.benefits,
        desired_profile: this.addOfferForm.value.desiredProfile,
        key_points: this.addOfferForm.value.keys,
        offer_availability: this.addOfferForm.value.status,
        remuneration: this.addOfferForm.value.remuneration,
        offer_description: this.addOfferForm.value.offerDesc,
        company_id: this.companyid,
        currency:this.currency
      };
      //updateOffer
      this.offerservice.updateOffer(offer).subscribe({
        next: (data) => {
          let i1 = 0;
          if(this.addOfferForm.get('selectedRecruitors')?.value){
            this.offerservice.saveOfferRecruitor(data.id,this.addOfferForm.get('selectedRecruitors')?.value).subscribe({
              next:(dt)=>{
                console.log('recruitors attached to the offer with success');
              }
            });
          }
          this.validator_ids.forEach(idv => {
            this.offerservice.saveOfferValidator(data.id, idv).subscribe(
              {
                next: (jsondata) => {
                  if (i1 == this.validator_ids.length) {
                    alert('offer has benn Updated with success');
                    this.router.navigateByUrl('/hr/offers');
                  }
                  i1++;
                },
                error: (e) => {
                  console.log(e);
                }
              }
            );
          });
          this.savedOffer = data;
          this.addOfferForm.reset();
          this.validator_ids = [];
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.addOfferForm.valid) {
      false;
    } else {
      this.addOfferForm.get('selectedValidators')?.value.forEach((validname: any) => {
        let firstname = validname.split(' ')[0];
        let lastname = validname.split(' ')[1];
        this.validatorservice.getValidatorByName(firstname, lastname).subscribe(
          {
            next: (data: ValidatorDto) => {
              this.validator_ids.push(data.id);
            },
            error: (err) => {
              console.log(err);
            }
          }
        );
      });
      this.handleSaveOffer();
    }
  }

  rest() {
    this.addOfferForm.reset();
  }

  goToAddValidato() {
    if (this.companies) {
      this.router.navigateByUrl("/hr/savevalidator/" + this.companies[0].id, { state: this.companies[0] });
    }
    else
      alert("select first an company.");
  }
  goToAddCompany() {
    this.router.navigateByUrl("/hr/savecompany");
  }

}
