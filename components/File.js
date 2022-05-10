
// class for the file in the firebase
export default class File {

    constructor(name) {
        this.name = name;
        this.content = [];
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    getContent() {
        return this.content;
    }

    setContent(data) {
        this.content = data;
    }



}
