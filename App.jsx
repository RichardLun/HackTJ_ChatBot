import React from 'react';
import Firebase from './firebase-wrapper'; // Import Firebase library
import Message from './components/Message.jsx';
import Input from './components/Input.jsx';
import style from './styles/App.less';

const App = React.createClass({
  getInitialState() {
    return {
      messages: [], // Initialize empty list of messages
      name: 'Bob',
      newMessage: ''
    };
  },

  componentWillMount() {
    Firebase.turnOn(newState => {
      this.setState(newState);
    });
  },

  componentWillUnmount() {
    Firebase.turnOff();
  },

  handleNameChange(event) {
    this.setState({name: event.target.value});
  },

  handleMessageChange(event) {
    this.setState({newMessage: event.target.value});
  },

  handleKeyPress(event) {
    const {name, newMessage} = this.state;
    // If name or newMessage are blank, do not send new message
    if (!name || !newMessage) {
      return;
    }

    // If user hits Enter key, then send message to Firebase database
    // and clear out the message box
    if (event.key === 'Enter') {
      Firebase.sendMessage({ name: name, message: newMessage });
      /*
      if(newMessage == "Hi" || newMessage == "hi"){
        Firebase.sendMessage({name: "God", message: "Well, looks like I have some company! :smiley:"});
      }
      if(newMessage == "Who are you" || newMessage == "who are you"){
        Firebase.sendMessage({name: "God", message: "Who am I? Why, I am God himself! The one and only. :sparkles:"});
      }
      if(newMessage == "Bye" || newMessage == "bye"){
        Firebase.sendMessage({name: "God", message: "Awww, leaving so soon? :weary:"});
      }
      if(newMessage == "Fuck you" || newMessage == "fuck you"){
        Firebase.sendMessage({name: "God", message: "Gladly!"});
      }
      else{
        Firebase.sendMessage({name: "God", message: "Sorry I didn't quite get that..."});
      }
      this.setState({newMessage: ''});
      */
    }
  },

  renderMessageDiv(message) {
    return <Message key={message.key} message={message}/>;
  },

  render() {
    // Iterates through the messages in state to create HTML elements
    // for each message
    const messageDivs = this.state.messages.map(this.renderMessageDiv);

    const {newMessage, name} = this.state;

    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <h2>ChatMe</h2>
          </div>
        </nav>
        <div className="container">
          <div className="eight columns messages">
            <div className="scrollview">
              {messageDivs}
            </div>
          </div>
          <div className="four columns">
            <Input label={'Message'} value={newMessage} onChange={this.handleMessageChange} onKeyPress={this.handleKeyPress} />
            <Input label={'Name'} value={name} onChange={this.handleNameChange} />
          </div>
        </div>
      </div>
    );
  }
});

export default App;