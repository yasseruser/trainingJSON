import { Component } from '@angular/core';
import { CandidatemanagmentService } from '../services/candidatemanagment.service';
import { PageableCandidateDTO } from '../modules/candidate.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationmanagmentserviceService } from '../services/authenticationmanagmentservice.service';

@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrl: './candidatelist.component.css'
})
export class CandidatelistComponent {

  candidates!: PageableCandidateDTO;
  currentPage: number = 0;
  pageSize: number = 10;
  errorMessage: string = '';
  keyword: string = '';
  searchFormGroup!:FormGroup;

  constructor(private auths : AuthenticationmanagmentserviceService,private fb : FormBuilder,private candidateService: CandidatemanagmentService) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      searchforcandidate:this.fb.control(''),
    });
    this.getCandidates('',this.currentPage,this.pageSize);
    this.searchFormGroup.get('searchforcandidate')?.valueChanges.subscribe(value => {
      this.keyword=value;
      this.getCandidates(value,this.currentPage,this.pageSize);
    });
  }

  getCandidates(kw : string , page:number,size:number){
      this.candidateService.getCandidatesPagination(kw,page,size)
        .subscribe(
          {
            next:(data)=>{
              this.candidates=data;
            },
            error:(err)=>{
              console.log(err);
            }
          }
        ); 
  }

  onSearch(): void {
    this.currentPage = 0; // Reset page to 0 when performing a new search
    this.getCandidates("",this.currentPage,this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.candidates.totalPages - 1) {
      this.currentPage++;
      this.getCandidates(this.keyword,this.currentPage,this.pageSize);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getCandidates(this.keyword,this.currentPage,this.pageSize);
    }
  }


  LogOut(){
    this.auths.LogOut();
  }

}
