import { Component } from '@angular/core';
import { PageableCompanyDTO } from '../modules/company.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanymanagmentService } from '../services/companymanagment.service';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrl: './companylist.component.css'
})
export class CompanylistComponent {
  companies!: PageableCompanyDTO;
  currentPage: number = 0;
  pageSize: number = 10;
  errorMessage: string = '';
  currency!: string;
  keyword: string = '';
  searchFormGroup!: FormGroup;

  constructor(private auths:AuthenticationmanagmentserviceService,private fb: FormBuilder, private companyService: CompanymanagmentService) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      searchForCompany: this.fb.control(''),
    });
    this.getCompany('', this.currentPage, this.pageSize);
    this.searchFormGroup.get('searchForCompany')?.valueChanges.subscribe(value => {
      this.keyword = value;
      this.getCompany(value, this.currentPage, this.pageSize);
    });
  }

  getCompany(kw: string, page: number, size: number){
    this.companyService.getCompanyPagination(kw, page, size)
      .subscribe(
        {
          next: (data) => {
            this.companies = data;
          },
          error: (err) => {
            console.log(err);
          }
        }
      );
  }


  nextPage(): void {
    if (this.currentPage < this.companies.totalPages - 1) {
      this.currentPage++;
      this.getCompany(this.keyword, this.currentPage, this.pageSize);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getCompany(this.keyword, this.currentPage, this.pageSize);
    }
  }

  LogOut(){
    this.auths.LogOut();
  }
  

}
