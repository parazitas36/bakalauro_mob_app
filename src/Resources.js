import { scale } from "react-native-size-matters";

export default Resources = {
    ActivityIndicatorLoadingScreen: {
        color: 'white',
        size: scale(42),
        Texts: {
            Login: 'Logging in...',
            Register: 'Registering...'
        },
    },
    AppName: 'TrainerPlate',
    ButtonTexts: {
        LoginBtnText: 'Sign In',
        RegisterBtnText: 'Register',
    },
    Colors: {
        BackgroundColorBlack: 'black',
        BorderColorWhite: 'white',
        ErrorTextColor: '#FF3333',
        PlaceholdersColor: 'grey',
        TextColorWhite: 'white',
    },
    Errors: {
        loginFieldsError: 'You must enter both username and password!',
        registerError: 'Account with such username or email already exists!',
        wrongCredentialsError: 'Account with data you have entered doesn\'t exist!',
    },
    Placeholders: {
        Email: 'Email address',
        Name: 'Name',
        Password: 'Password',
        RepeatPassword: 'Repeat password',
        Role: 'Choose Role',
        Surname: 'Surname',
        Username: 'Username',
    },
    Roles: {
        SportsClubAdmin: 'Sports Club Admin',
        Trainer: 'Trainer',
        User: 'User',
    },
    Screens: {
        Register: 'Register',
        Welcome: 'Welcome',
    },
    Texts: {
        CreateAccountText: 'Don\'t have an account?',
        RegisterHeadingText: 'Register',
        RegistrationSuccessful: 'Registration successful! You can login now.'
    },
    ValidationMessages: {
        EmailInvalid: 'You must enter valid email address!',
        NameInvalid: 'Name field is required!',
        PasswordInvalid: 'Password must be between 8 and 15 characters long!',
        RepeatPasswordInvalid: 'Both passwords must match!',
        RoleInvalid: 'You must select the role!',
        SurnameInvalid: 'Surname field is required!',
        UsernameInvalid: 'Username must be between 6 and 15 characters long!',
    },
}