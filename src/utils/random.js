import { getPromise } from "../services/courses";
export function getRandomNumber(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return getPromise(1, (min + Math.round(Math.random() * (max -min))));

}
export async function getRandomElement(array) {
    const index = await getRandomNumber(0, array.length - 1);
    return array[index];
}
export async function getRandomDate(minYear, maxYear) {
    const year = await getRandomNumber(minYear, maxYear);
    const month = await getRandomNumber(0, 11);
    const day = await getRandomNumber(1, 31);
    const date = new Date(year, month, day) ;
    return date;
}