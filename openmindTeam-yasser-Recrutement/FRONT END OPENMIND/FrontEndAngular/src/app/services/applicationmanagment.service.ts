import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableApplicationDto } from '../modules/application.modile';
import { RecruitmentProcess } from '../modules/applay.model';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationmanagmentService {

  private backendHost:string=env.backendHost;

  constructor(private http:HttpClient) { }

  public getAppliationsByOffer(profileTitle:string,tag:string,offer_id:string,page:number,size:number):Observable<PageableApplicationDto>{
    return this.http.get<PageableApplicationDto>(this.backendHost+"/OFFERSERVICE/offer/"+offer_id+"/applications?page="+page+"&size="+size+"&tag="+tag+"&profile="+profileTitle);
}

  public getAppliationsByOfferValidatedBYRecruitor(profileTitle:string,tag:string,offer_id:string,page:number,size:number):Observable<PageableApplicationDto>{
    return this.http.get<PageableApplicationDto>(this.backendHost+"/OFFERSERVICE/offer/"+offer_id+"/applications/validatedbyreccruitor?page="+page+"&size="+size+"&tag="+tag+"&profile="+profileTitle);
}

public getAppliationsByOfferValidatedByValidator(profileTitle:string,tag:string,offer_id:string,page:number,size:number):Observable<PageableApplicationDto>{
  return this.http.get<PageableApplicationDto>(this.backendHost+"/OFFERSERVICE/offer/"+offer_id+"/applications/validatedbyvalidator?page="+page+"&size="+size+"&tag="+tag+"&profile="+profileTitle);
}

  public isProfileAssociatedToOffer(offer_id:string,profile_id:string):Observable<any>{
    return this.http.get<any>(this.backendHost+"/OFFERSERVICE/offer/is/"+profile_id+"/associated/"+offer_id);
  }

  public deleteAnApplication(recruitmentProcess:RecruitmentProcess):Observable<any>{
    return this.http.delete<any>(this.backendHost+"/OFFERSERVICE/offer/application/delete",{body:recruitmentProcess});
  }

}
