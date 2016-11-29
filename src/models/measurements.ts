class MeasurementAppointment{
    id?:number;
    notes:string;
    measurementFee:number;
    paymentType: string; // todo make a separate type
    appointmentDate: Date;
    appointmentTime: Date;
    constructor(){
    }
}

export {MeasurementAppointment};