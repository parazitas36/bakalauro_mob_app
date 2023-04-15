export const ApiConstants = (props) =>  {
    const SSL_URL = 'https://10.0.2.2:5021:7013/api/'
    const URL = 'http://localhost:5021/api/'
    const Users_Endpoint = 'Users/'
    const SportsClub_Endpoint = 'SportsClub/'
    const Facility_Endpoint = 'Facility/'
    const Exercise_Endpoint = 'Exercises/'

    return ({
        USERS_ENDPOINT: `${URL}${Users_Endpoint}`,
        SportsClub_Endpoint: `${URL}${SportsClub_Endpoint}`,
        REGISTER: `${URL}${Users_Endpoint}register`,
        LOGIN: `${URL}${Users_Endpoint}login`,
        AdminClub: `${URL}${SportsClub_Endpoint}usersportsclub`,
        SportsClubFacilities: `${URL}${SportsClub_Endpoint}${props?.ids[0]}/facility`,
        Subscriptions: `${URL}${SportsClub_Endpoint}${props?.ids[0]}/subscriptions`,
        Equipment: `${URL}${Facility_Endpoint}${props?.ids[0]}/equipment`,
        SportsClubEquipment: `${URL}${SportsClub_Endpoint}${props?.ids[0]}/equipment`,
        EquipmentAmountUpdate: `${URL}${Facility_Endpoint}${props?.ids[0]}/equipment/${props?.ids[1]}/${props?.amount}`,
        TrainersExercises: `${URL}${Exercise_Endpoint}all/trainer/${props?.ids[0]}`,
        Exercise_Endpoint: `${URL}${Exercise_Endpoint}`,
    });
}
