export const Validation = (sportsClubName, description, email) => {
    return {
      validSportsClubName: sportsClubName != null && String(sportsClubName).length < 15 && String(sportsClubName).length > 0,
      validEmail: String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null,
      validDescription: description != null && String(description).length > 0 && String(description).length < 250
    };
  };