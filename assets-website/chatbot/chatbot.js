document.addEventListener('DOMContentLoaded', function () {
  // Add these prompts to your language constants at the top
  const LANGUAGES = {
    en: {
      // ... existing language entries ...
      schoolPrompt: 'Please provide your school name:',
      queryPrompt: 'How may we assist you today? Please share your query:'
    },
    hi: {
      // ... existing language entries ...
      schoolPrompt: 'कृपया अपने स्कूल का नाम बताएं:',
      queryPrompt: 'हम आपकी कैसे सहायता कर सकते हैं? कृपया अपना प्रश्न साझा करें:'
    },
    mr: {
      // ... existing language entries ...
      schoolPrompt: 'कृपया तुमच्या शाळेचे नाव सांगा:',
      queryPrompt: 'आम्ही तुमची कशी मदत करू शकतो? कृपया तुमची शंका शेअर करा:'
    }
  };
  let selectedLanguage = localStorage.getItem('selectedLanguage'); // Check for saved language
  let userSelections = JSON.parse(localStorage.getItem('userSelections')) || {};
  // Function to store user's selection in the object and localStorage
  // Function to store user's selection in the object and localStorage
  function storeUserSelection(key, value, questionType) {
    console.log(key, value, questionType);
    if (questionType == "course") {
      course = value;
    } else if (questionType == "standard") {
      standard = value;
    }
    let userSelections = JSON.parse(localStorage.getItem('userSelections')) || {};
    userSelections[key] = value;
    localStorage.setItem('userSelections', JSON.stringify(userSelections));
    scrollToBottom()
  }
  // Scroll to the latest message whenever a new message is added
  const scrollToBottom = () => {
    chatbox.scrollTo({
      top: chatbox.scrollHeight,
      behavior: 'smooth'  // This ensures a smooth scroll, especially on mobile
    });
  };
  // Function to retrieve a selection by key
  function getUserSelection(key) {
    let userSelections = JSON.parse(localStorage.getItem('userSelections')) || {};
    return userSelections[key];
  }

  async function sendEnquiry({
    name,
    email,
    phoneNumber,
    language,
    course,
    standard,
    school,
    query
  }) {
    const url = "https://centroid-mailer.vercel.app/api/centroid/enquiry";

    const payload = {
      name,
      email,
      phoneNumber,
      language,
      course,
      standard,
      school,
      query
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text(); // or response.json() if JSON response is expected
      console.log("Response:", data);
      return data;
    } catch (error) {
      console.error("Error sending enquiry:", error.message);
      throw error;
    }
  }


  async function displayEndMessage(type) {
    let supportMessageHTML = '';
    let selectedLanguage = localStorage.getItem('selectedLanguage');
     // Creating enquiryData using globally defined variables
     const enquiryData = {
      name,
      email,
      phoneNumber,
      language,
      course,
      standard,
      school,
      query
  };

  console.log("Sending Enquiry:", JSON.stringify(enquiryData, null, 2));

 

    if (type == "support") {
      if (selectedLanguage == 'en') {
        supportMessageHTML = `
        <div class="support-message">
          <p>✨ Thank you for providing the information! Your inquiry has been received. 📨 We'll get back to you shortly! 😊</p>
          <p>🤝 <strong>Centroid Support</strong> is here to help you!</p>
          <p>📞 <strong>Phone Number</strong>: <a href="tel:+918425900755">+91 84259 00755</a></p>
          <p>💬 <strong>WhatsApp</strong>: <a href="https://wa.me/917777081417" target="_blank">+91 7777 081 417</a></p>
          <p>📧 <strong>Email</strong>: <a href="mailto:centroidthane@gmail.com">centroidthane@gmail.com</a></p>
        </div>
        `;
      } else if (selectedLanguage == 'hi') {
        supportMessageHTML = `
        <div class="support-message">
          <p>✨ जानकारी प्रदान करने के लिए धन्यवाद! आपकी पूछताछ प्राप्त हो गई है। 📨 हम जल्द ही आपसे संपर्क करेंगे! 😊</p>
          <p>🤝 <strong>Centroid Support</strong> आपकी सहायता के लिए यहाँ है!</p>
          <p>📞 <strong>फोन नंबर</strong>: <a href="tel:+918425900755">+91 84259 00755</a></p>
          <p>💬 <strong>व्हाट्सएप</strong>: <a href="https://wa.me/917777081417" target="_blank">+91 7777 081 417</a></p>
          <p>📧 <strong>ईमेल</strong>: <a href="mailto:centroidthane@gmail.com">centroidthane@gmail.com</a></p>
        </div>
        `;
      } else if (selectedLanguage == 'mr') {
        supportMessageHTML = `
        <div class="support-message">
          <p>✨ माहिती प्रदान केल्याबद्दल धन्यवाद! तुमचा प्रश्न प्राप्त झाला आहे. 📨 आम्ही लवकरच तुमच्याशी संपर्क करू! 😊</p>
          <p>🤝 <strong>Centroid Support</strong> तुमच्या सहाय्य साठी इथे आहे!</p>
          <p>📞 <strong>फोन नंबर</strong>: <a href="tel:+918425900755">+91 84259 00755</a></p>
          <p>💬 <strong>व्हाट्सएप</strong>: <a href="https://wa.me/917777081417" target="_blank">+91 7777 081 417</a></p>
          <p>📧 <strong>ईमेल</strong>: <a href="mailto:centroidthane@gmail.com">centroidthane@gmail.com</a></p>
        </div>
        `;
      }
      try {
          await sendEnquiry(enquiryData);
      } catch (error) {
          console.error("Failed to send enquiry:", error);
      } // The '2' adds indentation for better readability
      // Insert the generated support message HTML
      chatbox.insertAdjacentHTML('beforeend', supportMessageHTML);
    } else {
      console.log("Invalid message type.");
      alert("Invalid message type.");
    }

    localStorage.clear();
  }

  // Dynamically inject the chatbot HTML structure into the page
  const chatbotHtml = `
  <button class="chatbot-toggler">
    <span class="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-robot" viewBox="0 0 15 15">
      <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
      <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
    </svg></span>
    <span class="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
    </svg></span>
  </button>
  <div class="chatbot">
    <header>
      <h2>Centroid  Support <a href="tel:+918425900755">+91 84259 00755</a></h2>
      <span class="close-btn material-symbols-outlined" onclick="closeChatbot()"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
    </svg></span>
    </header>
    <ul class="chatbox"></ul>
    <div class="chat-input">
      <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
      <span id="send-btn" class="material-symbols-rounded">send</span>
    </div>
  </div>
  `; // Your existing HTML structure

  document.body.insertAdjacentHTML('beforeend', chatbotHtml);

  // Select the relevant elements
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".close-btn");
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");
  const languageOptions = document.querySelectorAll('.lang-option');

  let name = null;
  let email = null;
  let phoneNumber = null;
  let language = null;
  let course = null;
  let standard = null;
  let school = null;
  let query = null;
  localStorage.clear();
  // Create a new chat list item with the provided message and class
  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-robot" viewBox="0 0 15 15">
      <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
      <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
    </svg></span><p></p>`; // Your SVG here
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
  };

  // Function to simulate typing animation
  function typeMessage(message, className) {
    const chatLi = createChatLi('', className); // Create an empty message container
    chatbox.appendChild(chatLi);
    const textElement = chatLi.querySelector('p');

    let i = 0;
    const typingSpeed = 25; // Speed of typing in milliseconds

    function typeCharacter() {
      if (i < message.length) {
        textElement.textContent += message.charAt(i);
        i++;
        setTimeout(typeCharacter, typingSpeed); // Call recursively to type the next character
      }
    }

    typeCharacter(); // Start typing the message
    chatbox.scrollTo(0, chatbox.scrollHeight); // Scroll to the latest message
  }

  const generateResponse = () => {
    let selectedLanguage = localStorage.getItem('selectedLanguage');
    console.log(selectedLanguage);

    if (!selectedLanguage) {
      // const languagePromptMessage = 'Please select your preferred language to continue.';
      // typeMessage(languagePromptMessage, "incoming");
    } else if (!name) {
      const namePromptMessage = selectedLanguage === 'en'
        ? "May I know your name, please?"
        : selectedLanguage === 'hi'
          ? "क्या मैं आपका नाम जान सकता हूँ?"
          : "कृपया तुमचं नाव सांगाल का?";

      typeMessage(namePromptMessage, "incoming");
    } else if (!email) {
      const emailPromptMessage = selectedLanguage === 'en'
        ? "Could you please share your email address?"
        : selectedLanguage === 'hi'
          ? "क्या आप कृपया अपना ईमेल पता साझा कर सकते हैं?"
          : "कृपया तुमचं ईमेल सांगू शकता का?";

      typeMessage(emailPromptMessage, "incoming");
    } else if (!phoneNumber) {
      const phonePromptMessage = selectedLanguage === 'en'
        ? "May I kindly ask for your phone number?"
        : selectedLanguage === 'hi'
          ? "क्या आप कृपया अपना फोन नंबर साझा कर सकते हैं?"
          : "कृपया तुमचा फोन नंबर सांगू शकता का?";
      typeMessage(phonePromptMessage, "incoming");


    } else {
      processAfterUserDataStored();
    }
  };

  // Main function to handle the flow
  function processAfterUserDataStored() {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    let selectedLanguage = localStorage.getItem('selectedLanguage');

    if (storedUserDetails) {
      name = storedUserDetails.name;
      email = storedUserDetails.email;
      phoneNumber = storedUserDetails.phoneNumber;

      // Greet the user with dynamic language-based response
      const welcomeMessage = selectedLanguage === 'en' ?
        `Welcome back, ${name}!` :
        selectedLanguage === 'hi' ?
          `स्वागत है, ${name} !` :
          `स्वागत आहे, ${name} ! `;

      chatbox.appendChild(createChatLi(welcomeMessage, "incoming"));
    } else {
      // If user details are not stored, greet the new user and continue with the flow
      const newUserMessage = selectedLanguage === 'en' ?
        `Nice to meet you, ${name}! Thank you for providing information` :
        selectedLanguage === 'hi' ?
          `आपसे मिलकर खुशी हुई, ${name}! जानकारी प्रदान करने के लिए धन्यवाद` :
          `तुमचं स्वागत आहे, ${name}! माहिती दिल्याबद्दल धन्यवाद`;

      chatbox.appendChild(createChatLi(newUserMessage, "incoming"));

      localStorage.setItem('userDetails', JSON.stringify({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        language: language
      }));
    }

    // After greeting, check if class selection exists
    const selectedClass = getUserSelection('selectedClass');
    if (!selectedClass) {
      // If class is not selected, show class selection options
      const coursePromptMessage = selectedLanguage === 'en' ?
        'Please select your course:' :
        selectedLanguage === 'hi' ?
          'कृपया अपनी अवधि का चयन करें:' :
          'कृपया तुमचा अभ्यासक्रम निवडा:';


      const courseOptions = ['ENGINEERING', 'NEET UG', 'SRIJAN BATCH (FOUNDATION COURSE)', 'OLYMPIADS', 'OTHERS'];
      // below addd other prompts and options
      const standardPromptMessage = selectedLanguage === 'en' ?
        'Kindly select your standard:' :
        selectedLanguage === 'hi' ?
          'कृपया अपनी कक्षा चुनें।' :
          'कृपया तुमची इयत्ता निवडा.';



      const standardOptions = ['7th Standard', '8th Standard', '9th Standard', '10th Standard', 'OTHERS'];
      // MAKE TWO PROMPTS AND THEIR 

      // On selection, store class and move to the next step
      addSelectableOptions(coursePromptMessage, courseOptions, (selectedClass) => {
        storeUserSelection('selectedClass', selectedClass, "course"); // Store the selected class
        addSelectableOptions(standardPromptMessage, standardOptions, (selectedClass) => {
          storeUserSelection('selectedClass', selectedClass, "standard"); // Store the selected class
          if (!school) {
            const schoolPrompt = LANGUAGES[selectedLanguage].schoolPrompt;
            typeMessage(schoolPrompt, "incoming");
          }
          // displayEndMessage("support");

        });
        // displayEndMessage("support");

      });
    } else {
      // If class is already selected, show confirmation and ask for the next step
      const classSelectedMessage = selectedLanguage === 'en' ?
        `You have already selected ${selectedClass}. What would you like to do next?` :
        selectedLanguage === 'hi' ?
          `आपने पहले ही ${selectedClass} कक्षा का चयन किया है। अगला कदम क्या होगा?` :
          `तुम्ही आधीच ${selectedClass} वर्ग निवडला आहे. पुढे काय करायचं?`;

      chatbox.appendChild(createChatLi(classSelectedMessage, "incoming"));
    }
  }


  // Function to create and display selectable options
  function addSelectableOptions(promptMessage, options, onSelectionCallback) {
    // Display the prompt message
    chatbox.appendChild(createChatLi(promptMessage, "incoming"));

    // Create and display option buttons
    const optionsList = document.createElement('ul');
    optionsList.classList.add('select-options');

    options.forEach(option => {
      const optionItem = document.createElement('li');
      const button = document.createElement('button');
      button.classList.add('option-btn');
      button.textContent = option;
      button.addEventListener('click', () => {
        chatbox.appendChild(createChatLi(option, "outgoing"));

        // Store the selected option in localStorage
        onSelectionCallback(option);

        // Hide the options list after a selection is made
        optionsList.style.display = 'none';
      });
      optionItem.appendChild(button);
      optionsList.appendChild(optionItem);
    });

    chatbox.appendChild(optionsList);
  }



  // Handle sending user's details after they are typed
  sendChatBtn.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      chatbox.appendChild(createChatLi(userMessage, "outgoing"));
      chatInput.value = ""; // Clear input
      processUserMessage(userMessage);
    }
    scrollToBottom()
  });

  // Add event listener for 'Enter' key to send message
  chatInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) { // Prevent new line when Shift is held
      event.preventDefault(); // Prevent default Enter key behavior
      const userMessage = chatInput.value.trim();
      if (userMessage) {
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatInput.value = ""; // Clear input
        processUserMessage(userMessage);
      }
      scrollToBottom()

    }
  });


  function processUserMessage(userMessage) {
    let selectedLanguage = localStorage.getItem('selectedLanguage');
    console.log(selectedLanguage);

    if (!name) {
      name = userMessage;
      // typeMessage('Got your first name!', "incoming");
      generateResponse();
    } else if (!email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(userMessage)) {
        email = userMessage;
        // typeMessage('Got your email!', "incoming");
        generateResponse();
      } else {
        // Validate email and pass dynamic message based on the selected language
        const emailValidationMessage = selectedLanguage === 'en' ?
          'That doesn\'t look like a valid email. Please try again.' :
          selectedLanguage === 'hi' ?
            'यह वैध ईमेल नहीं लगता है। कृपया पुनः प्रयास करें।' :
            'हे वैध ईमेल दिसत नाही. कृपया पुन्हा प्रयत्न करा.';

        // Trigger the response
        typeMessage(emailValidationMessage, "incoming");
      }
    } else if (!phoneNumber) {
      const phoneRegex = /^[0-9]{10}$/; // Adjust as per the desired phone number format
      if (phoneRegex.test(userMessage)) {
        phoneNumber = userMessage;
        // typeMessage('Got your phone number!', "incoming");
        generateResponse();
      } else {
        // Validate phone number and pass dynamic message based on the selected language
        const phoneValidationMessage = selectedLanguage === 'en' ?
          'That doesn\'t look like a valid phone number. Please try again.' :
          selectedLanguage === 'hi' ?
            'यह वैध फोन नंबर नहीं लगता है। कृपया पुनः प्रयास करें।' :
            'हे वैध फोन नंबर दिसत नाही. कृपया पुन्हा प्रयत्न करा.';

        // Trigger the response
        typeMessage(phoneValidationMessage, "incoming");
      }
    } else if (!school) {
      school = userMessage;
      if (!query) {
        const queryPrompt = LANGUAGES[selectedLanguage].queryPrompt;
        typeMessage(queryPrompt, "incoming");
      }
    } else if (!query) {
      query = userMessage;
      displayEndMessage("support");
    }
  }

  // Check if user details exist in local storage
  const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
  if (storedUserDetails) {
    name = storedUserDetails.name;
    email = storedUserDetails.email;
    phoneNumber = storedUserDetails.phoneNumber;
    language = storedUserDetails.language;
    generateResponse();
    // displayEndMessage("support");

    // displayEndMessage("inquiry");
  }


  if (!language) {
    // Inject the language selection question
    const languageQuestion = `
      <li class="chat incoming">
        <span class="material-chat incomingsymbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-robot" viewBox="0 0 15 15">
      <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
      <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
    </svg></span>
      <div class="lang-flex">
          <p class="lang-select">Hi there 👋<br>Choose your preferred language:</p>
          <ul class="language-options">
            <li><button class="lang-option" data-lang="en">English</button></li>
            <li><button class="lang-option" data-lang="hi">Hindi</button></li>
            <li><button class="lang-option" data-lang="mr">Marathi</button></li>
          </ul>
      </div>
 
      </li>
    `;
    chatbox.insertAdjacentHTML('beforeend', languageQuestion);
  } else {
    // Skip language prompt if already selected
    // generateResponse();

  }
  // Event delegation: Listen for clicks on language options
  chatbox.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.lang-option')) {
      language = e.target.getAttribute('data-lang');
      localStorage.setItem('selectedLanguage', language); // Save the selected language
      chatbox.querySelector('.chat').style.display = 'none'; // Hide the language options
      generateResponse(); // Proceed with the next step
    }
  });
  // Close the chatbot when the close button is clicked
  // Get the close button and chatbox
  function closeChatbot() {
    // Clear local storage and reset variables
    localStorage.clear();
    name = null;
    email = null;
    phoneNumber = null;
    language = null;
    school = null;
    query = null;
    // Clear the chatbox content (all <li> elements)
    chatbox.innerHTML = '';  // This should work if chatbox is selected properly

    // Log the chatbox content after clearing
    console.log("Chatbox content cleared: ", chatbox.innerHTML);
  }

  closeBtn.addEventListener("click", () => {
    // Log the elements to ensure they're being targeted
    console.log("Close button clicked");
    console.log("Chatbox element: ", chatbox);

    // Remove the chatbot UI
    document.body.classList.remove("show-chatbot");
    closeChatbot()

  });


  window.closeChatbot = function () {
    console.log("hello I am from close modal");
    // document.body.classList.remove("show-chatbot");
    document.body.classList.remove("show-chatbot");
    closeChatbot()
  };

  // Toggle the visibility of the chatbot when the toggler button is clicked
  chatbotToggler.addEventListener("click", () => {
    const isChatbotOpen = document.body.classList.toggle("show-chatbot");
    console.log("so it is calling the toggler");
    // Log which SVG is being triggered
    if (isChatbotOpen) {
      console.log("Open SVG is active");
    } else {
      closeChatbot();
      console.log("Close SVG is active");
    }
    const existingLanguageQuestion = document.querySelector('.language-options');

    if (!language && !existingLanguageQuestion) {
      // Inject the language selection question
      const languageQuestion = `
        <li class="chat incoming">
          <span class="material-chat incomingsymbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-robot" viewBox="0 0 15 15">
        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
      </svg></span>
        <div class="lang-flex">
            <p class="lang-select">Hi there 👋<br>Choose your preferred language:</p>
            <ul class="language-options">
              <li><button class="lang-option" data-lang="en">English</button></li>
              <li><button class="lang-option" data-lang="hi">Hindi</button></li>
              <li><button class="lang-option" data-lang="mr">Marathi</button></li>
            </ul>
        </div>
   
        </li>
      `;
      chatbox.insertAdjacentHTML('beforeend', languageQuestion);
    }
  });

});






