// ai chatbot for leo chang portfolio
// uses claude api through railway backend

class PortfolioChatbot {
    constructor() {
        this.conversationHistory = [];
        this.isOpen = false;
        this.isTyping = false;
        this.init();
    }

    init() {
        this.createChatbotWidget();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotWidget() {
        const chatbotHTML = `
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-header">
                    <div class="chatbot-header-left">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="chatbot-title">
                            <div class="chatbot-name">Sparky</div>
                            <div class="chatbot-status">
                                <span class="status-dot"></span>
                                <span>Online</span>
                            </div>
                        </div>
                    </div>
                    <div class="chatbot-header-right">
                        <button class="chatbot-minimize" id="minimizeChatbot">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="chatbot-close" id="closeChatbot">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="chatbot-messages" id="chatbotMessages"></div>
                <div class="chatbot-input-area">
                    <div class="chatbot-suggestions" id="chatbotSuggestions">
                        <button class="suggestion-btn" data-question="What projects has Leo worked on?">
                            <i class="fas fa-lightbulb"></i> What projects has Leo worked on?
                        </button>
                        <button class="suggestion-btn" data-question="Tell me about Leo's leadership experience">
                            <i class="fas fa-lightbulb"></i> Tell me about Leo's leadership
                        </button>
                        <button class="suggestion-btn" data-question="What awards has Leo won?">
                            <i class="fas fa-lightbulb"></i> What awards has Leo won?
                        </button>
                    </div>
                    <div class="chatbot-input-container">
                        <textarea
                            class="chatbot-input"
                            id="chatbotInput"
                            placeholder="Ask me anything about Leo..."
                            rows="1"
                        ></textarea>
                        <button class="chatbot-send" id="sendMessage">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
            <button class="chatbot-toggle" id="chatbotToggle">
                <i class="fas fa-comments"></i>
                <span class="chatbot-badge">AI</span>
            </button>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatbotToggle');
        const container = document.getElementById('chatbotContainer');
        const close = document.getElementById('closeChatbot');
        const minimize = document.getElementById('minimizeChatbot');
        const sendBtn = document.getElementById('sendMessage');
        const input = document.getElementById('chatbotInput');
        const suggestions = document.querySelectorAll('.suggestion-btn');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        minimize.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // auto-resize textarea
        input.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        });

        suggestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                input.value = question;
                this.sendMessage();
            });
        });
    }

    toggleChat() {
        const container = document.getElementById('chatbotContainer');
        const toggle = document.getElementById('chatbotToggle');

        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            container.classList.add('active');
            toggle.classList.add('hidden');
            document.getElementById('chatbotInput').focus();
        } else {
            container.classList.remove('active');
            toggle.classList.remove('hidden');
        }
    }

    closeChat() {
        const container = document.getElementById('chatbotContainer');
        const toggle = document.getElementById('chatbotToggle');

        this.isOpen = false;
        container.classList.remove('active');
        toggle.classList.remove('hidden');
    }

    addWelcomeMessage() {
        const welcomeMsg = {
            role: 'assistant',
            content: "Hi! I'm Sparky, Leo's AI assistant. I can answer any questions you have about Leo's projects, experiences, achievements, skills, and background. What would you like to know?"
        };
        this.displayMessage(welcomeMsg);
    }

    async sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();

        if (!message || this.isTyping) return;

        input.value = '';
        input.style.height = 'auto';

        const suggestions = document.getElementById('chatbotSuggestions');
        if (suggestions) suggestions.style.display = 'none';

        this.displayMessage({ role: 'user', content: message });
        this.conversationHistory.push({ role: 'user', content: message });
        this.showTypingIndicator();

        try {
            const response = await this.callClaudeAPI(message);
            this.hideTypingIndicator();
            this.displayMessage({ role: 'assistant', content: response });
            this.conversationHistory.push({ role: 'assistant', content: response });

        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTypingIndicator();
            this.displayMessage({
                role: 'assistant',
                content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment."
            });
        }
    }

    async callClaudeAPI(userMessage) {
        const knowledgeBase = this.getKnowledgeBase();

        const systemPrompt = `You are an AI assistant for Leo Chang's portfolio website. Your role is to answer questions about Leo based on the following information:

${knowledgeBase}

Guidelines:
- Answer questions accurately based on the information provided
- Be conversational and friendly
- If asked about something not in the knowledge base, politely say you don't have that specific information
- Keep responses concise but informative (2-4 sentences typically)
- Don't make up information - only use what's provided
- You can refer to Leo in third person or say "Leo" when appropriate`;

        try {
            // call backend server (localhost for testing, vercel for production)
            const backendUrl = window.location.hostname === 'leochang.net'
                ? 'https://portfolio-chatbot-backend-56ki4rxmw.vercel.app/chat'
                : 'http://localhost:3000/chat';
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    system: systemPrompt,
                    messages: [
                        ...this.conversationHistory.slice(-6), // last 3 exchanges for context
                        { role: 'user', content: userMessage }
                    ]
                })
            });

            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const data = await response.json();
            return data.content[0].text;

        } catch (error) {
            console.error('Claude API error:', error);
            throw error;
        }
    }

    getKnowledgeBase() {
        return `
ABOUT LEO CHANG:
Leo Chang is a Junior at Princeton Day School (Class of 2027). He is interested in computer science, economics, and finance, with a particular passion for machine learning and artificial intelligence. In his free time, he enjoys fencing, writing, and creating coding projects.

CONTACT INFORMATION:
- Email: leochang017@gmail.com
- Phone: (724) 624-2360
- Location: Princeton Day School, New Jersey

EDUCATION & ACADEMICS:
- Current Status: Junior at Princeton Day School
- AP Computer Science A: Score of 4
- Currently taking: AP Micro & Macro Economics, AP Chemistry, AP Comparative Government, Honors Physics, Honors Precalculus
- Latin 4 (Dual Enrollment - College Credit) - Completed
- Total of 6 AP Courses

PROGRAMMING SKILLS:
Languages: Python, Java, JavaScript, HTML/CSS, C++, SQL (6+ languages)
Frameworks & Tools: TensorFlow, PyTorch, React, Node.js, Git
Areas of Interest: Machine Learning, Artificial Intelligence, Finance, Economics, Data Science

PROJECTS (10+ total):

1. **NapkinNote** - Full-Stack EdTech Note-Sharing & Marketplace Platform (Lead Developer & Co-Founder)
   - Platform Type: Educational technology platform combining collaborative note-sharing with campus marketplace functionality
   - Technology Stack: Flask (Python), SQLAlchemy ORM, SQLite/PostgreSQL, HTML/CSS/JavaScript, Google Cloud Vision API, OAuth 2.0
   - Code Scale: 4,066 lines routes.py + 558 lines models.py + 203 lines config.py = 7,450+ total lines of Python code

   Core Features - Note Sharing:
   - AI-Powered Summarization: Claude API integration for automatic note summarization with original content preservation
   - Text Extraction: Google Cloud Vision API for extracting text from uploaded images (PDFs, photos)
   - Course Integration: PDS course catalog sync with 67,786 courses, automatic course/teacher linking
   - Version Control: NoteVersion system tracking edit history with change summaries
   - Rich Media Support: Photo attachments, document uploads (PDF/DOCX), markdown rendering
   - Social Features: Comments, likes, bookmarks, tags, user following, activity feeds
   - Note Ratings: 1-5 star rating system with written reviews

   Core Features - Marketplace:
   - Listings: Buy/sell textbooks and campus items with categories, conditions, pricing
   - Messaging: Real-time buyer-seller communication system
   - Favorites: Save listings for later viewing
   - Meetup Coordination: Safe campus location system with 160+ PDS locations, datetime scheduling
   - Ratings: MarketplaceRating system for completed transactions

   Database Architecture (20+ Models):
   - User Management: User, UserFollow, UserReputation, Activity, SearchHistory
   - Notes: Note, NoteVersion, NoteDocument, Photo, Comment, Like, Bookmark, NoteRating, Tag
   - Academic: Course (PDS class catalog integration)
   - Marketplace: Listing, ListingPhoto, Message, Favorite, Category, MeetupLocation, MeetupRequest, MarketplaceRating
   - Communications: NewsletterSubscriber

   Advanced Systems:
   - Authentication: Google OAuth + traditional login, email verification with token system
   - File Processing: Vision API text extraction, AI summarization, multi-format support (PDF/DOCX/images)
   - Reputation System: UserReputation with levels (Beginner→Master), activity-based scoring
   - Security: Password validation (8+ chars, uppercase, numbers), role-based access control, upload limits (8-64MB configurable)
   - Admin Tools: Full moderation dashboard

   Technical Implementation:
   - Upload Handling: Environment-aware limits (64MB dev, 16MB production), file type validation
   - Email System: Flask-Mail with Gmail SMTP, verification emails, newsletters
   - Templates: Jinja2 with custom filters (markdown, nl2br, sanitize_id, clean_subject)
   - Database: SQLAlchemy ORM with complex relationships, cascade deletes, unique constraints
   - API Integrations: Google Cloud Vision for OCR, Claude API for summarization, Google OAuth

2. **Stock Price Prediction** - Published Machine Learning Research (JEI 2025)
   - Research Question: Does Twitter sentiment analysis improve LSTM-based stock price predictions?
   - Technology Stack: TensorFlow/Keras, scikit-learn, Pandas, NumPy, TextBlob, Matplotlib, Seaborn
   - Dataset: 299,601 tweets + 6,301 price data points (AAPL, TSLA, MSFT) from Sep 2021 - Sep 2022
   - Model Architecture: 3-layer LSTM (128→64→32 units) with batch normalization, dropout regularization, L2 penalties
   - Feature Engineering: 21 features total - 13 technical indicators (RSI, MACD, moving averages, volatility) + 5 sentiment metrics + 3 derived features
   - Methodology: 5-fold time series cross-validation, statistical significance testing (t-tests, Wilcoxon), proper temporal validation
   - Key Finding: Sentiment analysis DECREASED model performance by 27-99% across all stocks (p<0.05 for MSFT)
   - Training: Adam optimizer, early stopping, learning rate reduction, 60-day sequence windows
   - Evaluation Metrics: RMSE, MAE, R² with uncertainty quantification
   - Visualizations: 8 publication-quality graphs including performance comparisons, statistical significance analysis, time series predictions
   - Impact: Challenges existing literature on sentiment analysis effectiveness, demonstrates importance of rigorous methodology in financial ML
   - Code: 1,183 lines in main analysis, comprehensive hyperparameter tuning, reproducible research with fixed random seeds

3. Multiple other technical projects in machine learning, web development, and data science.

LEADERSHIP ROLES (7 total):
1. ObCHESSed Chess Club - Founder (Founded 2 months ago)
   - 20+ active members at Princeton Day School

2. Ti-Ratana Welfare Society - Nonprofit Founder
   - Taught 500+ students
   - Community education initiative

3. Founded 3 organizations from scratch

WORK EXPERIENCE & INTERNSHIPS:
1. Achievable - Content Marketing Intern (July - October 2024, Remote)
   - Created high-quality, information-rich blog posts
   - Well-researched and informative content
   - Endorsed by Tyler York (Founder & CEO): "Leo was a valuable member of our team... excelled at his projects... well-researched and informative, reinforcing Achievable's brand as authoritative and knowledgeable. Best of all, Leo was a pleasure to work with."
   - 5-star rating

2. Mundial Financial Group - Intern (July - August 2025, Remote)
   - Website redesign and content strategy
   - Endorsed by Charles Smulevitz (CEO): "Outstanding work... dedication, hard work, and eagerness to learn... work in creating a new website showcased both his technical skills and ability to translate what he learned into a professional, practical result."
   - 5-star rating

ACHIEVEMENTS & AWARDS (15+ total):
Competition Placements:
1. PClassic Programming Competition (UPenn) - 1st Place (5 months ago)
   - High school division
   - University of Pennsylvania programming competition

2. NJSIAA Fencing Championship - 2nd Place
   - Individual & team saber events
   - New Jersey state-level competition

3. Science Olympiad Regional - 3rd Place
   - Physics, chemistry, and engineering events

4. National Economics Challenge (New Jersey) - 4th Place
   - State-level economics competition

Other Recognition:
- Published Research in Journal of Emerging Investigators (JEI) - 2025
- Scholastic Art & Writing Silver Key - Multiple awards for poetry including "Legacy"
- 200+ volunteer hours (66 hours with Capital Health in patient care service)

STATISTICS:
- Total Projects: 10
- Leadership Roles: 7
- Awards Earned: 15+
- Volunteer Hours: 200+ (with +66 hours year-to-date)
- Programming Languages: 6+
- Publications: 1 (research paper)
- Organizations Founded: 3

LANGUAGES:
- English (fluent)
- Chinese (learned)
- Latin (advanced - completed Latin 4 with college credit)

INTERESTS & HOBBIES:
- Fencing (competitive, state championships)
- Writing (poetry - Scholastic Art & Writing award winner)
- Coding and building projects
- Machine Learning and AI research
- Economics and Finance
`;
    }

    displayMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${message.role}`;

        if (message.role === 'assistant') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">${this.formatMessage(message.content)}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${this.formatMessage(message.content)}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
                <div class="message-avatar user">
                    <i class="fas fa-user"></i>
                </div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message assistant typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    formatMessage(text) {
        // convert markdown to html
        let formatted = text;
        formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>');
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
}

// initialize chatbot when dom is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfolioChatbot());
} else {
    new PortfolioChatbot();
}
