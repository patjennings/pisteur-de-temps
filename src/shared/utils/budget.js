export function getFullTime(trackedTime){
    let fullTime = 0;
    trackedTime.forEach(t => {
	fullTime += t.value;
    });
    return fullTime;
}

export function getPercent(done, total, floor = false){
    let result = done*100/total;
    let formattedResult;
    floor ? formattedResult = Math.floor(result) : formattedResult = result;

    return formattedResult;
}
