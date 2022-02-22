export function getRandomNumber(min, max) {
    (min>max) && ([min, max] = [max, min]);
    return Math.floor(min+Math.random()*(max+1 - min));
}
export function getRandomElement(array) {
    return array[getRandomNumber(0, array.length-1)]
}
export function getRandomDate(minYear, maxYear) {
    const year = getRandomNumber(minYear, maxYear);
    const month = getRandomNumber(0, 11);
    const day = getRandomNumber(1, 28);
    const date = new Date(year, month, day) 
    return date;
}