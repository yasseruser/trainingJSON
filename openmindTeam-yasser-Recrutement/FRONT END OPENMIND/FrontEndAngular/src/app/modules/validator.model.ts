import { CompanyDto } from "./company.model";
import { OfferDto } from "./offer.modul";

export interface ValidatorDto {
    id: string;
    firstName: string;
    lastName: string;
    createdDate?: Date;
    phone: string;
    city: string;
    country: string;
    email: string;
    offer_title?: string;
    companyName?: string;
    company_id: string; // for post methods
    companyid?: string; // this variavle just for get methods
    companyDto?:CompanyDto;
    offerDto?:OfferDto;
    userId?:string;
}


export interface PageableValidatorDTO {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    validatorDtos: ValidatorDto[];
}