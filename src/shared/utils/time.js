export function convertToUnitValue(value, unitState){
    let valueConverted;
    const workingDayLength = 7; // la longueur d'un jour de travail, en heures.
    
    if(unitState == "hour"){
	valueConverted = value;
    } else {
	valueConverted = value/7;
    }
    return valueConverted;
}
