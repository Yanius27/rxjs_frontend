import Message from './components/Message';
import ErrorPopup from './components/ErrorPopup';
import { ajax } from 'rxjs/ajax';
import { Observable, Subject, fromEvent, from, of, range, merge, interval, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck, switchMap, exhaustMap, catchError, mergeMap, concatMap } from 'rxjs/operators';

export default class App {
  constructor() {
    this.messages = [];
    this.port = 8080;
    this.#createMessageStream();
  }
 
  #ajaxNewMessage() {
    return ajax('http://localhost:9090/messages/unread');
  }

  #createMessageStream() {
    const messageContainer = document.querySelector('.messages');

    const messageStream$ = interval(15000)
      .pipe(
        switchMap(this.#ajaxNewMessage),
        pluck('response')
      )
    
    messageStream$.subscribe({
      next: response => {
        messageContainer.textContent = '' ;

        response.messages.forEach(message => {
          console.log(message);
          const { id, from, subject, received } = message;

          const newMessage = new Message(id, from, subject, received).element;

          messageContainer.append(newMessage);
        });
      },

      error: err => {
        console.log('No message');
      },

      complete: () => {
        console.log('No message');
      }
    });

  }
  

}