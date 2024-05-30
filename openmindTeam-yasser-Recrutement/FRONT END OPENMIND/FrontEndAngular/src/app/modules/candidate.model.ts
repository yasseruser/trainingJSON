export interface CandidateDto{
    id: string;
    firstName: string;
    lastName: string;
    createdDate: Date;
    phone: string;
    city: string;
    country: string;
    email: string;
    status: string;
    birthDate: Date;
    hasAccount:boolean;
    slots?: Date[];
    userId?:string;
}


export interface PageableCandidateDTO {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    candidateDTOs: CandidateDto[];
}