export default class Spinner {
    #idSpinner
    constructor (idSpinner) {
        this.#idSpinner = idSpinner
    }
    start() {
        const spinner = document.getElementById(this.#idSpinner);
        spinner.innerHTML = `<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>
      </button>`;
      spinner.classList.add("mt-5")
    }
    stop() {
      const spinner = document.getElementById(this.#idSpinner);
      spinner.innerHTML = ``;
    }
}