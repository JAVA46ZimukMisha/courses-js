import { createCourse } from "../models/course";
import { getRandomNumber } from "./random";
import { getRandomElement } from "./random";
import { getRandomDate } from "./random";

export function getRandomCourse(courseData) {
    const id = getRandomNumber(courseData["minId"], courseData["maxId"]);
    const name = getRandomElement(courseData["courses"]);
    const lecturer = getRandomElement(courseData["lectors"]);
    const hours = getRandomNumber(courseData["minHours"], courseData["maxHours"]);
    const cost = getRandomNumber(courseData["minCost"], courseData["maxCost"]);
    const openingDate = getRandomDate(courseData["minYear"], courseData["maxYear"]);
    return createCourse(id,name,lecturer, hours, cost,openingDate);
}