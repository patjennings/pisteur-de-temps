export function getFullTime(trackedTime){
    let fullTime = 0;
    trackedTime.forEach(t => {
	fullTime += t.value;
    });
    return fullTime;
}

export function getPercent(done, total){
    let result = done*100/total;
    return result;
}
