export interface CompanyDto {
    id: string;
    name: string;
    address: string;
    country: string;
    contact: string;
    email: string;
    webSiteLink: string;
    sector: string;
    informations: string;
}

export interface CurrencyCountry {
    id: string;
    country: string;
    currency: string;
}

export interface PageableCompanyDTO{
    currentPage: number;
    totalPages: number;
    pageSize: number;
    companyDTOs: CompanyDto[];
}

