export class User{
 id!: number | null |undefined;
 email!: string | null | undefined;   
 password: string | null | undefined;
 confirmPassword!:string | null | undefined;
 role!:string |null|undefined;
 roleId!:number | null |undefined;
 deparmentIds:number|null|undefined;
 departments:string|null|undefined;
 isActive!: boolean | null | undefined;
 //departments: Array<Department> = [];
 constructor(){}
}

export class Department{
    id!: number | null |undefined;
    departmentName!: string |null|undefined;
    isActive!: boolean | null | undefined;
    constructor(){}
}


