// Fat% = 1.2*BMI + 0.23*age - 10.8*gender - 5.4
// Gender: male = 1, female = 0
// MALE
// Essential fat - Minimum Health: 2-5%
// Athletes: 6-13%
// Average: 18-24%
// Obese: 25%+
// FEMALE
// Essential fat - Minimum Health: 10-13%
// Athletes: 14-20%
// Average: 25-31%
// Obese: 32%+
export const FatPercentageCalculator = ({bmi, age, gender}) => {
    const genderMultiplier = String(gender).toLowerCase() === 'male' ? 1 : 0
    return Number(1.2 * Number(bmi) + 0.23 * Number(age) - 10.8 * genderMultiplier - 5.4).toFixed(1)
}