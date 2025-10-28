// ai chatbot functionality
// using claude api through my vercel backend

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

        // auto-resizing the textarea
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
            content: "Hello! I'm here to answer questions about Leo's projects, experience, skills, and achievements. How can I help you?"
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

        const systemPrompt = `You are an AI assistant for Leo Chang's portfolio website. Answer questions professionally and concisely.

${knowledgeBase}

CRITICAL RULES - FOLLOW STRICTLY:
- Maximum 2-3 sentences per response
- Be professional and direct
- Answer only what was asked - do not elaborate unless requested
- No bullet points, no lists, no lengthy descriptions
- If asked about multiple items, mention 2-3 key highlights maximum
- Keep it brief and informative
- Don't make up information - only use what's provided above

Good response examples:
- "Leo has developed two main projects: NapkinNote, an AI-powered educational platform, and a published machine learning research on stock price prediction."
- "His technical skills include Python, JavaScript, machine learning with TensorFlow, and full-stack web development."
- "He placed 1st at PClassic and 4th at the National Economics Challenge, among other achievements."

BAD responses to avoid:
- Multiple paragraphs
- Long detailed explanations
- Complete lists of everything
- Overly casual language`;

        try {
            // always using production backend (works both locally and on live site)
            const backendUrl = 'https://portfolio-chatbot-backend-56ki4rxmw.vercel.app/chat';
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
Leo Chang is a Junior at Princeton Day School (Class of 2027) in Princeton, NJ. He is an innovative and impact-driven student with a strong record of founding and leading technology ventures, educational initiatives, and community programs. He is interested in computer science, economics, and finance, with a particular passion for machine learning and artificial intelligence.

Leo is experienced in full-stack development, machine learning, and product design, with demonstrated success in building startups from ideation to execution. He has been recognized nationally for excellence in academics, writing, and athletics, and published in both scientific and literary journals. He is skilled at uniting technical expertise with leadership, creativity, and strategic thinking to deliver solutions that drive social and academic impact.

In his free time, he enjoys competitive fencing (since age 6), creative writing (award-winning poet), chess, ballroom dance (national champion), and creating coding projects. Leo has founded 3 organizations from scratch and maintains 7 active leadership roles.

CONTACT INFORMATION:
- Email: leochang017@gmail.com
- Phone: (724) 624-2360
- School: Princeton Day School, Princeton, NJ
- Website: leochang.net

EDUCATION & ACADEMICS:
- Current Status: Junior at Princeton Day School (Class of 2027)
- GPA: High academic performance with 6 AP courses total

Completed Courses:
- AP Computer Science A - Score of 4, Post-AP Advanced Computing completed
- Latin 4 (Dual Enrollment - College Credit) - Completed through advanced classical studies

Currently Taking (Junior Year):
- AP Micro & Macro Economics (AP Level)
- AP Chemistry (Advanced Level)
- AP Comparative Government (AP Level)
- Honors Physics (Advanced Level)
- Honors Precalculus (Honors Track)

PROGRAMMING & TECHNICAL SKILLS:

Programming Languages:
- Python (Flask framework expertise)
- Java
- JavaScript
- HTML & CSS
- C++
- SQL

Frameworks & Libraries:
- TensorFlow & Keras (deep learning)
- PyTorch (neural networks)
- scikit-learn (machine learning)
- React (frontend)
- Node.js (backend)
- Flask (Python web framework - primary backend expertise)
- SQLAlchemy (ORM)

Development & Database Tools:
- Git (version control)
- PostgreSQL (production database)
- SQLite (development database)
- OAuth 2.0 (authentication)
- SMTP (email systems)

AI/ML & Data Science:
- Anthropic Claude API (AI integration)
- Google Cloud Vision API (OCR)
- LSTM Networks (time series prediction)
- Natural Language Processing (NLP)
- TextBlob & NLTK (sentiment analysis)
- Pandas & NumPy (data processing)
- Matplotlib & Seaborn (data visualization)
- Statistical analysis & time series analysis
- Feature engineering
- Research methodologies

Web Development:
- Full-stack web development
- Responsive design
- Session management
- API integration
- UI/UX design
- Web design & SEO
- Content creation

Writing & Communication:
- Academic writing
- Creative writing (poetry & prose)
- Journalism
- Editorial management
- Research publication
- Content marketing
- Social media strategy

Leadership & Management:
- Team management
- Strategic planning
- Fundraising
- Public speaking
- Mentorship
- Product design
- Branding & vision

Specialized Skills: OCR processing, database design (20+ models), startup development (ideation to execution), curriculum development, educational program management

Areas of Expertise: Machine Learning, Artificial Intelligence, Deep Learning (LSTM), NLP, Sentiment Analysis, Financial ML, Full-Stack Web Development, EdTech, Startup Development, Educational Technology, Data Science

Spoken Languages:
- English (Native/Bilingual proficiency)
- Latin (Professional working proficiency - college-level dual enrollment)
- Chinese (Learned)

PROJECTS (2 total):

1. **NapkinNote** - EdTech Startup (Co-Founder & Lead Developer, August 2025 - Present)
   - Platform Type: Educational technology startup providing students with an AI-powered platform to share and transform class notes into concise, course-specific study resources
   - Business Model: Peer-to-peer marketplace where students can buy and sell used textbooks and school supplies
   - Role: Co-founded the startup, designed and implemented core product features, directed branding, product vision, and user experience, collaborated with co-founders to define strategy, business model, and long-term growth opportunities
   - Technology Stack: Flask (Python), SQLAlchemy ORM, SQLite/PostgreSQL, HTML/CSS/JavaScript, Google Cloud Vision API, OAuth 2.0, Claude API
   - Code Scale: 4,066 lines routes.py + 558 lines models.py + 203 lines config.py + 420 lines email_utils.py + 143 lines text_extraction.py = 7,450+ total lines of Python code
   - Website: napkinnotes.net

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

LEADERSHIP ROLES (7 total):

1. **Ti-Ratana Welfare Society** - Founder of Orphanage Educational Program (March 2020 - Present, 5 years active)
   - Founded and currently directs a remote educational program for orphans in Malaysia
   - Creates and delivers weekly interactive lessons in English and science via Zoom to improve students' academic skills and engagement
   - Successfully led community fundraiser to purchase essential e-learning tools (projector, laptop, microphone) to support program continuity
   - Manages rotating groups of student volunteers
   - Continuously adapts curriculum based on feedback to ensure content is both effective and engaging
   - 200+ hours of volunteer tutoring since 2020
   - 500+ students taught through the program
   - Skills: Community Service, Curriculum Development, Teaching, Program Founding, Fundraising, Team Management, Remote Education

2. **Princeton Day School Chess Club (ObCHESSed)** - Founder & President (September 2025 - Present)
   - Founded and grew the official school chess club from scratch at Princeton Day School
   - Built community of 20+ active members
   - Organizes in-school tournaments and weekly club meetings featuring tactics training, tournament prep, and friendly matches
   - Manages all club operations from social media outreach to increasing membership and engagement
   - Coordinates school chess tournaments and inter-school competition participation
   - Manages club logistics including scheduling, communications, and member recruitment
   - Teaches players of all skill levels from beginner to advanced
   - Skills: Club Leadership, Organization Building, Event Management, Strategic Thinking, Social Media Management

3. **Student Code Alliance** - Branch Manager (July 2024 - Present, 1+ years)
   - Established and grew new branch of nonprofit dedicated to providing free coding education to children
   - Built curriculum for Scratch and Python programming
   - Recruited, onboarded, and managed team of peer tutors
   - Developed training materials ensuring consistent, high standard of instruction
   - Led outreach campaigns and developed marketing materials
   - Successfully increased student sign-ups in first quarter of operation
   - Skills: Branch Management, Curriculum Development, Team Leadership, Coding Education, Marketing, Student Outreach

4. **The Spokesman** (School Newspaper) - Online Editor (Freshman - Present, 3+ years)
   - Promoted from Associate Editor (Freshman) to Online Editor (Sophomore)
   - Manages digital content strategy and online publication platform
   - Edits and publishes student articles across multiple topics and formats
   - Coordinates with editorial team to maintain publication schedule and quality standards
   - Skills: Digital Media, Content Management, Editorial Strategy, Academic Writing

5. **Princeton Day School Finance and Political Science Magazine (Washington to Wallstreet)** - Executive Editor (2024 - Present, 1+ years)
   - Executive Editor directing content strategy and editing for the school's finance and political science magazine
   - Oversees content strategy focusing on intersection of politics and economics
   - Manages editorial calendar and coordinates with contributing writers
   - Ensures high-quality analysis of current financial and political developments
   - Skills: Executive Leadership, Financial Writing, Political Analysis, Editorial Strategy, Academic Writing, Content Direction

6. **Princeton Day School Science Olympiad Team** - Team Member & Co-head (2022 - Present, 3+ years)
   - Member of Princeton Day School's official Science Olympiad competitive team
   - Competes in physics, chemistry, and engineering events at regional and state levels
   - Competed at high level: 3rd place at Regionals, 5th and 6th place at NJ States
   - Represents school in prestigious national science competition
   - Co-head of Middle School Science Olympiad Team
   - Creates and grades practice tests for middle school team
   - Helps manage and mentor the middle school team
   - Skills: STEM Competition, Team Collaboration, Academic Excellence, Mentorship, Test Development

7. **Princeton Day School Varsity Fencing Team** - Key Team Member (Freshman Year - Present, 2023 - Present, 2+ years)
   - Key player on the varsity team since Freshman Year, competing in Saber discipline
   - Competitively fencing since 6 years old (10+ years of fencing experience)
   - Top 2 finisher regionally and qualified for State Tournament as Sophomore
   - Achieved NJSIAA Regional 2nd Place as both an individual and team member during Sophomore Year
   - Maintains consistent performance across multiple tournaments and meets
   - Skills: Varsity Athletics, Strategic Thinking, Team Collaboration, Mental Resilience, Competitive Performance

WORK EXPERIENCE & INTERNSHIPS (3 total positions):

1. **Achievable** - Intern (Test Prep Startup, Remote, July 2024 - October 2024, 4 months)
   - Company: EdTech test prep startup specializing in educational content and exam preparation
   - Position: Content Marketing Intern

   Key Responsibilities & Achievements:
   - Wrote blog posts for test prep company on variety of topics from tech to daily life
   - Conducted independent research to produce informed and accurate expert content for various topics
   - Authored guest posts for other sites on company's behalf to expand audience and reach
   - Excelled at creating high-quality, information-rich blog posts that reinforced brand authority
   - Authored 15+ articles total
   - Worked remotely with complete autonomy, self-directing projects and maintaining accountability
   - Delivered consistent, well-researched content that met high editorial standards

   Skills Applied: Content Marketing, Independent Research, Brand Authority Building, Guest Content Creation, Remote Work Management, Educational Content, Blog Writing

   Endorsement from Tyler York (Founder & CEO):
   "Leo was a valuable member of our team as a content marketing intern. He excelled at his projects to create high-quality, information-rich blog posts that were well-researched and informative, reinforcing Achievable's brand as authoritative and knowledgeable. Best of all, Leo was a pleasure to work with."
   Rating: ★★★★★ 5.0/5.0

2. **Mundial Financial Group** - Intern (Investment Banking Startup, Remote, July 2025 - August 2025, 2 months)
   - Company: Investment banking startup
   - Position: Intern (Website Redesign & Content Strategy)

   Key Responsibilities & Achievements:
   - Worked directly with CEO to perform comprehensive analysis of industry websites
   - Analysis informed complete redesign of company's site to more clearly explain complex financial services
   - Authored and optimized new web content to reflect firm's operations and regulatory focus
   - Managed firm's social media presence to increase site traffic and enhance client understanding of financial topics
   - Researched and integrated up-to-date financial news and investment strategies into content

   Skills Applied: Web Design, Content Writing, SEO, Social Media Management, Financial Analysis, Financial Services Content, CEO Collaboration

   Endorsement from Charles Smulevitz (Chief Executive Officer):
   "I want to commend Leo for the outstanding work he did during his internship at Mundial Financial Group. His dedication, hard work, and eagerness to learn were evident throughout. His work in creating a new website showcased both his technical skills and ability to translate what he learned into a professional, practical result."
   Rating: ★★★★★ 5.0/5.0

3. **Capital Health Regional Medical Center** - Junior Volunteer (Healthcare, Trenton NJ, On-Site, July 2024 - August 2024, 2 months)
   - Healthcare: Regional medical center providing patient care services
   - Position: Junior Volunteer (Nursing Unit)
   - Location: Trenton, NJ (On-Site)

   Key Responsibilities & Service:
   - Contributed over 66 hours of service across multiple roles to support hospital staff and patients
   - Served primarily as Nursing Unit Volunteer, reporting to charge nurse
   - Assisted staff and patients by responding to call bells, engaging with patients and families
   - Helped patients with TV use, ordering meals through Dine program
   - Ensured essential items (call button, tray table, etc.) were within reach for patients
   - Participated in Comfort Cart, Book Cart, Tea Cart, and Art Cart programs
   - Visited patient rooms to provide refreshments, comfort and hygiene items, and books to enhance patient and caregiver wellbeing
   - Assisted volunteer manager as office assistant with organizational and clerical tasks
   - Handled file organization, data entry and analysis, and preparation of discharge packets to support volunteer operations

   Skills Applied: Patient Care, Data Entry, Organization, Communication, Healthcare Operations, Patient Engagement, Administrative Support

   Recognition: Official volunteer certificate received for 66+ hours of service contributions

ACHIEVEMENTS & AWARDS (15+ total, 9 competitions participated):

Academic & Programming Competitions:

1. **PClassic Fall 2024** - 1ST PLACE (2024)
   - Competition: University of Pennsylvania's prestigious programming competition
   - Category: Computer Science / Programming
   - Achievement: First place finish in high school division
   - Description: Demonstrated advanced problem-solving skills and algorithmic thinking against top competitors from across the region

2. **HackBac Hackathon** - 3RD PLACE (2024)
   - Competition: 24-hour social justice-themed hackathon
   - Category: Hackathon / Computer Science
   - Achievement: Third place finish developing innovative technical solutions
   - Description: Developed solutions to address real-world social challenges, demonstrated rapid prototyping and collaborative problem-solving skills

3. **National Economics Challenge** - 4TH PLACE (2024)
   - Competition: State-level economics competition (New Jersey)
   - Category: Economics / Social Studies
   - Achievement: Fourth place in New Jersey state competition
   - Description: Comprehensive understanding of micro and macroeconomic principles, current events, and economic theory application

4. **Science Olympiad** - 3RD PLACE REGIONAL, 5TH-6TH PLACE STATE (2024)
   - Competition: Regional & State STEM competition
   - Category: Physics, Chemistry, Engineering
   - Achievement: 3rd place at regional competition, 5th-6th place at New Jersey State competition
   - Description: Competed across multiple events demonstrating well-rounded STEM expertise

Athletic Competitions:

5. **National Ballroom Dance Championship** - 1ST PLACE (Sophomore Year), NATIONAL FINALIST (Freshman & Junior Year)
   - Competition: National Championship
   - Category: Ballroom Dance / Athletics
   - Achievement: National Champion (1st Place) during Sophomore Year
   - Additional: National Finalist during Freshman Year and Junior Year
   - Description: Years of dedication, technical mastery, and competitive excellence at highest level of youth ballroom dancing. Consistent top-level performance across three years (Finalist, Champion, Finalist)

6. **NJSIAA Regional Fencing Championship** - 2ND PLACE (Sophomore Year)
   - Competition: New Jersey state athletic association regional championship
   - Category: Fencing (Saber) / Athletics
   - Achievement: Second place in both individual and team competitions
   - Description: Qualified team for state tournament, demonstrated elite-level fencing skill in saber discipline

Creative Writing & Publications:

7. **Published Research Paper** - PUBLISHED (2024-2025)
   - Publication: Journal of Emerging Investigators (JEI) - Peer-reviewed scientific journal
   - Category: Academic Research / Machine Learning / Financial ML
   - Achievement: Peer-reviewed publication accepted and published
   - Full Title: "Analyzing the Impact of Tweet Sentiment on Stock Price Prediction using Long Short-Term Memory Models"
   - Authors: Leo Chang (Lead Researcher), Aditya Saraf (Cornell University), Jenjen Chen
   - Keywords: LSTM, sentiment, Twitter, prediction, finance
   - Description: Advanced understanding of machine learning and financial markets, rigorous scientific methodology with 5-fold cross-validation, statistical testing, and negative results that challenge existing literature

8. **Scholastic Art & Writing Awards** - SILVER KEY (2024)
   - Competition: National creative writing competition
   - Category: Creative Writing / Poetry
   - Achievement: Multiple Silver Key awards
   - Works: Poetry including "Legacy" and other pieces
   - Description: National recognition celebrating outstanding artistic and literary achievement among American teenagers

9. **Published Poetry** - PUBLISHED (2024)
   - Publications: White Enso Journal ("Snow Haiku") and Creative Communications
   - Category: Literary Publications / Writing
   - Achievement: Multiple poetry publications
   - Description: Recognition of exceptional creative writing ability and literary merit among young writers

Additional Recognition & Achievements:
- 200+ volunteer hours total (tutoring and community service)
- 66 hours with Capital Health Regional Medical Center in patient care service
- Founded 3 organizations from scratch (Ti-Ratana Welfare Society, ObCHESSed, Student Code Alliance branch)
- 500+ students taught through educational programs
- Top placements: 7 total 1st-4th place finishes across competitions
- 5 achievement categories: Academic, Athletic, Research, Creative Writing, Community Service

STATISTICS & METRICS:
- Total Projects: 2 major projects (NapkinNote, Stock ML Research)
- Leadership Roles: 7 active positions
- Awards Earned: 15+ total awards and recognitions
- Competitions Participated: 9 different competitions
- Top Placements: 7 total 1st-4th place finishes
- Volunteer Hours: 200+ hours total (66 hours at Capital Health, 200+ hours Ti-Ratana)
- Students Taught: 500+ through educational programs
- Programming Languages: 6+ languages (Python, Java, JavaScript, HTML/CSS, C++, SQL)
- Publications: 2 total (1 research paper in JEI, multiple poetry publications)
- Organizations Founded: 3 from scratch
- Work Experience: 3 positions (2 internships, 1 volunteer)
- AP Courses: 6 total
- Total Experience Hours: 400+ hours across internships and volunteer work
- Achievement Categories: 5 (Academic, Athletic, Research, Creative Writing, Community Service)
- Code Written: 7,450+ lines of Python for NapkinNote, 1,183+ lines for Stock ML Research
- Database Models Designed: 20+ models for NapkinNote
- Research Data Processed: 80,000+ tweets, 6,301 price data points across 3 stocks

SPOKEN LANGUAGES:
- English (fluent/native)
- Chinese (learned)
- Latin (advanced classical studies - completed Latin 4 with college credit through dual enrollment)

INTERESTS & HOBBIES:
- Fencing: Competitive saber fencer since age 6, varsity team member, state tournament qualifier, 2nd place NJSIAA Regional Championship
- Writing: Award-winning poet (Scholastic Art & Writing Silver Key), published in White Enso Journal and Creative Communications
- Coding & Building Projects: Full-stack web development, machine learning research, AI integration
- Machine Learning & AI Research: Published researcher in financial ML, LSTM networks, NLP, sentiment analysis
- Economics & Finance: National Economics Challenge competitor, financial analysis, investment research
- Ballroom Dance: National champion (1st place national championship)
- Chess: Founded and leads school chess club with 20+ members
- Education & Tutoring: Teaching coding (Scratch/Python) and academic subjects to 500+ students

PERSONAL QUALITIES & STRENGTHS:
- Entrepreneurial: Founded 3 organizations from scratch
- Research-Oriented: Published peer-reviewed research, rigorous scientific methodology
- Leadership: 7 active leadership positions managing teams and projects
- Technical Proficiency: Full-stack development, machine learning, database design
- Communication: Content marketing, editorial leadership, academic writing
- Multidisciplinary: Excels in STEM, humanities, athletics, and creative arts
- Remote Work: Proven ability to work independently with complete autonomy
- Community Service: 200+ volunteer hours dedicated to education and healthcare
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
