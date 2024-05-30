import { OfferDto } from "./offer.modul";

export interface ApplicationDto {
    id: string;
    audio: string;
    email: string;
    phone: string;
    cv: string;
    candidate_id: string;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    profileTitle: string;
    profileType: string;
    profile_id: string;
    salaryExpectations: number;
    recruitment_status: string;
    currency?:string;
    offerDto?:OfferDto;
}

export interface PageableApplicationDto {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    applicationDtos: ApplicationDto[];
}
