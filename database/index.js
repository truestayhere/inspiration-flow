import { ref, onValue, set, get, update, remove } from 'firebase/database';
import { database } from './firebaseConfig';


/**
 * Function to GET the specific data from the realtime database
 * @param {path} path to the data we want to get
 * @param {returnFunction} returnFunction a function that will be executed after we get the data 
 */
function getData(path, returnFunction) {
    get(ref(database, path))
        .then(returnFunction)
        .catch((err) => console.log(err));
}

/**
 * Function to listen to the databse value changes and update content
 * @param {path} path to the data we want to track
 * @param {returnFunction} returnFunction a function that will be executed after we get the data 
 */
function dataListener(path, returnFunction) {
    onValue(ref(database, path), returnFunction);
}


/**
 * Function to add data to the realtive database
 * @param {path} path to the place we want to write data
 * @param {data} data that we want to write 
 */
function addData(path, data) {
    set(ref(database, path), data);
}


/**
 * Function to add a new values ot an existing data in the database
 * @param {path} path to the place we want to write new values
 * @param {data} data that we want to write 
 */
function updateData(path, data) {
    update(ref(database, path), data);
}


/**
 * Function to remove data from the database
 * @param {path} path to the data we want to delete
 */
function removeData(path) {
    remove(ref(database, path));
}


export { getData, addData, dataListener, updateData, removeData };

