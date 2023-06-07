export const ApiConstants = (props) =>  {
    const PUBLIC_API_URL = 'https://fitnessappapibakalauras.azurewebsites.net/api/'
    const URL = PUBLIC_API_URL //'http://localhost:5021/api/'
    const Users_Endpoint = 'Users/'
    const SportsClub_Endpoint = 'SportsClub/'
    const Facility_Endpoint = 'Facility/'
    const Exercise_Endpoint = 'Exercises/'
    const TrainingPlan_Endpoint = 'TrainingPlans/'
    const Forms_Endpoint = 'Forms/'
    const Progress_Endpoint = 'Progress/'
    const Files_Endpoint = "Files/"

    return ({
        USERS_ENDPOINT: `${URL}${Users_Endpoint}`,
        SportsClub_Endpoint: `${URL}${SportsClub_Endpoint}`,
        REGISTER: `${URL}${Users_Endpoint}register`,
        LOGIN: `${URL}${Users_Endpoint}login`,
        AdminClub: `${URL}${SportsClub_Endpoint}usersportsclub`,
        SportsClubFacilities: `${URL}${SportsClub_Endpoint}${props?.ids[0]}/facility`,
        Subscriptions: `${URL}${SportsClub_Endpoint}${props?.ids[0]}/subscriptions`,
        Equipment: `${URL}${Facility_Endpoint}${props?.ids[0]}/equipment`,
        TrainerEquipment: `${URL}${SportsClub_Endpoint}trainer/equipment`,
        SportsClubEquipment: `${URL}${SportsClub_Endpoint}${props?.ids[0]}/equipment`,
        EquipmentAmountUpdate: `${URL}${Facility_Endpoint}${props?.ids[0]}/equipment/${props?.ids[1]}/${props?.amount}`,
        TrainersExercises: `${URL}${Exercise_Endpoint}all/trainer/${props?.ids[0]}`,
        Exercise_Endpoint: `${URL}${Exercise_Endpoint}`,
        TrainingPlan_Endpoint: `${URL}${TrainingPlan_Endpoint}`,
        TrainingPlansShort: `${URL}${TrainingPlan_Endpoint}${props?.ids[0]}/short`,
        TrainingPlanById: `${URL}${TrainingPlan_Endpoint}${props?.ids[0]}/`,
        Forms_Endpoint: `${URL}${Forms_Endpoint}`,
        TrainingPlanForms: `${URL}${Forms_Endpoint}trainingplanforms`,
        UsersTrainingPlanForms: `${URL}${Forms_Endpoint}user/trainingplanforms`,
        Trainers: `${URL}${Users_Endpoint}trainers/`,
        Reviews: `${URL}${Users_Endpoint}reviews/`,
        BodyMeasurements: `${URL}${Forms_Endpoint}bodymeasurements/`,
        ClientBodyMeasurements: `${URL}${Forms_Endpoint}bodymeasurements/client/${props?.ids[0]}`,
        TrainingPlanOffers: `${URL}${Forms_Endpoint}trainingplanoffers/`,
        UserTrainingPlans: `${URL}${TrainingPlan_Endpoint}userplans`,
        LogExerciseProgress: `${URL}${TrainingPlan_Endpoint}progress/`,
        Clients: `${URL}${Users_Endpoint}clients`,
        ClientTrainingPlans: `${URL}${TrainingPlan_Endpoint}client/${props?.ids[0]}`,
        ClientTrainingPlanById: `${URL}${TrainingPlan_Endpoint}client/${props?.ids[0]}/trainingPlan/${props?.ids[1]}`,
        TrainingPlanProgressById: `${URL}${Progress_Endpoint}${props?.ids[0]}`,
        CopyTrainingPlan: `${URL}${TrainingPlan_Endpoint}copy/${props?.ids[0]}`,
        UpdateTrainingPlanNewExercise: `${URL}${TrainingPlan_Endpoint}update/${props?.ids[0]}`,
        UpdateTrainingPlanExercise: `${URL}${TrainingPlan_Endpoint}${props?.ids[0]}`,
        DeleteTrainingPlanExercise: `${URL}${TrainingPlan_Endpoint}exercise/${props?.ids[0]}`,
        DeleteTrainerTrainingPlan: `${URL}${TrainingPlan_Endpoint}trainer/trainingplan/${props?.ids[0]}`,
        DeleteUserTrainingPlan: `${URL}${TrainingPlan_Endpoint}user/trainingplan/${props?.ids[0]}`,
        FindUsersByUsername: `${URL}${Users_Endpoint}search/`,
        PostTrainerInvite: `${URL}${Forms_Endpoint}trainerinvites/trainer/${props?.ids[0]}`,
        TrainerInvites: `${URL}${Forms_Endpoint}trainerinvites`,
        UpdateTrainerInvite: `${URL}${Forms_Endpoint}trainerinvites/${props?.ids[0]}/`,
        GetFile: `${URL}${Files_Endpoint}file/`,
        GetSportsClubTrainers: `${URL}${SportsClub_Endpoint}${props?.ids[0]}/trainers/`,
        GetFacilityTrainers: `${URL}${Facility_Endpoint}${props?.ids[0]}/trainers`,
        AssignTrainerToFacility: `${URL}${Facility_Endpoint}${props?.ids[0]}/assign/${props?.ids[1]}`
    });
}
