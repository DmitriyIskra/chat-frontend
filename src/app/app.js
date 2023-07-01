import ControlChat from "./controlChat";
import RedrawChat from "./RedrawChat";
import UserApi from "./api/userApi";
import MessageApi from './api/MessageApi';
import Pattern from "./Pattern";
import Ws from "./api/ws";
import { v4 } from 'uuid';

const chat = document.querySelector('.chat');
const formMessage = chat.querySelector('.form-type-message');
const valueMessage = formMessage.querySelector('.type-message');
console.log(formMessage)

const pattern = new Pattern();

const userApi = new UserApi('http://localhost:7000');

const radrawChat = new RedrawChat(chat, pattern, v4, userApi);

const controlChat = new ControlChat(radrawChat, Ws, formMessage, valueMessage);

controlChat.init()