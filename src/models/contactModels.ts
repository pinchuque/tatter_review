class ClientContact {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public title: string;
    public email: string;
    public primaryPhone: string;
    public isActive: boolean;
    public additionalPhoneNumbers: string[];


    constructor() {
        this.additionalPhoneNumbers = [];
    }
}

class ProjectContact {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public primaryPhone: string;
    public primaryPhoneType: string; // todo: make a  type, fill from database 
    public additionalPhoneNumbers: string[];
    public isActive: boolean;
    public isOwner: boolean;
    public isHouseManager: boolean;
    public isJobSuperVisor: boolean;
    public isWindowWasher: boolean;

    public fullName()
    {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
     * getRole
     */
    public getRole() {
        return ` ${this.isOwner ? ' Owner ' : '' } ${this.isHouseManager ? ' House Manager ' : ''} ${this.isJobSuperVisor ? 'Job SuperVisor' : ''} ${this.isWindowWasher ? 'Window Washer' : '' }`;
    }

    /**
     * getPrimaryPhone
     */
    public getPrimaryPhone() {
        return `${this.primaryPhone} ${(this.primaryPhoneType) ? this.primaryPhoneType : '' }`;
    }
    constructor() {
        this.additionalPhoneNumbers = [];
    }
}

export {ClientContact, ProjectContact};
