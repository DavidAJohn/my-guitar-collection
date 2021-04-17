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

  loadGuitars(
    items: number = 3, 
    orderByField: string = "createdAt",
    orderDirection: "desc" | "asc" = "desc",
    includePrivate: boolean = false
  ): Observable<Guitar[]> {
    const arrPrivatePublic: string[] = ["1"];

    if (includePrivate == true) {
      arrPrivatePublic.push("0");
    }

    return this.firestore.collection<Guitar>("guitars", ref => ref
      .where("itemStatus", "in", arrPrivatePublic)
      .orderBy(orderByField, orderDirection)
      .limit(items))
        .snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Guitar;
            return data;
          })
        )
      )
  }

  loadGuitarsForPlayerCollection(
    items: number = 10, 
    orderByField: string = "createdAt",
    orderDirection: "desc" | "asc" = "desc",
    ownerId: string
  ): Observable<Guitar[]> {

    return this.firestore.collection<Guitar>("guitars", ref => ref
      .where("ownerId", "==", ownerId)  
      .where("itemStatus", "in", ["0", "1"])
      .orderBy(orderByField, orderDirection)
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
