export function readableDate(input){

    let date = new Date(input);
    let day, month, year;

    day = date.getDate().toString();
    day.length < 2 ? day = "0"+day : day = day;
    
    month = (date.getMonth()+1).toString();
    month.length < 2 ? month = "0"+month : month = month;

    year = date.getFullYear().toString();

    let result = day+"/"+month+"/"+year;
    return result;
}
