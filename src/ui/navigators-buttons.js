export default class NavigatorButtons {
    #idValues
    constructor(idValues) {
        this.#idValues = idValues;
    }
    setActive(index) {
        this.#idValues.forEach(b => document.getElementById(b).classList.add("btn", "btn-light"));
        const activeButton = document.getElementById(this.#idValues[index]);
        activeButton.classList.add("btn-primary"); 
        activeButton.classList.remove("btn-light");
    }
}