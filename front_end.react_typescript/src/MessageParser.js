// MessageParser starter code in MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("yo")) {
        this.actionProvider.greet();
      }
  
      if (lowerCaseMessage.includes("javascript")) {
        this.actionProvider.handleCovidList();
      }
    }
  }
  
  export default MessageParser;