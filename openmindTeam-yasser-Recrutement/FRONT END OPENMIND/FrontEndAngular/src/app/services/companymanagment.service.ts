import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyDto, CurrencyCountry, PageableCompanyDTO } from '../modules/company.model';
import { EmailFormat } from '../modules/emailformat.model';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanymanagmentService {

  private backendHost:string = env.backendHost;
  constructor(private http : HttpClient) { }
  public getCompaniesByName(keyword:string):Observable<CompanyDto[]>{
    return this.http.get<CompanyDto[]>(this.backendHost+"/COMPANYSERVICE/company/companies?keyword="+keyword);
  }

  public getCompanyById(id:String):Observable<CompanyDto>{
    return this.http.get<CompanyDto>(this.backendHost+"/COMPANYSERVICE/company/"+id);
  }

  public saveCompany(company : CompanyDto):Observable<CompanyDto>{
    return this.http.post<CompanyDto>(this.backendHost+"/COMPANYSERVICE/company/savecompany",company);
  }

  public  getCountries():Observable<CurrencyCountry[]>{
    return this.http.get<CurrencyCountry[]>(this.backendHost+"/COMPANYSERVICE/company/countries");
  }

  public  getCurrencyBuCountry(country:string):Observable<CurrencyCountry[]>{
    return this.http.get<CurrencyCountry[]>(this.backendHost+"/COMPANYSERVICE/company/countries/"+country);
  }

  public getCompanyPagination(kw : string,page: number=0,size: number=3):Observable<PageableCompanyDTO>{
    return this.http.get<PageableCompanyDTO>(this.backendHost+"/COMPANYSERVICE/company/companypaginable?page="+page+"&size="+size+"&keyword="+kw);
  }
  public updateCompany(company: CompanyDto): Observable<CompanyDto> {
    return this.http.post<CompanyDto>(this.backendHost+"/COMPANYSERVICE/company/updatecompany", company);
  }

  public senMail(email:EmailFormat):Observable<any>{
    return this.http.post<any>(this.backendHost+'/COMPANYSERVICE/mail/send',email);
  }
}
