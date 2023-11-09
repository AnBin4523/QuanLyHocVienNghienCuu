export default class ListPerson {
    constructor () {
        this.listPersonArr = [];
    }

    addPerson (person) {
        this.listPersonArr.push(person);
    }

    removePersonById (id) {
        this.listPersonArr = this.listPersonArr.filter((person) => person.id !== id);
    }

    findPersonById(id) {
        return this.listPersonArr.find(person => person.id === id);
    }

    getInformationById(id) {
        const person = this.findPersonById(id);
        return person ? {...person} : null;
    }

    updatePerson(person) {
        const index = this.listPersonArr.findIndex(existingPerson => existingPerson.id === person.id);
        if (index !== -1) {
            this.listPersonArr[index] = person;
        }
    }
}