export default class Pattern {
    
    getMessage(data) {
        const {name, message, date} = data;

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper-message')

        const dateName = document.createElement('div');
        dateName.classList.add('date-name');
        dateName.textContent = `${name}, ${date}`;

        const messageText = document.createElement('div');
        userMessage.classList.add('message-text');
        messageText.textContent = message;


        wrapper.append(dateName);
        wrapper.append(messageText);

        return wrapper;
    }


    getClient(data) {
        const { name } = data;

        const wrClient = document.createElement('li');
        wrClient.classList.add('cllient-item');

        const photo = document.createElement('div');
        photo.classList.add('photo');

        const userName = document.createElement('div');
        userName.classList.add('user-name');
        userName.textContent = name;


        wrClient.append(photo);
        wrClient.append(userName);

        return wrClient;
    }
}