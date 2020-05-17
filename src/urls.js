/* eslint-disable */
export const serverUrl = () => {
    let url = process.env.PUBLIC_URL;
    let port = process.env.PORT;
    if(process.env.NODE_ENV === 'development') {
        return 'http://localhost:3001'
    }
    else return process.env.PUBLIC_URL;
}