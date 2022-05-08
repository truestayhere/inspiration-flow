import { ref, onValue, set, get, update, remove } from 'firebase/database';
import { database } from './firebaseConfig';





function getData(path, returnFunction) {
    get(ref(database, path))
        .then(returnFunction)
        .catch((err) => console.log(err));
}

function dataListener(path, returnFunction) {
    onValue(ref(database, path), returnFunction);
}

function addData(path, data) {
    set(ref(database, path), data);
}

function updateData(path, data) {
    update(ref(database, path), data);
}

function removeData(path) {
    remove(ref(database, path));
}


export { getData, addData, dataListener, updateData, removeData };

