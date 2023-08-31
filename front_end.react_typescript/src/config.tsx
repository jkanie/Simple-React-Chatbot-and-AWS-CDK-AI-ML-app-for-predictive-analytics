import { createChatBotMessage } from "react-chatbot-kit";
import LearningOptions from "./components/LearningOptions/LearningOptions";
import LinkList from "./components/LinkList/LinkList";

import IWidget from "react-chatbot-kit/build/src/interfaces/IWidget";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";
import chatGPT from "./chatgpt.svg";

const config: IConfig = {
  botName: "ChatBot",
  initialMessages: [
    createChatBotMessage(`Hi! I'm here to help. What would you like to learn about? or you can say 'hi' to me! (and hit enter) (for predictive-analytics, please use bottom-section of page)`, {
      widget: "learningOptions",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  customComponents: {
    botAvatar: (props: any) => <img src={chatGPT} alt="bot" {...props} />,
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "BC COVID info",
            url:
              "https://www2.gov.bc.ca/gov/content/covid-19",
            id: 1,
          },
          {
            text: "BC COVID translations",
            url:
              "https://www2.gov.bc.ca/gov/content/covid-19/translation",
            id: 2,
          },
          {
            text: "BC COVID digital-assistant",
            url: "https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/about-the-digital-assistant",
            id: 3,
          },
        ],
      },
    },
  ] as IWidget[],
};

export default config;