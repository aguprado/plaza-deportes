import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
 
@Injectable()
export class LoadingService {
 
  // Observable string sources
  private loadingAnnounceSource = new Subject<boolean>();
 
  // Observable string streams
  public loadingAnnounced$ = this.loadingAnnounceSource.asObservable();
 
  // Service message commands
  public loaderStart = () => { this.loadingAnnounceSource.next(true) }
  public loaderStop = () => { this.loadingAnnounceSource.next(false) }
 
}