import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { CompanyDto } from '../modules/company.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newcompany',
  templateUrl: './newcompany.component.html',
  styleUrl: './newcompany.component.css'
})
export class NewcompanyComponent {
  formcompany !: FormGroup;
  updatecompany!: CompanyDto;
  errorMessage!: string;
  companyId!: string;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private companyservice: CompanymanagmentService) { }
  ngOnInit(): void {
    this.formcompany = this.fb.group({
      name: this.fb.control('', Validators.required),
      sector: this.fb.control('', Validators.required),
      infos: this.fb.control('', Validators.required),
      site: this.fb.control('', Validators.required),
      address: this.fb.control('', Validators.required),
      contact: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.email, Validators.required]),
    });

    if (this.route.snapshot.params['companyid']) {
      this.companyId = this.route.snapshot.params['companyid'];
      this.companyservice.getCompanyById(this.companyId).subscribe({
        next: (data) => {
          this.updatecompany = data;
          this.formcompany = this.fb.group({
            name: [this.updatecompany.name, Validators.required],
            sector: [this.updatecompany.sector, Validators.required],
            infos: [this.updatecompany.informations, Validators.required],
            site: [this.updatecompany.webSiteLink, Validators.required],
            address: [this.updatecompany.address, Validators.required],
            contact: [this.updatecompany.contact, Validators.required],
            country: [this.updatecompany.country, Validators.required],
            email: [this.updatecompany.email, [Validators.email, Validators.required]],
          });
        },
      });
    }
  }


  onSubmit(): void {
    if (this.formcompany.valid) {
      if (this.companyId) {
        const company: any = {
          id: this.companyId,
          name: this.formcompany.get('name')?.value,
          sector: this.formcompany.get('sector')?.value,
          informations: this.formcompany.get('infos')?.value,
          webSiteLink: this.formcompany.get('site')?.value,
          address: this.formcompany.get('address')?.value,
          contact: this.formcompany.get('contact')?.value,
          country: this.formcompany.get('country')?.value,
          email: this.formcompany.get('email')?.value,
        };
        this.updateCompany(company);

      }

      else {
        const company: any = {
          id: '',
          name: this.formcompany.get('name')?.value,
          sector: this.formcompany.get('sector')?.value,
          informations: this.formcompany.get('infos')?.value,
          webSiteLink: this.formcompany.get('site')?.value,
          address: this.formcompany.get('address')?.value,
          contact: this.formcompany.get('contact')?.value,
          country: this.formcompany.get('country')?.value,
          email: this.formcompany.get('email')?.value,
        };
        this.saveCompany(company)
      }
    } else {
      alert('invalide Form');
    }
  }
  saveCompany(company: CompanyDto): void {
    this.companyservice.saveCompany(company).subscribe({
      next: (data) => {
        alert('Company ' + data.name + ' has been saved successfully');
        this.router.navigateByUrl('/hr/companies');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  updateCompany(company: CompanyDto): void {
    this.companyservice.updateCompany(company).subscribe({
      next: (data: CompanyDto) => {
        alert('Company ' + data.name + ' has been updated successfully');
        this.router.navigateByUrl('/hr/companies');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
