import { CompanyDto } from "./company.model";
import { RecruitorDto } from "./recruitor.model";
import { ValidatorDto } from "./validator.model";

export interface  OfferDto {
    id: string;
    offer_title: string;
    localisation: string;
    remuneration: number;
    offer_availability: boolean;
    desired_profile: string;
    offer_description: string;
    key_points: string;
    benefits: string;
    createdat:string;
    companyid:string;
    companyName:string;
    currency:string;
    validators : ValidatorDto[];
    recruitors : RecruitorDto[];
    company:CompanyDto;
}



export interface PageableOfferDto {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    offerDtos: OfferDto[];
}

