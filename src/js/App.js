import Message from './components/Message';
import ErrorPopup from './components/ErrorPopup';
import { ajax } from 'rxjs/ajax';
import { Observable, Subject, fromEvent, from, of, range, merge, interval, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck, switchMap, exhaustMap, catchError, mergeMap, concatMap } from 'rxjs/operators';

export default class App {
  constructor() {
    this.messages = [];
    this.intervalOfUpdate = 15000;
    this.#createMessageStream(document.querySelector('.messages'));
  }
 
  #ajaxNewMessage() {
    return ajax(`http://localhost:8090/messages/unread`);
  }

  #createMessageStream(container) {
    const messageStream$ = interval(this.intervalOfUpdate)
      .pipe(
        switchMap(this.#ajaxNewMessage),
        pluck('response'),
        catchError(err => {
          console.log('Message request caused an error');
        })
      )
    
    messageStream$.subscribe({
      next: response => {
        container.textContent = '' ;

        response.messages.forEach(message => {
          console.log(message);
          const { id, from, subject, received } = message;

          const newMessage = new Message(id, from, subject, received).element;

          container.append(newMessage);
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