// Data processor
export default class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    addCourse(course) {
        let validationMessage;
        course.openingDate = new Date(course.openingDate);
        course.cost = +course.cost;
        course.hours = +course.hours;
        validationMessage = this.#checkValidation(course, validationMessage)
        if(!validationMessage) {
           return this.#courses.add(course);
        } 
        return validationMessage;
    }
    #checkValidation(course, validationMessage) {
        if (course.cost < 5000 || course.cost > 30000) { return validationMessage = this.#getValidationMessage( 1)}
        if (course.hours < 80 || course.hours > 500) { return validationMessage = this.#getValidationMessage( 2)}
        if(course.openingDate.getYear() < 100 || course.openingDate.getYear() > 122) {return validationMessage = this.#getValidationMessage(3)}
        else {validationMessage = this.#getValidationMessage()};
        return validationMessage
    }
    #getValidationMessage(numberOfError) {
        let whatIsWrong = ""; 
        switch(numberOfError) {
            case 1 : whatIsWrong = whatIsWrong + "cost should be in the range [5000 - 20000]; "; return whatIsWrong;
            case 2 : whatIsWrong = whatIsWrong + "hours should be in range [80 - 500]; "; return whatIsWrong;
            case 3 : whatIsWrong = whatIsWrong + "year should be in range [2000 - 2022]; "; return whatIsWrong;
            default: return whatIsWrong;
        }
    }
}