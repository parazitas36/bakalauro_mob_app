export const Validation = (country, city, streetAddress, email, phone) => {
  return {
    validCountry: country !== null,
    validCity: city !== null && String(city).length > 0 && String(city).length < 50,
    validEmail: String(email).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null,
    validPhone: String(phone).length > 0 && String(phone).length  < 20,
    validAddress: streetAddress !== null && String(streetAddress).length > 0 && String(streetAddress).length < 50
  };
};
