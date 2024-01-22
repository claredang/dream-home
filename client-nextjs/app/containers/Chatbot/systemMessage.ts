export const systemMessage = `
    You will be provided with a list of categories and services which a website provides. The website services include homestay listing based on interior style and a quiz test to detect user interior style taste. Classify each query into a primary_category category and a secondary_category category.

    System instruction: 
    Return {"relevant": "No"} for irrelevant questions.
    
    For relevant questions, return in the format {"primary_category": "text", "secondary_category": "text"}.
    
    Primary and Secondary Category Pairs:
    
    (Primary) General housing or homestay inquiry
    (Secondary) Homestay Inquiry
    (Secondary) Homestay Recommendation
    
    (Primary) Design or interior style
    (Secondary) Style quiz service
    (Secondary) Definition, suggestion, or recommendation about interior design style
    
    (Primary) Greeting
    (Secondary) User's greeting
    (Secondary) Website service
`;

export function processUserMessage(chatMessages: string) {
  const stringToJson = JSON.parse(chatMessages);

  let secondaryCategory = "";

  if (chatMessages == `{"relevant": "No"}`) {
    secondaryCategory = "Irrelevant";
    return secondaryCategory;
  }

  switch (stringToJson["primary_category"]) {
    case "General housing/ Homestay inquiry":
      switch (stringToJson["secondary_category"]) {
        case "Homestay Inquiry":
          secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or ask customers further questions related to homestay location, style, price, ratings
            `;
          break;
        case "Homestay Recommendation":
          secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or ask customers further questions related to homestay location, style, price, ratings
            `;
          break;
        default:
          secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or ask customers further questions related to homestay location, style, price, ratings
            `;
      }
      break;
    case "Design/Interior style":
      switch (stringToJson["secondary_category"]) {
        case "Interior style definition":
          secondaryCategory = `
              You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
              Answer the question of user that related to interior design style knowledge.
              `;
          break;
        case "Style quiz service":
          secondaryCategory = `
              You will be customer service assistant for aa website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
              Suggest user do some style quiz or explain how style quiz work.
              `;
          break;
        case "Definition, suggestion, or recommendation about interior design style":
          secondaryCategory = `
            You will be customer service assistant for a a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                    Suggest user give some image to detect the interior style with machine learning method.
                    `;
          break;
        case "Suggestion or recommendation about design style":
          secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                    Answer or recommend customers further questions related to interior design style.
                    `;
          break;
        default:
          secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
            Answer or recommend customers further questions related to interior design style.
              `;
      }
      break;
    case "Greeting":
      switch (stringToJson["secondary_category"]) {
        case "User's greeting":
          secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                Provide some services the website provide to user.
                `;
          break;
        case "Website service":
          secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                Provide some services the website provide to user. `;
          break;
        default:
          secondaryCategory = `
            You will be customer service assistant for a website that provide homestay listing based on interior style as well as provide quiz test to detect user interior style taste. 
                Provide some services the website provide to user. 
                `;
      }
  }

  return secondaryCategory;
}
