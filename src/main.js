import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash'
import NavigatorButtons from './ui/navigators-buttons';
const statisticsColumnDefinition = [
    { key: "minInterval", displayName: "From" },
    { key: "maxInterval", displayName: "To" },
    { key: "amount", displayName: "Amount" }
]
const courseGenerate = new FormHandler("amount-courses", "alert");
const courses = courseGenerate.createHandler((courses, amount) => {
    for (let i = 0; i < amount; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
})

const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    { key: 'id', displayName: 'ID' },
    { key: 'name', displayName: 'Course' },
    { key: 'lecturer', displayName: 'Lecturer' },
    { key: 'cost', displayName: "Cost (ILS)" },
    { key: 'hours', displayName: "Duration (h)" }
], "courses-table", "sortCourses", "removeCourse");
const formHandler = new FormHandler("courses-form", "alert");
const activeNavigator = new NavigatorButtons (["addCourse", "showCourse", "showHours", "showCost", "amount"]);
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course);
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;

})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
const tableHoursStatistics =
    new TableHandler(statisticsColumnDefinition, "courses-table");
const tableCostStatistics =
    new TableHandler(statisticsColumnDefinition, "courses-table");
function hide() {
    tableHandler.hideTable();
    formHandler.hide();
    tableHoursStatistics.hideTable();
    tableCostStatistics.hideTable();
    courseGenerate.hide();

}
window.showForm = () => {
    hide();
    formHandler.show();
    activeNavigator.setActive(0);
}
window.showCourses = () => {
    hide();
    tableHandler.showTable(dataProcessor.getAllCourses());
    activeNavigator.setActive(1);
}
window.showHoursStatistics = () => {
    hide()
    tableHoursStatistics.showTable(dataProcessor.getHoursStatistics(courseData.hoursInterval));
    activeNavigator.setActive(2);
}
window.showCostStatistics = () => {
    hide()
    tableCostStatistics.showTable(dataProcessor.getCostStatistics(courseData.costInterval));
    activeNavigator.setActive(3);
}
window.showAmountCoursesForm = () => {
    hide()
    courseGenerate.show();
    activeNavigator.setActive(4);
}
window.sortCourses = (key) => {
    tableHandler.showTable(dataProcessor.sortCourses(key))
}
window.removeCourse = (id) => {
    if (window.confirm(`you are going to remove course id: ${id}`)) {
        dataProcessor.removeCourse(+id);
        tableHandler.showTable(dataProcessor.getAllCourses());
    }

}
