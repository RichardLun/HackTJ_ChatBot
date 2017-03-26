import * as firebase from 'firebase'; // Import Firebase library

// Data to authenticate Firebase
const firebaseConfig = {
    apiKey: "AIzaSyALi7fMyxySaXh2EHZx358uZ4sBY4m-6t4",
    authDomain: "chat-9aa1c.firebaseapp.com",
    databaseURL: "https://chat-9aa1c.firebaseio.com",
    storageBucket: "chat-9aa1c.appspot.com",
    messagingSenderId: "214775420433"
};
// Initializing Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const Firebase = {
  turnOn(setState) {
    // gets reference to Firebase database and listens for changes
    this.messagesRef = firebaseApp.database().ref('messages');

    // When database value changes, we take the snapshot and iterate
    // through each item in the snapshot, and create an array of
    // newMessages
    this.messagesRef.on('value', (snapshot) => {
      // get children as an array
      var newMessages = [];
      snapshot.forEach((child) => {
        newMessages.push({
          name: child.val().name,
          message: child.val().message,
          key: child.key
        });
      });

      // Update the message list in state, triggering a re-render
      setState({
        messages: newMessages
      });
    });
  },

  turnOff() {
    this.messagesRef.off();
  },

  sendMessage(message) {
    this.messagesRef.push(message);
  }

};


export default Firebase;