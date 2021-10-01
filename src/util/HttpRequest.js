import axios from 'axios';

export const get =(url) => {
    axios.get(url)
        .then(resp => {
            console.log(resp);
            return resp.data;
        }).catch(
            error => console.error('timeout exceeded')
        );
}

export const post = (url,data) => {
    return axios({
        method: 'post',
        url: url,
        data: data,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'chartset': 'UTF-8',
            'Pragma': 'no-cache',	
            'Cache-Control': 'no-cache'
        },
        //timeout:requestTimeout
    }).then(resp => {
        console.log(resp);
        return resp.data;
    }).catch(
        error => console.error('timeout exceeded')
    );
}
