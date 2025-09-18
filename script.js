document.addEventListener('DOMContentLoaded', function() {

    // --- SMOOTH SCROLL & GENERAL ANIMATIONS ---
    // Add animations to elements as they scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-section, .features-section, .contact-section, .page-header, .hub-grid, .current-weather-display, .price-tickers, .forum-container').forEach(section => {
        observer.observe(section);
    });


    // --- AI CHATBOT PAGE LOGIC ---
    if (document.body.classList.contains('ai-page-body')) {
        const chatWindow = document.querySelector('.ai-chat-window');
        const inputField = document.querySelector('.ai-input-area input');
        const sendButton = document.querySelector('.ai-send-button');
        const suggestedQuestions = document.querySelectorAll('.question-card');

        const predefinedAnswers = {
            "compare-fertilizers": "When comparing fertilizers for rice in clay soil, Urea is high in nitrogen, promoting leaf growth, but can acidify soil over time. A balanced NPK (like 10-26-26) provides essential nutrients for root development and grain filling. For organic options, compost or vermicompost improves soil structure and provides slow-release nutrients. For your situation, a balanced NPK is likely the most effective choice.",
            "identify-disease": "Based on an image of a tomato leaf with yellow spots and a fuzzy mold, it is likely Early Blight. To manage it, ensure good air circulation, avoid overhead watering, and apply a copper-based fungicide. Remove and destroy affected leaves immediately to prevent spread.",
            "crop-rotation": "A good 3-year crop rotation plan could be: <br> • <strong>Year 1:</strong> Legumes (like soybeans or peas) to fix nitrogen in the soil. <br> • <strong>Year 2:</strong> Leafy Greens or Brassicas (like cabbage or cauliflower) which will use the stored nitrogen. <br> • <strong>Year 3:</strong> Root Crops (like potatoes or carrots) or Maize, which have different nutrient needs and root depths. <br> This breaks pest cycles and improves soil health.",
            "pm-kisan": "The PM-KISAN scheme is a government initiative that provides income support of ₹6,000 per year to all eligible farmer families. The amount is paid in three equal installments. To apply, you can visit the official PM-KISAN portal online or contact your nearest Common Service Center (CSC)."
        };

        // Function to add a message to the chat
        const addMessage = (message, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender} new`;
            messageDiv.innerHTML = `<p>${message}</p>`;
            chatWindow.appendChild(messageDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        };

        // Function to simulate AI typing
        const showTypingIndicator = () => {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message ai typing-indicator';
            typingDiv.innerHTML = `<p><span></span><span></span><span></span></p>`;
            chatWindow.appendChild(typingDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;
            return typingDiv;
        };
        
        // SIMULATED Gemini API call
        const fetchGeminiResponse = async (query) => {
            const typingIndicator = showTypingIndicator();
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            let response = "I am a demo AI. For this query, I would typically analyze soil type, weather patterns, and crop history. A recommended action would be to perform a soil test to check pH and nutrient levels before applying any new fertilizers. This ensures optimal crop health and resource management.";
            
            chatWindow.removeChild(typingIndicator);
            addMessage(response, 'ai');
        };

        // Handle sending a message
        const handleSendMessage = () => {
            const query = inputField.value.trim();
            if (query) {
                addMessage(query, 'user');
                inputField.value = '';
                fetchGeminiResponse(query);
            }
        };
        
        sendButton.addEventListener('click', handleSendMessage);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });

        // Handle clicking on suggested questions
        suggestedQuestions.forEach(card => {
            card.addEventListener('click', () => {
                const userQuestion = card.querySelector('h4').textContent + " " + card.querySelector('p').textContent;
                const answerKey = card.dataset.key;
                const aiAnswer = predefinedAnswers[answerKey];

                addMessage(userQuestion, 'user');
                
                const typingIndicator = showTypingIndicator();
                setTimeout(() => {
                    chatWindow.removeChild(typingIndicator);
                    if (aiAnswer) {
                        addMessage(aiAnswer, 'ai');
                    }
                }, 1500);
            });
        });
    }


    // --- KNOWLEDGE HUB PAGE LOGIC ---
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.previousElementSibling;
            content.classList.toggle('expanded');
            if (content.classList.contains('expanded')) {
                button.innerHTML = 'Read Less &uarr;';
            } else {
                button.innerHTML = 'Read More &darr;';
            }
        });
    });


    // --- WEATHER PAGE LOGIC ---
    if (document.querySelector('.location-tabs')) {
        const weatherData = {
            "New Delhi": { temp: 28, condition: "Mostly Sunny", humidity: 65, wind: 10, precipitation: 5, uv: "High", sunrise: "5:45 AM", sunset: "7:15 PM" },
            "Mumbai": { temp: 31, condition: "Humid & Cloudy", humidity: 88, wind: 15, precipitation: 40, uv: "Moderate", sunrise: "6:10 AM", sunset: "7:05 PM" },
            "Bengaluru": { temp: 24, condition: "Light Rain", humidity: 85, wind: 12, precipitation: 60, uv: "Low", sunrise: "6:05 AM", sunset: "6:50 PM" },
            "Lucknow": { temp: 34, condition: "Hot & Sunny", humidity: 50, wind: 8, precipitation: 2, uv: "Very High", sunrise: "5:30 AM", sunset: "7:00 PM" },
        };

        const updateWeather = (location) => {
            const data = weatherData[location];
            document.querySelector('.main-temp').textContent = `${data.temp}°C`;
            document.querySelector('.main-condition').textContent = data.condition;
            document.querySelector('#humidity-val').textContent = `${data.humidity}%`;
            document.querySelector('#wind-val').textContent = `${data.wind} km/h`;
            document.querySelector('#precip-val').textContent = `${data.precipitation}%`;
            document.querySelector('#uv-val').textContent = data.uv;
            document.querySelector('#sunrise-val').textContent = data.sunrise;
            document.querySelector('#sunset-val').textContent = data.sunset;
        }

        document.querySelectorAll('.tab-link').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelector('.tab-link.active').classList.remove('active');
                tab.classList.add('active');
                updateWeather(tab.textContent);
            });
        });

        // Initialize with default location
        updateWeather('New Delhi');
    }


    // --- COMMUNITY PAGE LOGIC ---
    const modal = document.getElementById("community-modal");
    if (modal) {
        const closeModalBtn = document.querySelector(".close-button");
        const likeButtons = document.querySelectorAll(".like-button");

        document.querySelectorAll('.discussion-item').forEach(item => {
            item.addEventListener('click', () => {
                modal.style.display = "flex";
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });

        likeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent modal from closing if like is inside
                const countSpan = button.querySelector('span');
                let count = parseInt(countSpan.textContent);
                button.classList.toggle('liked');
                if (button.classList.contains('liked')) {
                    countSpan.textContent = count + 1;
                } else {
                    countSpan.textContent = count - 1;
                }
            });
        });
    }

});
