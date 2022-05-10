

// class for the folder in the firebase 
export default class Folder {

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

