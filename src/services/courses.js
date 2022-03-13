// fake Data provisioning module

import { getRandomNumber } from "../utils/random";
export function getPromise(timeout, value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value)
        }, timeout)
    })
}
//data are the regular JS array
export default class Courses {
    #courses
    #minId
    #maxId
    constructor(minId, maxId, courses) {
        this.#courses =  courses ?? [];
        this.#minId = minId ?? 1;
        this.#maxId = maxId ?? 10000000;

    }
    async add(course) {
        course.id = await this.#getId();
        this.#courses.push(course);
        return getPromise(1000, course);
    }
    async #getId() {
        //return unique value of id
        let id;
        do {
            id = await getRandomNumber(this.#minId, this.#maxId)
        }while(this.exists(id));
        return id;
    }
    exists(id) {
        return !!this.#courses.find(c => c.id === id);
    }
    get() {
        return getPromise(1000, this.#courses);
    }
    remove(id) {
        const index = this.#courses.findIndex(c => c.id === id);
        const res = this.#courses[index];
        this.#courses.splice(index, 1);
        return getPromise(1000, res);
    }
}