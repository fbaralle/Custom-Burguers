import axios from "axios";

const instance = axios.create({
    baseURL: "https://custom-burguers.firebaseio.com/"
});

export default instance;