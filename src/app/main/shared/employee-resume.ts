export class EmployeeResume{
 id!: number | null;
 carrierObjective!: string | null | undefined;   
 skills: Array<Skill>=[];
 employeeDetail!: EmployeeDetail;
 experiences:Array<Experience>=[];
 educations:Array<Education>=[] ;
 projects:Array<Project>=[];
 languages:Array<Language>=[];
 certifications!:string|null|undefined;
 hobbies!:string|null|undefined;;
 accomplishments!:string|null|undefined;;
 socialMediaLinks!:SocialMediaLink;
 fresher!:boolean|null |undefined;
 working!:boolean|null |undefined
 currentCTC:number |null |undefined;
 expectedCTC!:number |null |undefined;
 preferedLocation!:string |null |undefined; 
    EmployeeResume(){}
}

export class Skill{
    id!: number;
    skillName!: string;
    skillExp!: number;
    fkEmployeeId!: number;
    constructor(){}
}


export class Address{
   
    addressId!: number;
    addressLine!: string;
    country!: string;
    state!: string;
    city!: string;
    pincode!: string;
    fkEmployeeDetailId!: number;
    constructor(){}
    
}

export class EmployeeDetail{
    employeeDetailId!:number
    firstName!: string |null;
    lastName!: string | null;
    gender!: string | null;
    email!: string | null;
    alternateEmail!: string | null;
    phone!: string | null | undefined;
    alternatePhone!: string | null |undefined;
    DOB!: Date|null
    addreses: Array<Address>=[];
    fkEmployeeId!: number |null;
    constructor(){}
}

   export class Experience{
    experienceId!: number;
    jobTitle!: string;
    organizationName!: string;
    jobDescription!: string;
    startDate!: Date |null;
    endDate!: Date |null;
    currentlyWrking!:boolean
    fkEmployeeId!: number;
    constructor(){}
}

export class Education{
    educationId!: number;
    degree!: string;
    fieldOfStudy!: string;
    location!: string;
    schoolName!: string;
    passingPercentage!: number;
    completionDate!: Date | null;
    fkEmployeeId!: number;
    constructor(){}
}


export class Project{
    projectId!: number;
    projectName!: string;
    projectDescription!: string;
    fkEmployeeId!: number;
    constructor(){}
}


export class Language{
    languageId!: number;
    languageName!: string;
    proficient!: string;
    read!: boolean;
    speak!: boolean;
    write!: boolean;
    fkEmployeeId!: number;
    constructor(){}
}
export class SocialMediaLink{
    socialMediaLinkId!: number;
    gitHub!: string;
    lindIn!: string;
    stackOverflow!: string;
    fkEmployeeId!: number;
    constructor(){}
}