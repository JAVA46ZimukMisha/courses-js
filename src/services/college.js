import _ from "lodash";
// Data processor
export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    addCourse(course) {
        course.hours = +course.hours;
        course.cost = +course.cost;
        course.openingDate = new Date(course.openingDate);
        const validationMessage = this.#getValidationMessage(course);
        if(!validationMessage) {
           return this.#courses.add(course);
        } 
        return validationMessage;
    }
    #getValidationMessage(course) {
        const {minCost, maxCost, minHours, maxHours, minYear, maxYear, lectors, courses} = this.#courseData;
        const {cost, hours, openingDate, lecturer, name} = course
        
        let message = '';
        message += cost > maxCost || cost < minCost ?
         `wrong cost value - should be in range [${minCost}-${maxCost}] <br>`: '';
         message += hours > maxHours || hours < minHours ?
         `wrong hours value - should be in range [${minHours}-${maxHours}] <br>`: '';
         message += !lectors.includes(lecturer) ? `wrong lecturer name - should be one from ${lectors} <br>`: '';
         message += !courses.includes(name) ? `wrong course name - should be one from ${courses}`:'';
         const year = openingDate.getFullYear();
         message += year < minYear || year > maxYear ?
          `wrong opening date - year should be in range [${minYear} - ${maxYear}]` : ''
         return message;
    }
    getAllCourses() {
        return this.#courses.get()
    }
    sortCourses(key) {
        return _.sortBy(this.getAllCourses(), key)
    }
    getHoursStatistics(lengthInterval) {
        let minInt = this.#courseData.minHours;
        let key = this.#courseData.minHours/lengthInterval;
        const hourStat = new Array((this.#courseData.maxHours - this.#courseData.minHours)/lengthInterval);
        return hourStat.map(n => {n = this.getObjHours(key, minInt, lengthInterval);
        minInt += lengthInterval; key++; return n});
    }
    getObjHours(key, minInt, lengthInterval) {
        let maxInt = minInt+lengthInterval;
        let objHour = {'minInterval': minInt, 
        'maxInterval' : maxInt, 
        'amount' : getAmountHour(key)};
        return objHour;
    }
    getAmountHour(key) {
       const amountObj =  _.countBy(this.#courses, (course) => Math.floor(course.hours/lengthInterval));
       return amountObj[key];
    }
    getCostStatistics(lengthInterval) {
        let minInt = this.#courseData.minCost;
        let key = this.#courseData.minCost/lengthInterval;
        const costStat = new Array(Math.floor((this.#courseData.maxCost - this.#courseData.minCost)/lengthInterval));
        return costStat.map(n => {n = this.getObjCost(key, minInt, lengthInterval);
        minInt += lengthInterval; key++; return n});
    }
    getObjCost(key, minInt, lengthInterval) {
        let maxInt = minInt+lengthInterval;
        let objCost = {'minInterval': minInt, 
        'maxInterval' : maxInt, 
        'amount' : getAmountCost(key)};

        return objHour;
    }
    getAmountCost(key) {
       const amountObj =  _.countBy(this.#courses, (course) => Math.floor(course.cost/lengthInterval));
       return amountObj[key];
    }
}