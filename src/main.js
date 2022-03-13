import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash'
import NavigatorButtons from './ui/navigator_buttons';
import Spinner from './ui/spinner';
const statisticsColumnDefinition = [
    { key: "minInterval", displayName: "From" },
    { key: "maxInterval", displayName: "To" },
    { key: "amount", displayName: "Amount" }
]

const spinner = new Spinner("spinner");
const dataProvider = new Courses(courseData.minId, courseData.maxId);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    { key: 'id', displayName: 'ID' },
    { key: 'name', displayName: 'Course' },
    { key: 'lecturer', displayName: 'Lecturer' },
    { key: 'cost', displayName: "Cost (ILS)" },
    { key: 'hours', displayName: "Duration (h)" }
], "courses-table", "sortCourses", "removeCourse");
const formHandler = new FormHandler("courses-form", "alert");
const generationHandler = new FormHandler("generation-form", "alert");
const navigator = new NavigatorButtons(["0","1","2", "3", "4"])
formHandler.addHandler(async course => {
    spinner.start();
    const res = await dataProcessor.addCourse(course);
    spinner.stop();
    if (typeof (res) !== 'string') {
        return '';
    }
    return res;

})
generationHandler.addHandler(async generation => {
    let message;
    spinner.start()
    if (generation.nCourses<0) {
        message = `Error! Message should be more than 0`
    }
    for (let i=0; i < generation.nCourses; i++) {
        await dataProcessor.addCourse(await getRandomCourse(courseData));
        message = '';
    }
    spinner.stop();
    return message;
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
    generationHandler.hide();
    tableHoursStatistics.hideTable();
    tableCostStatistics.hideTable();

}
window.showGeneration = () => {
    hide();
    navigator.setActive(4);
    generationHandler.show();
}
window.showForm = () => {
    hide();
    navigator.setActive(0);
    formHandler.show();
}
window.showCourses = async () => {
    spinner.start();
    hide();
    navigator.setActive(1);
    tableHandler.showTable(await dataProcessor.getAllCourses());
    spinner.stop();
}
window.showHoursStatistics = async () => {
    spinner.start();
    hide()
    navigator.setActive(2);
    tableHoursStatistics.showTable(await dataProcessor.getHoursStatistics(courseData.hoursInterval));
    spinner.stop();
}
window.showCostStatistics = async () => {
    spinner.start();
    hide()
    navigator.setActive(3);
    tableCostStatistics.showTable(await dataProcessor.getCostStatistics(courseData.costInterval));
    spinner.stop();
}
window.sortCourses = async (key) => {
    spinner.start();
    tableHandler.showTable(await dataProcessor.sortCourses(key))
    spinner.stop();
}
window.removeCourse = async (id) => {
    if (window.confirm(`you are going to remove course id: ${id}`)) {
        spinner.start();
        dataProcessor.removeCourse(+id);
        tableHandler.showTable(await dataProcessor.getAllCourses());
        spinner.stop();
    }

}
