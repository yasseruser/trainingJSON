import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecruitormanagmentService } from '../services/recruitormanagment.service';
import { PageableRecruitorDTO } from '../modules/recruitor.model';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';

@Component({
  selector: 'app-recruitorlist',
  templateUrl: './recruitorlist.component.html',
  styleUrl: './recruitorlist.component.css'
})
export class RecruitorlistComponent {

  
  recruiters!: PageableRecruitorDTO;
  currentPage: number = 0;
  pageSize: number = 10;
  errorMessage: string = '';
  keyword: string = '';
  searchFormGroup!: FormGroup;

  constructor(private authservice:AuthenticationmanagmentserviceService,private fb: FormBuilder, private recruiterService: RecruitormanagmentService) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      searchForRecruiter: this.fb.control(''),
    });
    this.getRecruiters('', this.currentPage, this.pageSize);
    this.searchFormGroup.get('searchForRecruiter')?.valueChanges.subscribe(value => {
      this.keyword = value;
      this.getRecruiters(value, this.currentPage, this.pageSize);
    });
  }

  getRecruiters(kw: string, page: number, size: number){
    this.recruiterService.getRecruitersPagination(kw, page, size)
      .subscribe(
        {
          next: (data) => {
            this.recruiters = data;
          },
          error: (err) => {
            console.log(err);
          }
        }
      );
  }

  onSearch(): void {
    this.currentPage = 0; // Reset page to 0 when performing a new search
    this.getRecruiters("", this.currentPage, this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.recruiters.totalPages - 1) {
      this.currentPage++;
      this.getRecruiters(this.keyword, this.currentPage, this.pageSize);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getRecruiters(this.keyword, this.currentPage, this.pageSize);
    }
  }


  LogOut(){
    this.authservice.LogOut();
  }

}
