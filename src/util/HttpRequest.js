import axios from 'axios';

export const get =(url,header) => {
    return axios.get(url, {headers: header})
    // axios.get(url)
        .then(resp => {
            console.log('success'+resp);
            return resp.data;
        }).catch(
            error => {
                console.error('timeout exceeded');
                return error;
            }
        );
}

export const post = (url,data, header) => {
    return axios.post(url, data, {headers: header})
        .then(resp => {
            console.log(resp);
            return resp.data;
        }).catch(
            error => {
                console.error('timeout exceeded');
                return error;
            }
        );
}

export const patch = (url,data, header) => {
    return axios.patch(url, data, {headers: header})
        .then(resp => {
            console.log(resp);
            return resp.data;
        }).catch(
            error => {
                console.error('timeout exceeded');
                return error;
            }
        );
}

export const deletes = (url,header) => {
    return axios.delete(url, {headers: header})
        .then(resp => {
            console.log(resp);
            return resp.data;
        }).catch(
            error => {
                console.error('timeout exceeded');
                return error;
            }
        );
}

