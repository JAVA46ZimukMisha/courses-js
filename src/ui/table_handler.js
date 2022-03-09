export default class TableHandler {
    #tableElem
    #columnsDefinition
    #sortFnName
    #removeFnName
    constructor(columnsDefinition, idTable, sortFnName, removeFnName) {
        //example of columnsDefinition:
        // const columns = [{'key': 'name', 'displayName':'Course Name'},
        // {'key': 'lecturer', 'displayName': 'Lecturer Name'}... ]
        this.#sortFnName = sortFnName ?? '';
        this.#removeFnName = removeFnName ?? '';
        this.#columnsDefinition = columnsDefinition;
        this.#tableElem = document.getElementById(idTable);
        if (!this.#tableElem) {
            throw "Table element is not defined"
        }


    }
    showTable(objects) {
        this.#tableElem.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}`;
    }
    hideTable() {
        this.#tableElem.innerHTML = ''
    }
    #getHeader() {
        return `<thead><tr>${this.#getColumns()}</tr></thead>`
    }
    #getColumns() {
        const columns = this.#columnsDefinition
        .map(c => `<th onclick="${this.#getSortFn(c)}">${c.displayName}</th>`);
        if (this.#removeFnName) {
            columns.push("<th></th>");
        }
        return columns.join('');
    }
    #getSortFn(columnDefinition) {
        return this.#sortFnName ? `${this.#sortFnName}('${columnDefinition.key}')` : ''
    }
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        const record =  this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`);
        if (this.#removeFnName) {

            record.push(`<td><button class="btn btn-outline-danger" onclick="${this.#removeFnName}('${object.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-x-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.854 6.146 8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 1 1 .708-.708z"/>
          </svg></button></td>`)
        }
        return record.join('');
    }
}