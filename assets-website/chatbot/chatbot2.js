// Constants and Configuration
const CONFIG = {
    TYPING_SPEED: 25,
    STORAGE_KEYS: {
        USER_DETAILS: 'userDetails',
        LANGUAGE: 'selectedLanguage',
        USER_SELECTIONS: 'userSelections'
    }
};

const TRANSLATIONS = {
    en: {
        welcome: {
            returning: (name) => `Welcome back, ${name}!`,
            new: (name) => `Nice to meet you, ${name}! Thank you for providing information`
        },
        prompts: {
            language: 'Hi there 👋<br>Choose your preferred language:',
            firstName: 'What is your first name?',
            lastName: 'What is your last name?',
            email: 'What is your email address?',
            phone: 'What is your phone number?',
            class: 'Please select your class:',
            subject: 'Please select your preferred subjects:'
        },
        validation: {
            email: 'That doesn\'t look like a valid email. Please try again.',
            phone: 'That doesn\'t look like a valid phone number. Please try again.'
        },
        support: {
            thankyou: '✨ Thank you for providing the information! Your inquiry has been received. 📨 We\'ll get back to you shortly! 😊',
            contact: {
                title: '🤝 Centroid Support is here to help you!',
                phone: '📞 Phone Number: +91 84259 00755',
                whatsapp: '💬 WhatsApp: +91 7777 081 417',
                email: '📧 Email: centroidthane@gmail.com'
            }
        }
    },
    hi: {
        welcome: {
            returning: (name) => `स्वागत है, ${name}!`,
            new: (name) => `आपसे मिलकर खुशी हुई, ${name}! जानकारी प्रदान करने के लिए धन्यवाद`
        },
        prompts: {
            language: 'नमस्ते 👋<br>अपनी पसंदीदा भाषा चुनें:',
            firstName: 'आपका पहला नाम क्या है?',
            lastName: 'आपका उपनाम क्या है?',
            email: 'आपका ईमेल पता क्या है?',
            phone: 'आपका फोन नंबर क्या है?',
            class: 'कृपया अपनी कक्षा का चयन करें:',
            subject: 'कृपया अपनी पसंदीदा विषयों का चयन करें:'
        },
        validation: {
            email: 'यह वैध ईमेल नहीं लगता है। कृपया पुनः प्रयास करें।',
            phone: 'यह वैध फोन नंबर नहीं लगता है। कृपया पुनः प्रयास करें।'
        },
        support: {
            thankyou: '✨ जानकारी प्रदान करने के लिए धन्यवाद! आपकी पूछताछ प्राप्त हो गई है। 📨 हम जल्द ही आपसे संपर्क करेंगे! 😊',
            contact: {
                title: '🤝 Centroid Support आपकी सहायता के लिए यहाँ है!',
                phone: '📞 फोन नंबर: +91 84259 00755',
                whatsapp: '💬 व्हाट्सएप: +91 7777 081 417',
                email: '📧 ईमेल: centroidthane@gmail.com'
            }
        }
    },
    mr: {
        welcome: {
            returning: (name) => `स्वागत आहे, ${name}!`,
            new: (name) => `तुमचं स्वागत आहे, ${name}! माहिती दिल्याबद्दल धन्यवाद`
        },
        prompts: {
            language: 'नमस्कार 👋<br>कृपया तुमची पसंतीची भाषा निवडा:',
            firstName: 'तुमचं पहिले नाव काय आहे?',
            lastName: 'तुमचं आडनाव काय आहे?',
            email: 'तुमचं ईमेल काय आहे?',
            phone: 'तुमचा फोन नंबर काय आहे?',
            class: 'कृपया तुमचं वर्ग निवडा:',
            subject: 'कृपया तुमच्या आवडत्या विषयांचा निवडा:'
        },
        validation: {
            email: 'हे वैध ईमेल दिसत नाही. कृपया पुन्हा प्रयत्न करा.',
            phone: 'हे वैध फोन नंबर दिसत नाही. कृपया पुन्हा प्रयत्न करा.'
        },
        support: {
            thankyou: '✨ माहिती प्रदान केल्याबद्दल धन्यवाद! तुमचा प्रश्न प्राप्त झाला आहे. 📨 आम्ही लवकरच तुमच्याशी संपर्क करू! 😊',
            contact: {
                title: '🤝 Centroid Support तुमच्या सहाय्य साठी इथे आहे!',
                phone: '📞 फोन नंबर: +91 84259 00755',
                whatsapp: '💬 व्हाट्सएप: +91 7777 081 417',
                email: '📧 ईमेल: centroidthane@gmail.com'
            }
        }
    }
};

class ChatBot {
    constructor() {
        this.initializeState();
        this.injectChatbotHTML(); // Move this before initializeElements
        this.initializeElements();
        this.bindEvents();
        this.setupInitialChat();
        this.injectStyles(); // Add required styles
    }
    showClassSelection() {
        const classOptions = ['Class 7', 'Class 8', 'Class 9'];
        this.addSelectableOptions(
            this.getTranslation('prompts.class'),
            classOptions,
            (selectedClass) => {
                this.storeUserSelection('selectedClass', selectedClass);
                this.showSubjectSelection();
            }
        );
    }

    showSubjectSelection() {
        const subjectOptions = ['Math', 'Science', 'English', 'History'];
        this.addSelectableOptions(
            this.getTranslation('prompts.subject'),
            subjectOptions,
            (selectedSubject) => {
                this.storeUserSelection('selectedSubject', selectedSubject);
                this.showSupportMessage();
            }
        );
    }

    storeUserSelection(key, value) {
        let userSelections = JSON.parse(localStorage.getItem('userSelections')) || {};
        userSelections[key] = value;
        localStorage.setItem('userSelections', JSON.stringify(userSelections));
        this.scrollToBottom();
    }

    getUserSelection(key) {
        let userSelections = JSON.parse(localStorage.getItem('userSelections')) || {};
        return userSelections[key];
    }

    initializeState() {
        this.userData = {
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            language: localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE)
        };
        this.loadStoredData();
        this.isOpen = false; // Add state for tracking chatbot visibility
    }

    initializeElements() {
        this.elements = {
            chatbotContainer: document.querySelector(".chatbot"),
            toggler: document.querySelector(".chatbot-toggler"),
            closeBtn: document.querySelector(".close-btn"),
            chatbox: document.querySelector(".chatbox"),
            input: document.querySelector(".chat-input textarea"),
            sendBtn: document.querySelector(".chat-input span")
        };
    }

    injectChatbotHTML() {
        const chatbotTemplate = `
        <button class="chatbot-toggler">
          <span class="material-symbols-outlined">${this.getBotIcon()}</span>
          <span class="material-symbols-outlined">${this.getCloseIcon()}</span>
        </button>
        <div class="chatbot">
          <header>
            <h2>Centroid Support</h2>
            <span class="close-btn material-symbols-outlined">${this.getCloseIcon()}</span>
          </header>
          <ul class="chatbox"></ul>
          <div class="chat-input">
            <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
            <span id="send-btn" class="material-symbols-rounded">send</span>
          </div>
        </div>
      `;
        document.body.insertAdjacentHTML('beforeend', chatbotTemplate);
    }

    bindEvents() {
        if (this.elements.toggler) {
            this.elements.toggler.addEventListener("click", () => this.toggleChatbot());
        }
        
        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener("click", () => this.closeChatbot());
        }
        
        if (this.elements.sendBtn) {
            this.elements.sendBtn.addEventListener("click", () => this.handleUserInput());
        }
        
        if (this.elements.input) {
            this.elements.input.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    this.handleUserInput();
                }
            });
        }
        
        if (this.elements.chatbox) {
            this.elements.chatbox.addEventListener("click", (e) => this.handleOptionSelection(e));
        }
    }
    // Add these new methods for toggle functionality
    toggleChatbot() {
        this.isOpen = !this.isOpen;
        this.elements.chatbotContainer.classList.toggle("show", this.isOpen);
        this.elements.toggler.classList.toggle("show", this.isOpen);
    }

    closeChatbot() {
        this.isOpen = false;
        this.elements.chatbotContainer.classList.remove("show");
        this.elements.toggler.classList.remove("show");
    }
    // UI Methods
    injectStyles() {
        const styles = `
            .chatbot {
                position: fixed;
                right: 35px;
                bottom: 90px;
                width: 420px;
                background: #fff;
                border-radius: 15px;
                overflow: hidden;
                opacity: 0;
                pointer-events: none;
                transform: scale(0.5);
                transform-origin: bottom right;
                box-shadow: 0 0 128px 0 rgba(0,0,0,0.1),
                            0 32px 64px -48px rgba(0,0,0,0.5);
                transition: all 0.1s ease;
            }

            .chatbot.show {
                opacity: 1;
                pointer-events: auto;
                transform: scale(1);
            }

            .chatbot-toggler {
                position: fixed;
                bottom: 30px;
                right: 35px;
                outline: none;
                border: none;
                height: 50px;
                width: 50px;
                display: flex;
                cursor: pointer;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: #724ae8;
                transition: all 0.2s ease;
            }

            .chatbot-toggler span {
                color: #fff;
            }

            .chatbot-toggler.show span:first-child {
                display: none;
            }

            .chatbot-toggler.show span:last-child {
                display: block;
            }
        `;
        
        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    createChatMessage(message, type = 'incoming') {
        const li = document.createElement("li");
        li.classList.add("chat", type);
        li.innerHTML = type === "outgoing"
            ? `<p>${message}</p>`
            : `<span class="material-symbols-outlined">${this.getBotIcon()}</span><p>${message}</p>`;
        return li;
    }

    async typeMessage(message, type = 'incoming') {
        const li = this.createChatMessage('', type);
        this.elements.chatbox.appendChild(li);
        const textElement = li.querySelector('p');

        for (let i = 0; i < message.length; i++) {
            textElement.textContent += message[i];
            await this.delay(CONFIG.TYPING_SPEED);
        }
        this.scrollToBottom();
    }

    addSelectableOptions(prompt, options, callback) {
        this.elements.chatbox.appendChild(this.createChatMessage(prompt));

        const optionsList = document.createElement('ul');
        optionsList.classList.add('select-options');

        options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            button.addEventListener('click', () => {
                this.handleOptionSelected(option, callback);
                optionsList.remove();
            });

            const li = document.createElement('li');
            li.appendChild(button);
            optionsList.appendChild(li);
        });

        this.elements.chatbox.appendChild(optionsList);
    }

    // Data Handling Methods
    loadStoredData() {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_DETAILS);
        if (stored) {
            this.userData = { ...this.userData, ...JSON.parse(stored) };
        }
    }

    saveUserData() {
        localStorage.setItem(
            CONFIG.STORAGE_KEYS.USER_DETAILS,
            JSON.stringify(this.userData)
        );
    }

    // Flow Control Methods
    async handleUserInput() {
        const message = this.elements.input.value.trim();
        if (!message) return;

        this.elements.chatbox.appendChild(this.createChatMessage(message, 'outgoing'));
        this.elements.input.value = '';
        await this.processUserInput(message);
        this.scrollToBottom();
    }

    async processUserInput(input) {
        if (!this.userData.language) {
            this.setLanguage(input);
        } else if (!this.userData.firstName) {
            this.userData.firstName = input;
            this.continueFlow();
        } else if (!this.userData.lastName) {
            this.userData.lastName = input;
            this.continueFlow();
        } else if (!this.userData.email) {
            if (this.validateEmail(input)) {
                this.userData.email = input;
                this.continueFlow();
            } else {
                await this.typeMessage(this.getTranslation('validation.email'));
            }
        } else if (!this.userData.phoneNumber) {
            if (this.validatePhone(input)) {
                this.userData.phoneNumber = input;
                this.saveUserData();
                this.continueFlow();
            } else {
                await this.typeMessage(this.getTranslation('validation.phone'));
            }
        }
    }

    async continueFlow() {
        if (!this.userData.firstName) {
            await this.typeMessage(this.getTranslation('prompts.firstName'));
        } else if (!this.userData.lastName) {
            await this.typeMessage(this.getTranslation('prompts.lastName'));
        } else if (!this.userData.email) {
            await this.typeMessage(this.getTranslation('prompts.email'));
        } else if (!this.userData.phoneNumber) {
            await this.typeMessage(this.getTranslation('prompts.phone'));
        } else {
            this.showClassSelection();
        }
    }

    // Utility Methods
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    scrollToBottom() {
        this.elements.chatbox.scrollTo({
            top: this.elements.chatbox.scrollHeight,
            behavior: 'smooth'
        });
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    getTranslation(key) {
        return TRANSLATIONS[this.userData.language]?.key || TRANSLATIONS.en[key];
    }

    getBotIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-robot" viewBox="0 0 15 15">
        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
      </svg>`;
    }

    getCloseIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
      </svg>`;
    }

    showSupportMessage() {
        const supportHTML = `
        <div class="support-message">
          <p>${this.getTranslation('support.thankyou')}</p>
          <p>${this.getTranslation('support.contact.title')}</p>
          <p>${this.getTranslation('support.contact.phone')}</p>
          <p>${this.getTranslation('support.contact.whatsapp')}</p>
          <p>${this.getTranslation('support.contact.email')}</p>
        </div>
      `;
        this.elements.chatbox.insertAdjacentHTML('beforeend', supportHTML);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new ChatBot();
    chatbot.injectStyles(); 
});
