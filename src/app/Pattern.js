export default class Pattern {
    
    getMessage(data, thisId) {
        const {id, name, message, date} = data;

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper-message');
        if(id === thisId) {
            wrapper.style.alignSelf = 'flex-end';
        }

        const dateName = document.createElement('div');
        dateName.classList.add('date-name');
        dateName.textContent = `${name}, ${date}`;

        const messageText = document.createElement('div');
        messageText.classList.add('message-text');
        messageText.textContent = message;


        wrapper.append(dateName);
        wrapper.append(messageText);

        return wrapper;
    }


    getClient(data) { 
        const { name } = data;

        const wrClient = document.createElement('li');
        wrClient.classList.add('cllient-item');
        wrClient.id = data.id;

        const photo = document.createElement('div');
        photo.classList.add('user-photo');

        const userName = document.createElement('div');
        userName.classList.add('user-name');
        userName.textContent = name;


        wrClient.append(photo);
        wrClient.append(userName);

        return wrClient;
    }
}