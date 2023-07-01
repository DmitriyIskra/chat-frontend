export default class RedrawChat {
    constructor(chat, pattern, v4, userApi) {
        this.chat = chat;
        this.pattern = pattern;
        this.userApi = userApi;
        this.v4 = v4;

        this.id = null;

        this.chatBoard = this.chat.querySelector('.chat-board');
        this.messagesPlace = this.chatBoard.querySelector('.messeges')
        this.clientsBoard = this.chat.querySelector('.clients-list');
        this.logIn = this.chat.querySelector('.log-in');
        this.stringBusy = this.chat.querySelector('.login-busy');
        this.typeName = this.chat.querySelector('.login__type-login');
        this.formMessage = this.chat.querySelector('.form-type-message');
        // this.valueMessage = this.formMessage.querySelector('.type-message');


        this.openChat = this.openChat.bind(this);
        this.drawChat = this.drawChat.bind(this);
    }


    // проверка занято ли имя и дальнейшая отрисовка
    checkUser(name, callback) { 
        
        (async () => {
            const response = await this.userApi.read(name, 'checkName');

            if(!response) {
                console.error('ОШИБКА');
                return;
            }

            const result = await response;
            const text = await result.text()
            
            // Если имя занято сообщаем об этом
            if(text !== 'free') {
                this.nameBusy();
                return;
            }

            this.createCookies();
            
            const data = {
                title: 'start',
                id: this.id,
                name
            };

            this.openChat();

            // Отправка сообщения в ws
            callback(data);
        })();
    } 


    // имя занято
    nameBusy() {
        this.stringBusy.classList.add('login-busy_active');
        this.typeName.value = '';
    }

    // createUser(name) {
    //     // Убираем сообщение о занятости имени
    //     this.stringBusy.classList.remove('login-busy_active');
    //     this.typeName.value = '';


    //     (async () => {
    //         // создать куки
    //         const userId = this.v4();
    //         this.createCookies(userId);

    //         // собираем данные
    //         let user = {
    //             id: userId,
    //             name: name,
    //         }

    //         // отправляем запрос на создание пользователя
    //         const response = await this.userApi.create(user);

    //         if(!response) {
    //             console.error('ОШИБКА');
    //             return;
    //         }

    //         const result = await response;
    //         const json = await result.json();

    //         this.openChat(json);
    //     })();
        
    // }
    drawChat(json) {
        const resData = JSON.parse(json);

        let userPattern;
        let messagePattern;

        


        if(resData.title === 'start') {
            // когда какой то пользователь законектился чистим и перерисовываем
            let itemClients = this.clientsBoard.children;
            if(itemClients.length > 0) [...itemClients].forEach( item => item.remove());

            let itemMessage = this.messagesPlace.children;
            if(itemMessage.length > 0) [...itemMessage].forEach ( item => item.remove());


            // console.log(resData.data)
            const { users, chat } = resData.data;

            users.forEach( item => {
                userPattern = this.pattern.getClient(item);
                this.clientsBoard.append(userPattern);
            })

            chat.forEach( item => {
                messagePattern = this.pattern.getMessage(item);
                this.messagesPlace.append(messagePattern);
            })

        }

        if(resData.title === 'message') {
            messagePattern = this.pattern.getMessage(resData.chat, this.id);

            this.messagesPlace.append(messagePattern);
        }

        if(resData.title === 'close') {
            // Читстим и перерисовываем
            let itemClients = this.clientsBoard.children;
            if(itemClients.length > 0) [...itemClients].forEach( item => item.remove());

            // получаем массив юзеров
            const { data } = resData;
    

            // перебираем и отрисовываем
            data.forEach( item => {
                userPattern = this.pattern.getClient(item);
                this.clientsBoard.append(userPattern);
            })
        }
         
    }

    openChat() {
        this.logIn.classList.add('log-in_unactive');
        this.chatBoard.classList.remove('unactive');
    }

    sendMessage(value, callback) {
        
        const data = {
            message: value,
        }

        callback(data) // data - value

        this.formMessage.reset();
    } 

    createCookies() {
        // Если кукисов вообще нет
        if(document.cookie.length === 0) {
            const id = this.v4();

            document.cookie = `userId=${id}`;
            
            this.id = id;
            return;
        }


        const pairs = document.cookie.split('; ');
        // Если есть, но не те что нужно создаем
        if(!pairs.some( el => el.startsWith(`userId=`))) {
            const id = this.v4();

            document.cookie = `userId=${id}`;
            
            this.id = id;
            return;
        }
        
        const findedCookie = pairs.find( el => el.startsWith(`userId=`)).split('');
        
        findedCookie.splice(0, `userId=`.length);
        
        this.id = findedCookie.join('');
    }

}