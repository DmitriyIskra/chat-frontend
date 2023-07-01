export default class Ws{
    constructor(domain) {
        this.ws = null;
        this.domain = domain;
        this.callDrawChat = null;
        this.closeChat = null;
    }

    init(callDrawChat) {

        // колбек в котором будет отрисовка данных
        this.callDrawChat = callDrawChat;

        this.ws = new WebSocket(this.domain);

        this.ws.addEventListener('open', (e) => {
            console.log(e);
        
            console.log('ws open')
        })
        
        this.ws.addEventListener('message', (e) => {
            console.log('event from messageEvent', e); 

            this.callDrawChat(e.data);

            console.log('ws message')
        })
        
        this.ws.addEventListener('error', (e) => {
            console.log(e);
        
            console.log('ws error')
        })
        
        this.ws.addEventListener('close', (e) => {
            console.log(e);

            console.log('ws close') 
        })

    }

    sendWs(data) {
        this.ws.send(data); // data
    }
} 







