export default class FormHandler {
    #formElement
    #alertElement
    #inputElements
    constructor(idForm, idAlert) {
        this.#formElement = document.getElementById(idForm);
        this.#alertElement = document.getElementById(idAlert);
        this.#inputElements = document.querySelectorAll(`#${idForm} [name]`);
    }
    addHandler(fnProcessor) {
        this.#formElement.addEventListener('submit', event => {
            event.preventDefault();
            const data = Array.from(this.#inputElements)
            .reduce((obj, element) => {
                obj[element.name] = element.value;
                return obj;
            }, {});
            const message = fnProcessor(data);
            if (typeof message != "string") {
                this.#formElement.reset();
            } else {
                this.#alertElement.innerHTML =  `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>${message}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">CLOSE</button></div>`
            }
        })
    }
}