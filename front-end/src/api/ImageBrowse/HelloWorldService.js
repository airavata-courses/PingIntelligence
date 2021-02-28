import axios from 'axios'
import {API_URL} from '../../constants'


class HelloWorldService{
    executeHelloWorldService(){
        return axios.get(`${API_URL}/gateway`);
    }

    executeHelloWorldBeanService(){
        return axios.get(`${API_URL}/gateway-bean`);
    }

    executeHelloWorldPathvariableService(name){
        return axios.get(`${API_URL}/gateway/path-variable/${name}`);
    }
}

export default new HelloWorldService()