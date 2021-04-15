import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Guitar } from '../models/guitar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuitarsService {

  constructor(private firestore: AngularFirestore) { }

  loadRecentGuitars(items: number = 4): Observable<Guitar[]> {
    return this.firestore.collection<Guitar>("guitars", ref => ref
      .where("itemStatus", "==", "1") // only publically visible guitars
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
