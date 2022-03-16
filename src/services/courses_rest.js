import { alert, hide } from "../main";
export default class CoursesRest {
    #url
    constructor(url) {
        this.#url = url;
    }
    async add(course) {
        try{
        const response = await fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(course)
        });
        return await response.json();
    }catch(err) {
       alert.showAlert(this.#url)
    }
    }
    async get() {
        try{
        const response = await fetch(this.#url);
        return await response.json();
        }catch(err) {
            alert.showAlert(this.#url)
        }
    }
    async remove(id) {
        const res = this.getCourse(id);
        await fetch(this.#getUrlById(id), {
            method: 'DELETE'
        })
        return res;


    }
    #getUrlById(id) {
        return `${this.#url}/${id}`;
    }

    async getCourse(id) {
        const response = await fetch(this.#getUrlById(id));
        return await response.json();
    }
    async exists(id) {
        let res;
        try {
            await fetch(this.#getUrlById(id));
            res = true;
        } catch (err) {
            console.log(err);
            res = false;
        }
        return res;
    }
}