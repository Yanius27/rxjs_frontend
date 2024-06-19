import moment from 'moment';

export default class Message {
  constructor(id, email, subject, date) {
    this.id = id;
    this.email = email;
    this.subject = subject;
    this.date = date;
    this.#createMessage();
  }

  #createMessage() {
    const message = document.createElement('div');
    message.classList.add('message');
    message.setAttribute('id', this.id);

    const email = document.createElement('span');
    email.classList.add('email');
    email.classList.add('message_content');
    email.textContent = this.email;

    const subject = document.createElement('span');
    subject.classList.add('subject');
    subject.classList.add('message_content');

    if (this.subject.length > 15) {
      this.subject = this.subject.slice(0, 15) + '...';
    }

    subject.textContent = this.subject;
    
    const date = document.createElement('span');
    date.classList.add('date');
    date.classList.add('message_content');

    date.textContent = this.#fixDate();

    message.append(email, subject, date);
    
    this._element = message;
  }

  #fixDate() {
    const momentDate = moment.unix(this.date);
    return momentDate.format('HH:mm DD.MM.YYYY'); 
  }

  get element() {
    return this._element;
  }
}