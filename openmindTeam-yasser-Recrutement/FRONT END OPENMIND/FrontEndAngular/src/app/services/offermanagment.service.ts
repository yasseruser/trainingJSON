import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferDto, PageableOfferDto } from '../modules/offer.modul';
import { RecruitmentProcess } from '../modules/applay.model';
import { PageableApplicationDto } from '../modules/application.modile';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffermanagmentService {

  private backendHost:string = env.backendHost;

  constructor(private http: HttpClient) { }

  public getOffersByCompany(company_id : String, page : number, size : number):Observable<PageableOfferDto>{
    return this.http.get<PageableOfferDto>(this.backendHost+"/OFFERSERVICE/offer/company/"+company_id+"/offers?page="+page+"&size="+size);
  }
//this function returns offers by searsh
  public getOfferOrderByCreatedDate(keywor:string,page:number, size:number):Observable<PageableOfferDto>{
    return this.http.get<PageableOfferDto>(this.backendHost+"/OFFERSERVICE/offer/offers?page="+page+"&size="+size+"&keyword="+keywor);
  }
//but thuis order by creayed date
  public getOfferOrderByCreatedDateoriginal(page:number, size:number):Observable<PageableOfferDto>{
    return this.http.get<PageableOfferDto>(this.backendHost+"/OFFERSERVICE/offer/offersnosearsh?page="+page+"&size="+size);
  }

  public getOfferByValidator(validatorId:string,page:number, size:number):Observable<PageableOfferDto>{
    return this.http.get<PageableOfferDto>(this.backendHost+"/OFFERSERVICE/offer/offers/of/"+validatorId+"/validator?page="+page+"&size="+size);
  }

  public getOfferByRecruitor(recruitorId:string,page:number, size:number):Observable<PageableOfferDto>{
    return this.http.get<PageableOfferDto>(this.backendHost+"/OFFERSERVICE/offer/offers/of/"+recruitorId+"/recruitor?page="+page+"&size="+size);
  }

  public getOffernopagination():Observable<OfferDto[]>{
    return this.http.get<OfferDto[]>(this.backendHost+"/OFFERSERVICE/offer/offersnopagination");
  }

  public saveOffer(offer:OfferDto): Observable<OfferDto>{
    return this.http.post<OfferDto>(this.backendHost+"/OFFERSERVICE/offer/saveoffer",offer);
  }

  public updateOffer(offer:OfferDto): Observable<OfferDto>{
    return this.http.post<OfferDto>(this.backendHost+"/OFFERSERVICE/offer/updateoffer",offer);
  }

  public uploadFile(file:File,offer_id:string):Observable<any>{
    const formdata=new FormData();
    formdata.append("file",file);
    formdata.append('offer_id',offer_id);
    return this.http.post<any>(this.backendHost+"/OFFERSERVICE/offer/upload",formdata);
  }

  public saveOfferValidator(offer:string,validator:string):Observable<any>{
    let data = {
      offer_id:offer,
      validator_id:validator
    }
    return this.http.post<any>(this.backendHost+"/OFFERSERVICE/offer/savevalidatoroffer",data);
  }

  public saveOfferRecruitor(offer:string,recruitor:string):Observable<any>{
    let data = {
      offer_id:offer,
      recruitor_id:recruitor
    }
    return this.http.post<any>(this.backendHost+"/OFFERSERVICE/offer/saverecruitoroffer",data);
  }

  public getOfferById(id:string):Observable<OfferDto>{
    return this.http.get<OfferDto>(this.backendHost+"/OFFERSERVICE/offer/"+id);
  }

  public applaytoAnOffer(recruitmentPrecess:RecruitmentProcess):Observable<any>{
    return this.http.post<any>(this.backendHost+"/OFFERSERVICE/offer/applay",recruitmentPrecess);
  }
  public applaytoAnOfferAny(recruitmentPrecess:any):Observable<any>{
    return this.http.post<any>(this.backendHost+"/OFFERSERVICE/offer/applay",recruitmentPrecess);
  }
  public applaytoAnOfferAnyHr(recruitmentPrecess:any):Observable<any>{
    return this.http.post<any>(this.backendHost+"/OFFERSERVICE/offer/hr/applay",recruitmentPrecess);
  }
  public applaytoAnOfferAnybyRecruitor(recruitmentPrecess:any):Observable<any>{
    return this.http.post<any>(this.backendHost+"/OFFERSERVICE/offer/recruitor/applay",recruitmentPrecess);
  }
  public applaytoAnOfferAnybyValidator(recruitmentPrecess:any):Observable<any>{
    return this.http.post<any>(this.backendHost+"/OFFERSERVICE/offer/validator/applay",recruitmentPrecess);
  }
  public getApplayByProfileOfferIds(profile_id:string,ofer_id:string):Observable<RecruitmentProcess>{
    return this.http.get<RecruitmentProcess>(this.backendHost+"/OFFERSERVICE/offer/applay/"+ofer_id+"/profile/"+profile_id);
  }

  public getApplicationOfAnProfile(profile_id:string,page:number,size:number):Observable<PageableApplicationDto>{
    return this.http.get<PageableApplicationDto>(this.backendHost+'/OFFERSERVICE/offer/profile/'+profile_id+'/applications?page='+page+'&size='+size);
  }

}
