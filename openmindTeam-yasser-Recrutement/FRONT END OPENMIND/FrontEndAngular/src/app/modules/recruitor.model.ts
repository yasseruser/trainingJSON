import { CompanyDto } from "./company.model";

export interface RecruitorDto {
    id: string;
    firstName: string;
    lastName: string;
    createdDate: Date; 
    phone: string;
    city: string;
    country: string;
    email: string;
    companyid: string; 
    companyDto?: CompanyDto;
    userId?:string;
}
export interface PageableRecruitorDTO {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    recruitorDtos: RecruitorDto[];
}