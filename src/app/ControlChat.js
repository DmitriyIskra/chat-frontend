export default class ControlChat{
    constructor(redrawChat, Ws, formMessage, valueMessage) {
        this.redrawChat = redrawChat;
        this.chat = this.redrawChat.chat;
        this.formMessage = formMessage;
        this.valueMessage = valueMessage;
        this.Ws = new Ws('ws://localhost:7000');

        this.onClick = this.onClick.bind(this);
        this.sendWs = this.sendWs.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    init() {
        this.registerEvents();
        
        this.Ws.init(this.redrawChat.drawChat);
    }

    registerEvents() {
        this.chat.addEventListener('click', this.onClick);
        this.formMessage.addEventListener('submit', this.onSubmit);
    }

    onClick(e) {
        if(e.target.closest('.login__button-send')) {

            const name = this.redrawChat.typeName.value;

            this.redrawChat.checkUser(name, this.sendWs);
        }
        
    }

    onSubmit(e) {
        e.preventDefault();

        const value = this.valueMessage.value;

        this.redrawChat.sendMessage(value, this.sendWs);
    }

    // метод который передадим в redrawchat при регистрации
    sendWs(data) {
        this.Ws.sendWs(JSON.stringify(data)) // JSON.stringify(data)
    }
}