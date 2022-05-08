

export default class File {

    constructor(name, type) {
        this.name = name;
        this.type = type
        this.content = [];
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    getType() {
        return this.type;
    }

    getContent() {
        return this.content;
    }

    setContent(data) {
        this.content = data;
    }



}
