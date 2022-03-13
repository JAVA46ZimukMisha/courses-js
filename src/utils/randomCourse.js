import { createCourse } from "../models/course";
import { getRandomDate, getRandomNumber, getRandomElement } from "./random";
export async function getRandomCourse(courseData) {
    const {minId, maxId,lectors,courses, minHours, maxHours, minCost, maxCost, minYear, maxYear} = courseData;
    const id = await getRandomNumber(minId, maxId);
    const lecturer = await getRandomElement(lectors);
    const name = await getRandomElement(courses);
    const hours = Math.round(await getRandomNumber(minHours, maxHours) / 10) * 10;
    const cost = Math.round(await getRandomNumber(minCost, maxCost) / 100) * 100;
    const openingDate = await getRandomDate(minYear, maxYear);
    return createCourse(id,name,lecturer, hours, cost,openingDate);
}