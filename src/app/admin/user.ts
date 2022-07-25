export class User{
 id!: number | null;
 username!: string | null | undefined;   
 password: string | null | undefined;
 confirmPassword!:string | null | undefined;
 role!:string |null|undefined;
 departmentId:number|null|undefined;
 department:string|null|undefined;
 departments: Array<Department> = [];
 constructor(){}
}

export class Department{
    id!: number;
    departmentName!: string;
    
    constructor(){}
}


