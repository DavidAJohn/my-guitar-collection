// This is a sample template for the environment.ts file
// The environment.ts file is generated dynamically via the scripts/setenv.ts file
// Check the package.json for the updated start and build scripts that achieve this
// Rename the .env.dev file to .env after adding your own values

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  },
  playerCollectionName: '',
  maxFileUploadSize: 1000000 // 1000000 = 1Mb
};
