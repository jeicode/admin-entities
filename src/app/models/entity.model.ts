

class Entity {
    constructor(
        public entityId:string,
        public name: string,
        public identificationNumber: string,
        public expirationDate: string,
        public contactName: string,
        public contactMail: string,
        public ipAddress: string,
        public logo: string,
        public selected: boolean = false
    ){}
}

export {Entity}