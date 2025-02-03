// Navbar // Toggle Menu JS Script Start //
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open'); // Toggle the menu visibility
        navLinks.classList.toggle('active');
    });
});
// Navbar // Toggle Menu JS Script End //

// FAQ question JS Script //
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');

            // Toggle answer visibility
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                arrow.classList.remove('open');
            } else {
                answer.style.display = 'block';
                arrow.classList.add('open');
            }
        });
    });
});


// Add event listeners to the dropdown buttons
document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', function () {
        const listItem = this.closest('.list-item'); // Get the closest list item
        listItem.classList.toggle('active'); // Toggle the "active" class to show/hide the dropdown
    });
});
// FAQ question JS Script //
function toggleMenu() { const navLinks = document.querySelector('.nav-links'); navLinks.classList.toggle('show'); }
/////////////Chatbot/Widget/Script/for/all/Pages//////////////////////
const botResponses = {
    "hello": "Hi! How can I help you today?",
    "hi": "Hi! May I know your name?",
    "tell me about your company": "We offer software development, IT consulting, cloud solutions, and technical support. Which one are you interested in?",
    "what services do you offer": "We provide web development, mobile app development, cloud solutions, and technical consulting. Would you like more details?",
    "how can i contact you": "You can reach us at:\n📧 Email: contact@company.com\n📞 Phone: +919811500219\nWould you like to chat with us on WhatsApp?",
    "contact": "You can reach us at:\n📧 Email: contact@company.com\n📞 Phone: +919811500219\nWould you like to chat with us on WhatsApp?",
    "are there any job vacancies": "Yes, we are hiring for various positions in software development, marketing, and customer support. Please share your email, and we will send you the details.",
    "what type of job you offers": "We are hiring for various positions in software development, marketing, and customer support. Please share your email, and we will send you the details.",
    "how can i apply for a job": "You can send your updated resume to jobs@company.com. Our HR team will review it and get back to you.",
    "job": "You can send your updated resume to jobs@company.com. Our HR team will review it and get back to you.",
    "what is the recruitment process": "Our recruitment process includes an initial resume screening, a technical test, and an interview with the hiring manager. Do you have any specific questions about it?",
    "do you offer internships": "Yes, we offer internships in software development, data analysis, and design. Would you like to know more about the internship program? You can contact 📧 Email: contact@company.com\n📞 Phone: +919811500219\n",
    "internships": "Yes, we offer internships in software development, data analysis, and design. Would you like to know more about the internship program? You can contact 📧 Email: contact@company.com\n📞 Phone: +919811500219 ",
    "default": "I'm sorry, I didn't understand that. Could you please rephrase or ask something else?"


};

let userName = "";

// Function to toggle chatbot visibility
function toggleChatbot() {
    const chatbot = document.getElementById("chatbot-container");
    chatbot.style.display = chatbot.style.display === "none" || chatbot.style.display === "" ? "flex" : "none";
}

// Function to handle user messages and bot responses
function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    // Display user message
    appendMessage(userInput, "user-message");

    // Determine bot response
    let botReply = "";
    if (userInput.toLowerCase().startsWith("my name is")) {
        userName = userInput.slice(11);
        botReply = `Nice to meet you, ${userName}! How can I assist you?`;
    } else if (userInput.toLowerCase().includes("contact")) {
        botReply = botResponses["how can i contact you"];
        appendMessage(botReply, "bot-message");
        appendWhatsAppButton("+919811500219"); // Example WhatsApp number
        return;
    } else {
        botReply = botResponses[userInput.toLowerCase()] || botResponses["default"];
    }

    // Display bot message
    appendMessage(botReply, "bot-message");

    // Clear input and scroll to the bottom
    document.getElementById("user-input").value = "";
    document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
}

// Helper function to append messages
function appendMessage(message, className) {
    const messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.textContent = message;
    document.getElementById("chatbox").appendChild(messageDiv);
}

// Function to append WhatsApp button
// Function to append WhatsApp button
function appendWhatsAppButton(phoneNumber) {
    const button = document.createElement("button");
    button.textContent = "Chat on WhatsApp";
    button.onclick = function () {
        // URL to open WhatsApp Web with pre-filled number
        const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=Hi!`;
        window.open(url, "_blank");
    };
    const botMessageDiv = document.createElement("div");
    botMessageDiv.className = "bot-message";
    botMessageDiv.appendChild(button);
    document.getElementById("chatbox").appendChild(botMessageDiv);
}

/////////////Chatbot/Widget/Script/for/all/Pages//////////////////////
/////////Career/Page/Slider//&//Home/Page/slider///////
// Function to handle Enter key press
function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Universal Slider Logic
function initializeSlider(slideClass, containerClass) {
    let index = 0; // Start at the first image
    const slides = document.querySelectorAll(slideClass); // Select the slides based on the provided class
    const slidesContainer = document.querySelector(containerClass); // Select the container based on the provided class

    // Function to move the slider
    function moveSlide(direction) {
        index += direction;
        if (index < 0) {
            index = slides.length - 1; // Go to the last image if we're at the first one
        } else if (index >= slides.length) {
            index = 0; // Go to the first image if we're at the last one
        }

    }

    // Automatic sliding every 3 seconds
    setInterval(() => moveSlide(1), 3000);
}

// Initialize the first slider (generic page slider)
initializeSlider(".slideindex", ".slides-index");

// Initialize the second slider (career page slider)
initializeSlider(".slide-career", ".slides-career");

/////////Career/Page/Slider//&//Home/Page/slider///////

///////For///Career///Form/////////////

// Career Form Submission Logic //

// Contact Form Submission Logic \\

// Contact Form Submission Logic on Contact Page \\

// World Map Script on Contact Page \\

// World Map Script on Contact Page \\