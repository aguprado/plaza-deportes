import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
 
@Injectable()
export class LoadingService {
 
  // Observable string sources
  private loadingAnnounceSource = new Subject<boolean>();
 
  // Observable string streams
  loadingAnnounced$ = this.loadingAnnounceSource.asObservable();
 
  // Service message commands
  loaderStart = () => { this.loadingAnnounceSource.next(true) }
  loaderStop = () => { this.loadingAnnounceSource.next(false) }
 
}