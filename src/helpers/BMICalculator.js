// Metric BMI = weight(kg) / height^2 (meters)
// Imperial BMI = weight(lb) / height^2 (inches) * 703

// Underweight < 18.5
// Normal weight 18.5-24.9
// Overweight 25-29.9
// Obesity 30+
export const BMICalculator = ({height, weight, isImperialUnits=false}) => {
    if (isImperialUnits === false) {
        return Number(Number(weight) / Math.pow(Number(height)/100, 2)).toFixed(2);
    }
    return Number(Number(weight) / Math.pow(Number(height), 2) * 703).toFixed(2);
}