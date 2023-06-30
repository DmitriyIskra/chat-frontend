export default class ControlChat{
    constructor(redrawChat) {
        this.redrawChat = redrawChat;
        this.chat = this.redrawChat.chat;

        this.onClick = this.onClick.bind(this);
    }

    init() {
        this.chat.addEventListener('click', this.onClick);
    }

    onClick(e) {
        if(e.target.closest('.login__button-send')) {
            const name = this.redrawChat.typeName.value;

            // this.redrawChat.checkUser(name)
            this.redrawChat.createUser(name)
        }
    }
}