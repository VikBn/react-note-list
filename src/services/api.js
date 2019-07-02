import axios from 'axios';
import Cookies from "js-cookie";

class ServiceApi {
    getHeaders = (withToken = true) => ({
        "content-type": "application/json",
        ...withToken && {Authorization: `Bearer ${Cookies.get("application_token")}`}
    });

    setToken = token => Cookies.set("application_token", token);

    getToken = () => Cookies.get("application_token");

    call = async ({withToken, ...options}) => {
        try {
            return await axios({
                baseURL: 'http://159.89.96.181/api/v1',
                headers: this.getHeaders(withToken),
                ...options
            })
        } catch (error) {
            throw error
        }
    }
}

export const serviceApi = new ServiceApi();