export default class NavigatorButtons {
    #idValues
    constructor(idValues) {
        this.#idValues = idValues;
    }
    setActive(index) {
        const activeButton = document.getElementById(this.#idValues[index]);
        activeButton.classList.add("btn-primary"); 
        activeButton.classList.remove("btn-light");
    }
}