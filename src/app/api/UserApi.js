export default class UserApi {
    constructor(domain) {
        this.domain = domain;
        this.check = [];
    }
    

    // , allUsers
    async read(name, method) {
        return fetch(`${this.domain}/${method}/${name}`);
    }

    // data - json  id, name, message / method - message or user
    async create(data) {
        return await fetch(`${this.domain}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
    }

    // data- json  id, name
    // update() {

    // }

    // data - json  id, name
    delete(data, callback) {

    }
}