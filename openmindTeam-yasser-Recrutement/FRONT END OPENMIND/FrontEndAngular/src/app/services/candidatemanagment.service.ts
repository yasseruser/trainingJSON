import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateDto, PageableCandidateDTO } from '../modules/candidate.model';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatemanagmentService {

  private backendHost:string = env.backendHost;
  constructor(private http : HttpClient) { }

  public getCandidates(page: number=0,size: number=3):Observable<PageableCandidateDTO>{
    return this.http.get<PageableCandidateDTO>(this.backendHost+"/PERSONSERVICE/candidate/company/candidates?page="+page+"&size="+size);
  }

  public getCandidateById(id:string):Observable<CandidateDto>{
    return this.http.get<CandidateDto>(this.backendHost+"/PERSONSERVICE/candidate/"+id);
  }

  public getCandidateByUserId(userid:string):Observable<CandidateDto>{
    return this.http.get<CandidateDto>(this.backendHost+"/PERSONSERVICE/candidate/user/"+userid);
  }

  
  public getCandidatesPagination(kw : string,page: number=0,size: number=3):Observable<PageableCandidateDTO>{
    return this.http.get<PageableCandidateDTO>(this.backendHost+"/PERSONSERVICE/candidate/company/candidates?page="+page+"&size="+size+"&keyword="+kw);
  }

  public getCandidateByName(keywor: string):Observable<CandidateDto[]>{
    return this.http.get<CandidateDto[]>(this.backendHost+"/PERSONSERVICE/candidate/filterbylastname?keyword="+keywor);
  }

  public saveCandidats(candidats : CandidateDto):Observable<CandidateDto>{
    return this.http.post<CandidateDto>(this.backendHost+"/PERSONSERVICE/candidate/savecandidate",candidats);
  }
  public updateCandidats(candidats : CandidateDto):Observable<CandidateDto>{
    return this.http.post<CandidateDto>(this.backendHost+"/PERSONSERVICE/candidate/updatecandidate",candidats);
  }

}
