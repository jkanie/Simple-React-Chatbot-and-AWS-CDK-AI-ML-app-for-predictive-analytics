import React, { useState } from 'react';
// import React from 'react';
import logo from './logo.svg';
import './App.css';

import Chatbot from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";

function App0() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


const App: React.FC = () => {
  const [imageKey, setImageKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePredictClick = async () => {
    setIsLoading(true);

    try {
      // Rekognition
      const rekognitionRequest = {
        imageKey: imageKey,
      };
      const rekognitionResponse = await fetch('/Predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rekognitionRequest),
      });

      // Transcribe
      const transcribeRequest = {
        mediaFileUri: 's3://PredictiveAnalyticsBucket/your-audio-file.mp3',
      };
      const transcribeResponse = await fetch('/Predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transcribeRequest),
      });

      // Comprehend
      const comprehendRequest = {
        text: 'your-text-to-analyze',
      };
      const comprehendResponse = await fetch('/Predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comprehendRequest),
      });

      // Lex
      const lexRequest = {
        sessionId: 'your-session-id',
        text: 'user-input-text',
      };
      const lexResponse = await fetch('/Predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lexRequest),
      });

      // Process the responses and return the results
      // ...
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ margin: '5%', right: '25px' }}>
      <header className="App-header">
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </header>        
      <div style={{ color: 'lightgray' }}>
        <label htmlFor="imageKey">Image-key for AI-processing (predictive-analytics) :</label>
        <input type="text" id="imageKey" value={imageKey} onChange={(e) => setImageKey(e.target.value)} />
      </div>
      <button onClick={handlePredictClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Predict'}
      </button>
    </div>
  );
};

export default App;
