import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Guitar } from '../shared/models/guitar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private firestore: AngularFirestore) { }

  loadRecentGuitars(items: number = 4): Observable<Guitar[]> {
    return this.firestore.collection<Guitar>("guitars", ref => ref
      .where("itemStatus", "==", "1")
      .orderBy("createdAt", "desc")
      .limit(items))
        .snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Guitar;
            return data;
          })
        )
      )
  }

}
