import courseData from './config/courseData.json'
import { getRandomCourse } from './utils/randomCourse';
const N_COURSES = 100;
function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}
function render(){
const list = document.getElementById("courses");
const listArray = createCourses();
list.innerHTML = listArray.map(i => `<li>${JSON.stringify(i)}</li>`).join("");
}
render();