// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyB9w3SwNBvLPnq4EKaLG6JLGqJoo2ORfH0',
    authDomain: 'my-guitar-collection.firebaseapp.com',
    databaseURL: 'https://my-guitar-collection.firebaseio.com',
    projectId: 'my-guitar-collection',
    storageBucket: 'my-guitar-collection.appspot.com',
    messagingSenderId: '576131668835',
    appId: '1:576131668835:web:ade8be8e75d626d1ea5156',
    measurementId: 'G-JKVZKK9T9L'
  },
  playerCollectionName: 'players',
  maxFileUploadSize: 5000000 // 1000000 = 1Mb
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
