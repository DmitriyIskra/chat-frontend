export default class RedrawChat {
    constructor(chat, pattern, v4, userApi) {
        this.chat = chat;
        this.pattern = pattern;
        this.userApi = userApi;
        this.v4 = v4;

        this.chatBoard = this.chat.querySelector('.chat-board');
        this.logIn = this.chat.querySelector('.log-in');
        this.stringBusy = this.chat.querySelector('.login-busy');
        this.typeName = this.chat.querySelector('.login__type-login');

        this.createUser = this.createUser.bind(this);
        this.openChat = this.openChat.bind(this);
    }

    // проверка занято ли имя
    checkUser(name) { 
        
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

            this.createUser(name)
        })();
    } 

    // имя занято
    nameBusy() {
        this.stringBusy.classList.add('login-busy_active');
        this.typeName.value = '';
    }

    createUser(name) {
        // Убираем сообщение о занятости имени
        this.stringBusy.classList.remove('login-busy_active');
        this.typeName.value = '';


        (async () => {
            // создать куки
            const userId = this.v4();
            this.createCookies(userId);

            // собираем данные
            let user = {
                id: userId,
                name: name,
            }

            // отправляем запрос на создание пользователя
            const response = await this.userApi.create(user);

            if(!response) {
                console.error('ОШИБКА');
                return;
            }

            const result = await response;
            const json = await result.json();

            this.openChat(json);
        })();
        
    }

    openChat(json) {
        this.logIn.classList.add('log-in_unactive');
        this.chatBoard.classList.remove('unactive');
    }



    createCookies(id) {
        document.cookie = `userId=${id}`
    }
}