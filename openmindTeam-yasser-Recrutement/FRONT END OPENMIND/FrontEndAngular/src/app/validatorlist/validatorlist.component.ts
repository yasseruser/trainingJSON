import { Component } from '@angular/core';
import { PageableValidatorDTO } from '../modules/validator.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatormanagmentService } from '../services/validatormanagment.service';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';

@Component({
  selector: 'app-validatorlist',
  templateUrl: './validatorlist.component.html',
  styleUrl: './validatorlist.component.css'
})
export class ValidatorlistComponent {
  validators!: PageableValidatorDTO;
  currentPage: number = 0;
  pageSize: number = 10;
  errorMessage: string = '';
  keyword: string = '';
  searchFormGroup!: FormGroup;

  constructor(private auths:AuthenticationmanagmentserviceService,private fb: FormBuilder, private validatorService: ValidatormanagmentService) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      searchForValidator: this.fb.control(''),
    });
    this.getValidators('', this.currentPage, this.pageSize);
    this.searchFormGroup.get('searchForValidator')?.valueChanges.subscribe(value => {
      this.keyword = value;
      this.getValidators(value, this.currentPage, this.pageSize);
    });
  }

  getValidators(keyword: string, page: number, size: number): void {
    this.validatorService.getValidatorsPagination(keyword, page, size)
      .subscribe(
        {
          next: (data) => {
            this.validators = data;
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = 'Failed to load validators.';
          }
        }
      );
  }


  nextPage(): void {
    if (this.currentPage < this.validators.totalPages - 1) {
      this.currentPage++;
      this.getValidators(this.keyword, this.currentPage, this.pageSize);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getValidators(this.keyword, this.currentPage, this.pageSize);
    }
  }

  LogOut(){
    this.auths.LogOut();
  }

}
