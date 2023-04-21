import { scale, verticalScale } from "react-native-size-matters";

export default Resources = {
    ActivityIndicatorLoadingScreen: {
        color: 'white',
        size: scale(42),
        Texts: {
            Loading: 'Loading...',
            Login: 'Logging in...',
            Register: 'Registering...'
        },
    },
    AppName: 'Sportify',
    BlockType: {
        Image: 'ImageBlock',
        Text: 'TextBlock',
        Video: 'VideoBlock',
    },
    ButtonTexts: {
        Add: 'Add',
        AddGuide: 'Add guide',
        AddNewBtnText: 'Add New',
        Confirm: 'Confirm',
        Close: 'Close',
        CreateNewBtnText: 'Create New',
        EditGuide: 'Edit guide',
        Image: 'Image',
        LoginBtnText: 'Sign In',
        RegisterBtnText: 'Register',
        SaveBtnText: 'Save',
        Text: 'Text',
        Video: 'Video'
    },
    Colors: {
        BackgroundColorBlack: 'black',
        BorderColorWhite: 'white',
        DefaultIconColor: 'white',
        DisabledIconColor: 'rgba(255, 255, 255, 0.2)',
        ErrorTextColor: '#FF3333',
        IconsColor: 'white',
        PlaceholdersColor: 'grey',
        TextColorWhite: 'white',
        ThumbColor: '#f4f3f4',
        TrackColorFalse: 'rgba(255, 255, 255, 0.2)',
        TrackColorTrue: 'rgba(255, 255, 255, 0.75)',
    },
    Days: {
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday',
        Saturday: 'Saturday',
        Sunday: 'Sunday'
    },
    Errors: {
        existingSportsClub: 'Sports club with the given name already exists!',
        loginFieldsError: 'You must enter both username and password!',
        registerError: 'Account with such username or email already exists!',
        wrongCredentialsError: 'Account with data you have entered doesn\'t exist!',
    },
    FontSize: {
        validationText: verticalScale(10),
        regularText: verticalScale(12),
        headingText: verticalScale(22),
        heading2Text: verticalScale(18),
        btnText: verticalScale(12),
        subscriptionTitle: verticalScale(16),
    },
    Placeholders: {
        City: 'City',
        Description: 'Description (max: 250 characters)',
        Details: 'Details',
        Email: 'Email address',
        Name: 'Name',
        Password: 'Password',
        Phone: 'Phone number',
        Price: 'Price',
        RepeatPassword: 'Repeat password',
        Role: 'Choose Role',
        SelectCountry: 'Select country',
        Surname: 'Surname',
        SportsClubName: 'Sports club name',
        StreetAddress: 'Street address',
        TrainingPlanName: 'Training plan name',
        Username: 'Username',
    },
    Roles: {
        SportsClubAdmin: 'Sports Club Admin',
        Trainer: 'Trainer',
        User: 'User',
    },
    Screens: {
        AddExerciseSets: 'AddExerciseSets',
        CreateExercise: 'CreateExercise',
        CreateExerciseGuide: 'CreateExerciseGuide',
        CreateEquipment: 'CreateEquipment',
        CreateFacility: 'CreateFacility',
        CreateSubscription: 'CreateSubscription',
        CreateTrainingPlan: 'CreateTrainingPlan',
        EquipmentList: 'EquipmentList',
        Exercise: 'Exercise',
        Exercises: 'Exercises',
        Facility: 'Facility',
        Facilities: 'Facilities',
        Home: 'Home',
        Register: 'Register',
        SCAdminHome: 'SCAdminHome',
        SportsClubCreation: 'SportsClubCreation',
        Subscriptions: 'Subscriptions',
        TrainerHome: 'TrainerHome',
        TrainingPlans: 'TrainingPlans',
        Welcome: 'Welcome',
    },
    Sizes: {
        AddBlockIconSize: verticalScale(22),
        BlockButtonsSize: verticalScale(24),
    },
    Texts: {
        AddExercise: 'Add new exercise',
        ChooseBlockToAdd: 'Choose what to add',
        ConfirmButtonText: 'Confirm',
        CreateAccountText: 'Don\'t have an account?',
        CreateSubscription: 'Create subscription',
        EndDate: 'End date',
        Equipment: 'Equipment',
        Exercise: 'Exercise',
        Exercises: 'Exercises',
        ExerciseGuideCreation: 'Create exercise guide',
        Facility: 'Facility',
        Facilities: 'Facilities',
        FillEquipmentInfo: 'Fill equipment information',
        FillFacilityInfo: 'Fill facility information',
        FillExerciseInfoInPlan: 'Fill exercise information',
        Height: 'Height',
        ImperialSystem: 'Imperial system',
        MetricSystem: 'Metric system',
        MuscleGroups: 'Muscle groups',
        NoCountries: 'No countries',
        NoExercises: 'No exercises',
        NoFacilities: 'No facilities',
        NoSubscriptions: 'No subscriptions',
        NoTrainingPlans: 'No training plans',
        NotificationEquipmentCreatedSuccessFully: 'Equipment created successfully!',
        NotificationEquipmentNotCreated:'Equipment was not created!',
        NotificationFacilityCreatedSuccessFully: 'Facility created successfully!',
        NotificationFacilityNotCreated:'Facility was not created!',
        NotificationSubscriptionCreatedSuccessfully: 'Subscription created successfully!',
        NotificationSubscriptionNotCreated: 'Subscription was not created!',
        PickCountryText: 'Pick a country',
        RegisterHeadingText: 'Register',
        RegistrationSuccessful: 'Registration successful! You can login now.',
        Repetitions: 'Repetitions',
        Search: 'Search',
        SelectedCountryText: 'Country',
        Set: 'Set',
        Sets: 'Sets',
        SportsClubCreationHeading: 'Fill your sports club information',
        StartDate: 'Start date',
        Subscriptions: 'Subscriptions',
        TargetMuscleGroupsLabel: 'Targets muscle groups',
        TrainingPlan: 'Training plan',
        TrainingPlans: 'Training plans',
        TrainingPlanTypeWeekly: 'Weekly',
        TrainingPlanTypeScheduled: 'Scheduled',
        Type: 'Type',
        UnknownClub: 'Unknown club',
        Week: 'Week',
        Weight: 'Weight',
    },
    ValidationMessages: {
        CityInvalid: 'You must provide city name!',
        CountryInvalid: 'You must select a country!',
        Description: 'You must fill the description field!',
        EmailInvalid: 'You must enter valid email address!',
        NameInvalid: 'Name field is required!',
        PasswordInvalid: 'Password must be between 8 and 15 characters long!',
        PhoneNumberInvalid: 'You must provide a phone number!',
        RepeatPasswordInvalid: 'Both passwords must match!',
        RoleInvalid: 'You must select the role!',
        SportsClubName: 'You must fill the sports club name field!',
        StreetAddressInvalid: 'You must provide a street address!',
        SurnameInvalid: 'Surname field is required!',
        UsernameInvalid: 'Username must be between 6 and 15 characters long!',
    },
}