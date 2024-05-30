export interface Skill {
    id: string;
    skillName: string;
    yearsOfExperience: number;
}


export interface ProfileDto {
    id: string;
    profileTitle: string;
    profileType: string;
    cv: string;
    audio: string;
    interviewFile:string;
    salaryExpectations: number;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    country: string;
    email: string;
    candidate_id: string;
    createdAt: Date;
    status : string;
    recruitmentStatus : string;
    skills: Skill[]; 
    intrviewData:IntrviewData;
}

export interface PageableProfileDto {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    profileDtos: ProfileDto[];
}


export interface IntrviewData {
    id: string;
    linkdin: string;
    github: string;
    portfolio: string;
    yourMotivationForChangePosition: string;
    pointsDefinedByClient: string;
    otherPoints: string;
    softSkills: string;
    expectations: string;
    trainingPlans: string;
    currentBenifits: string;
    desiredBenifits: string;
    currentSalary: number;
    fixedSalary: number;
    desiredSalary: number;
    noticePeriodDuration: string;
    recruitorId: string;
    employedStatus: string;
    statusSearch: string;
    onGoingProcesses: string;
    progressLevel: string;
    relocation: string;
    mobilityArea: string;
    quation: string;
    availabilityDate: Date;
    intrviewedVideoCallDate: Date;
    
    profile_id:string;
}  