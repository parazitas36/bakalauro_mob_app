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
    AppName: 'TrainerPlate',
    ButtonTexts: {
        LoginBtnText: 'Sign In',
        RegisterBtnText: 'Register',
        SaveBtnText: 'Save'
    },
    Colors: {
        BackgroundColorBlack: 'black',
        BorderColorWhite: 'white',
        ErrorTextColor: '#FF3333',
        PlaceholdersColor: 'grey',
        TextColorWhite: 'white',
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
        btnText: verticalScale(12)
    },
    Placeholders: {
        City: 'City',
        Description: 'Description (max: 250 characters)',
        Email: 'Email address',
        Name: 'Name',
        Password: 'Password',
        Phone: 'Phone number',
        RepeatPassword: 'Repeat password',
        Role: 'Choose Role',
        SelectCountry: 'Select country',
        Surname: 'Surname',
        SportsClubName: 'Sports club name',
        StreetAddress: 'Street address',
        Username: 'Username',
    },
    Roles: {
        SportsClubAdmin: 'Sports Club Admin',
        Trainer: 'Trainer',
        User: 'User',
    },
    Screens: {
        Home: 'Home',
        Register: 'Register',
        Welcome: 'Welcome',
    },
    Texts: {
        ConfirmButtonText: 'Confirm',
        CreateAccountText: 'Don\'t have an account?',
        FillFacilityInfo: 'Fill facility information',
        ImperialSystem: 'Imperial system',
        MetricSystem: 'Metric system',
        NoCountries: 'No countries',
        PickCountryText: 'Pick a country',
        RegisterHeadingText: 'Register',
        RegistrationSuccessful: 'Registration successful! You can login now.',
        SelectedCountryText: 'Country',
        SportsClubCreationHeading: 'Fill your sports club information',
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