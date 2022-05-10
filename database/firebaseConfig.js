import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Databse configuration file 

const firebaseConfig = {
    apiKey: 'AIzaSyBL_m_bgymlqtc6f5NHKZdHpIOuNaDO7Mg',
    authDomain: 'inspiration-flow.firebaseapp.com',
    databaseURL: 'https://inspiration-flow-default-rtdb.firebaseio.com/',
    projectId: 'inspiration-flow',
    storageBucket: 'inspiration-flow.appspot.com',
    messagingSenderId: '29336406651',
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };