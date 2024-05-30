import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageableRecruitorDTO, RecruitorDto } from '../modules/recruitor.model';
import { Observable } from 'rxjs';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitormanagmentService {
  private backendHost:string = env.backendHost;


  constructor( private http : HttpClient) { }

  public saveRecruitor(recrutor:RecruitorDto):Observable<RecruitorDto>{
    return this.http.post<RecruitorDto>(this.backendHost+"/PERSONSERVICE/recruitor/save",recrutor);
  }

  public getAllRecruitors():Observable<RecruitorDto[]>{
    return this.http.get<RecruitorDto[]>(this.backendHost+"/PERSONSERVICE/recruitor/recruitors")
  }

  
  public updateRecruitor(recruitor: RecruitorDto): Observable<RecruitorDto> {
    return this.http.post<RecruitorDto>(`${this.backendHost}/PERSONSERVICE/recruitor/updaterecrutor`, recruitor);
  }
  public getrecruitorbyid(recruitor: string ): Observable<RecruitorDto> {
    return this.http.get<RecruitorDto>(`${this.backendHost}/PERSONSERVICE/recruitor/`+ recruitor);
  }
  public getRecruitersPagination(kw : string,page: number=0,size: number=3):Observable<PageableRecruitorDTO>{
    return this.http.get<PageableRecruitorDTO>(this.backendHost+"/PERSONSERVICE/recruitor/recruitorspaginable?page="+page+"&size="+size+"&keyword="+kw);
  }
  public filterRecruitorsByCompany(company_id: String):Observable<RecruitorDto[]>{
    return this.http.get<RecruitorDto[]>(this.backendHost+"/PERSONSERVICE/recruitor/company/"+company_id+"/recruitorsnopagination");
  }

  public getRecruitorByUserId(userid:string):Observable<RecruitorDto>{
    return this.http.get<RecruitorDto>(this.backendHost+"/PERSONSERVICE/recruitor/user/"+userid);
  }
}
