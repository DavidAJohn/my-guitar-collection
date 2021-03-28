import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";
import { environment } from "src/environments/environment";

export const fileSize = (control: AbstractControl): 
    Promise<{ [key: string]: any }> | 
    Observable<{ [key: string]: any }> => {

    if (!control.value || typeof(control.value) === 'string') {
        return of(null);
    }
    
    const file = control.value as File;
    const fileReader = new FileReader();
    const maxFileUploadSize = environment.maxFileUploadSize || 5000000; // 5Mb as default

    const frObs = new Observable(
        (observer: Observer<{ [key: string]: any }>) => {

        if (file.size < maxFileUploadSize ) {
            observer.next(null);
        } else {
            observer.next({ invalidFileSize: true });
        }
        observer.complete();
    });
        
    fileReader.readAsArrayBuffer(file);

    return frObs;
}
