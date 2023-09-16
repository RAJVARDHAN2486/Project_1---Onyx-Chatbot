// Function to append a message to the chat
function appendMessage(sender, message) {
    const chatMessages = document.getElementById("chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "user" ? "user-message" : "chatbot-message";
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to handle user input
function handleUserInput() {
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value;
    if (userMessage.trim() === "") return;

    // Display user message
    appendMessage("user", userMessage);

    // Send the user message to the chatbot and get the chatbot response
    const chatbotResponse = getChatbotResponse(userMessage);

    // Display chatbot response
    appendMessage("chatbot", chatbotResponse);

    userInput.value = "";
}

// Function to get a chatbot response based on user input
function getChatbotResponse(userMessage) {
    // Define conversation patterns and responses
    const responses = [
        // ... (existing conversation patterns and responses)
        {
            pattern: "hello|hi|hey",
            response: "Hello! How can I help you?"
        },
        {    
            pattern: "tell me a joke|joke|funny",
            response: "Sure, here's a joke: Why don't scientists trust atoms? Because they make up everything!"
        },
        {
            pattern: "who created you|who made you|developer",
            response: "I was created by Raj Vardhan using NLP technology."
        },
        {
            pattern: "weather in (.*)",
            response: "I can provide weather information, but I need to know the location. Please tell me the name of the city or place."
        },
        {
            pattern: "(.*) (city|place)",
            response: "The weather in {0} is currently {1}°C with {2} conditions."
        },
        {
            pattern: "how are you ?",
            response: "I'm just a computer program, so I don't have feelings, but I'm here to help! How can I assist you?"
        },
        {
            pattern: "what can you do for me?|what are your abilities?|how can you help me?",
            response: "I can provide information, answer questions, offer recommendations, and have a conversation with you. Just let me know what you need!"
        },
        {
            pattern: "(good|well|fine|great)",
            response: "That's wonderful to hear! How can I assist you further?"
        },
        {
            pattern: "(bad| not good|sad)",
            response: "I'm sorry to hear that. How can I make your day better?"
        },
        {
            pattern: "(.*) (love|like) you",
            response: "I'm flattered, but I'm just a computer program. How can I assist you today?"
        },
        {
            pattern: "tell me the time|current time",
            response: getISTTime
        },
        {
            pattern: "tell me the date|current date",
            response: getISTDate
        },
        {
            pattern: "(bye|goodbye|quit)",
            response: "Goodbye! Have a great day. If you have more questions, feel free to return."
        },
        {
            pattern: "(.*)",
            response: "I'm here to assist you. Please ask me a question or tell me what you'd like to do."
        },
        
        {
            pattern: "what's your favorite color|your favorite color",
            response: "I don't have a favorite color since I'm just a computer program, but I can help you find information on colors!"
        },
        {
            pattern: "tell me a fun fact",
            response: "Sure! Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!"
        },
        
        {
            pattern: "who is your favorite superhero|favorite superhero",
            response: "I don't have personal preferences, but some popular superheroes include Superman, Spider-Man, and Wonder Woman. Is there a superhero you like?"
        },
        {
            pattern: "what's the meaning of life|meaning of life",
            response: "The meaning of life is a philosophical question that has been debated for centuries. Some believe it's about finding happiness and fulfillment, while others have different interpretations. What do you think the meaning of life is?"
        },
        {
            pattern: "can you recommend a book|book recommendation",
            response: "Of course! What genre of books are you interested in? Fiction, non-fiction, fantasy, mystery, or something else?"
        },
        {
            pattern: "tell me a science fact|science",
            response: "Sure! Here's a science fact: The shortest war in history lasted only 38 minutes. It was fought between Britain and Zanzibar on August 27, 1896."
        },
        // ... (other conversation patterns)
    ];

    // Find a matching response
    for (const entry of responses) {
        const pattern = new RegExp(entry.pattern, "i");
        const match = userMessage.match(pattern);
        if (match) {
            if (entry.response === getISTTime || entry.response === getISTDate) {
                // For time and date responses, call the respective functions
                return entry.response();
            }
            if (entry.response.includes("{0}")) {
                // Replace {0}, {1}, {2}, etc. in the response with matched groups
                const response = entry.response.replace(/{(\d+)}/g, (match, groupIndex) => match.replace(groupIndex, match));
                return response;
            }
            return entry.response;
        }
    }

    // Default response if no match is found
    return "I'm here to assist you. Please ask me a question or tell me what you'd like to do.";
}

// Function to get the current time in IST
function getISTTime() {
    const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    return `The current time in IST is: ${currentDate}`;
}

// Function to get the current date in IST
function getISTDate() {
    const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const [date] = currentDate.split(", ");
    return `The current date in IST is: ${date}`;
}

// Handle user input when the "Send" button is clicked
const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", handleUserInput);

// Handle user input when the Enter key is pressed
const userInput = document.getElementById("user-input");
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleUserInput();
    }
});

// Greet the user when the page loads
appendMessage("chatbot", "Hello! How can I help you?");


