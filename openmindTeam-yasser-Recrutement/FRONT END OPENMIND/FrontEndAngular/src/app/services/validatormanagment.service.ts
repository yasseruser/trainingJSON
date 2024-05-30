import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableValidatorDTO, ValidatorDto } from '../modules/validator.model';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidatormanagmentService {

  private backendHost:string=env.backendHost;
  constructor(private http : HttpClient) { }

  public getValidatorsBycompany(company_id: String, page:number =0,size:number=3):Observable<PageableValidatorDTO>{
    return this.http.get<PageableValidatorDTO>(this.backendHost+"/PERSONSERVICE/validator/company/"+company_id+"/validators?page="+page+"&size="+size);
  }
  public getValidatorsWithOfferDetailsAssociateToit(page:number,size:number):Observable<PageableValidatorDTO>{
    return this.http.get<PageableValidatorDTO>(this.backendHost+"/OFFERSERVICE/offer/validators?page="+page+"&size="+size);
  }
  public filterValidatorsByCompany(company_id: String):Observable<ValidatorDto[]>{
    return this.http.get<ValidatorDto[]>(this.backendHost+"/PERSONSERVICE/validator/company/"+company_id+"/validatorsnopagination");
  }

  public getValidatorByName(validatrorFirstName: String,vakidatorLastName : string):Observable<ValidatorDto>{
    let data={
      firstName : validatrorFirstName,
      lastName:vakidatorLastName
    }
    return this.http.post<ValidatorDto>(this.backendHost+"/PERSONSERVICE/validator/validatorbyname",data);
  }

  public saveValidator(validator : ValidatorDto):Observable<ValidatorDto>{
    return this.http.post<ValidatorDto>(this.backendHost+"/PERSONSERVICE/validator/savevalidator",validator);
  }
  public getvalidatorbyid(validator: string ): Observable<ValidatorDto> {
    return this.http.get<ValidatorDto>(this.backendHost+"/PERSONSERVICE/validator/"+validator);
  }
  public getValidatorsPagination(kw : string,page: number=0,size: number=3):Observable<PageableValidatorDTO>{
    return this.http.get<PageableValidatorDTO>(this.backendHost+"/PERSONSERVICE/validator/validators?page="+page+"&size="+size+"&keyword="+kw);
  }
  public updateValidator(validator: ValidatorDto): Observable<ValidatorDto> {
    return this.http.post<ValidatorDto>(this.backendHost+"/PERSONSERVICE/validator/updatevalidator", validator);
  }

  public getValidatorByUserId(userid:string):Observable<ValidatorDto>{
    return this.http.get<ValidatorDto>(this.backendHost+"/PERSONSERVICE/validator/user/"+userid);
  }
}
