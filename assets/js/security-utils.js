// Security Utilities for Leo's Portfolio Website
// Implements: Input validation, rate limiting, HTML sanitization, API validation
// OWASP Compliance: A03:2021 - Injection, A04:2021 - Insecure Design, A05:2021 - Security Misconfiguration
// Author: Claude Code Security Hardening
// Last Updated: 2026-01-04

/**
 * Rate Limiter using Token Bucket Algorithm
 * Prevents API abuse through client-side throttling
 * Note: Client-side rate limiting is bypassable but deters casual abuse
 * Server-side rate limiting is still required for production security
 */
class RateLimiter {
    /**
     * @param {number} maxTokens - Maximum requests allowed per window (default: 10)
     * @param {number} refillRate - Tokens to add per interval (default: 1)
     * @param {number} refillIntervalMs - Time window in milliseconds (default: 60000 = 1 minute)
     */
    constructor(maxTokens = 10, refillRate = 1, refillIntervalMs = 60000) {
        this.maxTokens = maxTokens;          // Max requests per window
        this.tokens = maxTokens;              // Current available tokens
        this.refillRate = refillRate;         // Tokens to add per interval
        this.refillIntervalMs = refillIntervalMs; // 60000ms = 1 minute
        this.lastRefill = Date.now();

        // Store in sessionStorage for per-session tracking
        this.storageKey = 'portfolio_rate_limit';
        this.loadState();

        // Refill tokens periodically
        setInterval(() => this.refill(), this.refillIntervalMs);
    }

    /**
     * Load rate limiter state from sessionStorage
     * @private
     */
    loadState() {
        try {
            const stored = sessionStorage.getItem(this.storageKey);
            if (stored) {
                const state = JSON.parse(stored);
                this.tokens = state.tokens;
                this.lastRefill = state.lastRefill;
            }
        } catch (e) {
            // Ignore storage errors - use defaults
            console.warn('Rate limiter: Failed to load state from sessionStorage');
        }
    }

    /**
     * Save rate limiter state to sessionStorage
     * @private
     */
    saveState() {
        try {
            sessionStorage.setItem(this.storageKey, JSON.stringify({
                tokens: this.tokens,
                lastRefill: this.lastRefill
            }));
        } catch (e) {
            // Ignore storage errors
            console.warn('Rate limiter: Failed to save state to sessionStorage');
        }
    }

    /**
     * Refill tokens based on time elapsed
     * @private
     */
    refill() {
        const now = Date.now();
        const timePassed = now - this.lastRefill;
        const tokensToAdd = Math.floor(timePassed / this.refillIntervalMs) * this.refillRate;

        if (tokensToAdd > 0) {
            this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
            this.lastRefill = now;
            this.saveState();
        }
    }

    /**
     * Attempt to consume a token for a request
     * @returns {boolean} True if request allowed, false if rate limited
     */
    tryConsume() {
        this.refill(); // Check for refill first

        if (this.tokens > 0) {
            this.tokens--;
            this.saveState();
            return true;
        }
        return false;
    }

    /**
     * Get time until next token is available
     * @returns {number} Milliseconds until next token
     */
    getRetryAfter() {
        return this.refillIntervalMs - (Date.now() - this.lastRefill);
    }

    /**
     * Get remaining tokens
     * @returns {number} Available tokens
     */
    getRemainingTokens() {
        this.refill();
        return this.tokens;
    }
}

/**
 * Input Validator - Schema-based validation
 * Implements whitelist approach for input validation
 * Validates type, length, pattern, and custom rules
 */
class InputValidator {
    /**
     * Validate input against schema
     * @param {string} input - User input to validate
     * @param {Object} schema - Validation rules
     * @param {boolean} schema.required - Is field required?
     * @param {number} schema.minLength - Minimum string length
     * @param {number} schema.maxLength - Maximum string length
     * @param {RegExp} schema.pattern - Regex pattern to match
     * @param {string} schema.patternError - Error message for pattern mismatch
     * @param {Function} schema.customValidator - Custom validation function
     * @returns {Object} {valid: boolean, error: string|null, sanitized: string}
     */
    static validate(input, schema) {
        // Type check
        if (typeof input !== 'string') {
            return { valid: false, error: 'Input must be a string', sanitized: '' };
        }

        // Required check
        if (schema.required && (!input || input.trim().length === 0)) {
            return { valid: false, error: 'This field is required', sanitized: '' };
        }

        // Trim input
        let sanitized = input.trim();

        // Length validation
        if (schema.minLength && sanitized.length < schema.minLength) {
            return {
                valid: false,
                error: `Must be at least ${schema.minLength} characters`,
                sanitized
            };
        }

        if (schema.maxLength && sanitized.length > schema.maxLength) {
            return {
                valid: false,
                error: `Must not exceed ${schema.maxLength} characters`,
                sanitized: sanitized.substring(0, schema.maxLength)
            };
        }

        // Pattern validation (regex)
        if (schema.pattern && !schema.pattern.test(sanitized)) {
            return {
                valid: false,
                error: schema.patternError || 'Invalid format',
                sanitized
            };
        }

        // Custom validation function
        if (schema.customValidator) {
            const customResult = schema.customValidator(sanitized);
            if (!customResult.valid) {
                return { valid: false, error: customResult.error, sanitized };
            }
        }

        return { valid: true, error: null, sanitized };
    }

    /**
     * Escape regex special characters for safe use in RegExp
     * Prevents ReDoS (Regular Expression Denial of Service) attacks
     * @param {string} str - String containing potential regex special chars
     * @returns {string} Escaped string safe for use in RegExp
     */
    static escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

/**
 * HTML Sanitizer using DOMPurify
 * Safely renders user content while preserving markdown formatting
 * Blocks XSS attacks while allowing safe HTML tags
 */
class HTMLSanitizer {
    /**
     * Sanitize HTML content using DOMPurify
     * @param {string} dirty - Unsanitized HTML
     * @param {Object} config - DOMPurify configuration
     * @returns {string} Sanitized HTML
     */
    static sanitize(dirty, config = {}) {
        // Check if DOMPurify is loaded
        if (typeof DOMPurify === 'undefined') {
            console.error('DOMPurify not loaded! Falling back to textContent only.');
            return this.textOnly(dirty);
        }

        // Default config: Allow basic markdown formatting
        const defaultConfig = {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'ul', 'ol', 'li', 'code', 'pre'],
            ALLOWED_ATTR: ['href', 'title', 'target'],
            ALLOW_DATA_ATTR: false,
            ALLOW_UNKNOWN_PROTOCOLS: false,
            SAFE_FOR_TEMPLATES: true
        };

        return DOMPurify.sanitize(dirty, { ...defaultConfig, ...config });
    }

    /**
     * Fallback: Strip all HTML tags (textContent only)
     * Used when DOMPurify is not available
     * @param {string} dirty - Content to strip
     * @returns {string} Plain text
     */
    static textOnly(dirty) {
        const div = document.createElement('div');
        div.textContent = dirty;
        return div.textContent;
    }

    /**
     * Sanitize for chatbot messages (allows markdown)
     * Converts markdown syntax to HTML, then sanitizes
     * @param {string} message - Raw message with markdown
     * @returns {string} Sanitized HTML
     */
    static sanitizeChatMessage(message) {
        // First, convert markdown to HTML
        let formatted = message;

        // Bold: **text** or __text__
        formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // Italic: *text* or _text_
        formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>');

        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');

        // Code blocks (inline): `code`
        formatted = formatted.replace(/`(.+?)`/g, '<code>$1</code>');

        // Then sanitize the HTML to remove any malicious content
        return this.sanitize(formatted);
    }
}

/**
 * API Payload Validator
 * Validates and sanitizes API request payloads
 * Implements whitelist approach - rejects unexpected fields
 */
class APIValidator {
    /**
     * Validate chatbot API payload
     * @param {Object} payload - Request payload to validate
     * @param {string} payload.system - System prompt
     * @param {Array} payload.messages - Array of message objects
     * @returns {Object} {valid: boolean, error: string|null}
     */
    static validateChatbotPayload(payload) {
        // Check for unexpected fields (whitelist approach)
        const allowedFields = ['system', 'messages'];
        const payloadFields = Object.keys(payload);
        const unexpectedFields = payloadFields.filter(f => !allowedFields.includes(f));

        if (unexpectedFields.length > 0) {
            return {
                valid: false,
                error: `Unexpected fields: ${unexpectedFields.join(', ')}`
            };
        }

        // Validate system prompt
        if (!payload.system || typeof payload.system !== 'string') {
            return { valid: false, error: 'Invalid system prompt' };
        }

        if (payload.system.length > 10000) {
            return { valid: false, error: 'System prompt too long' };
        }

        // Validate messages array
        if (!Array.isArray(payload.messages)) {
            return { valid: false, error: 'Messages must be an array' };
        }

        if (payload.messages.length === 0) {
            return { valid: false, error: 'Messages array cannot be empty' };
        }

        if (payload.messages.length > 20) {
            return { valid: false, error: 'Too many messages in history' };
        }

        // Validate each message
        for (const msg of payload.messages) {
            if (!msg.role || !msg.content) {
                return { valid: false, error: 'Invalid message format' };
            }

            if (!['user', 'assistant'].includes(msg.role)) {
                return { valid: false, error: 'Invalid message role' };
            }

            if (typeof msg.content !== 'string') {
                return { valid: false, error: 'Message content must be string' };
            }

            if (msg.content.length > 5000) {
                return { valid: false, error: 'Message content too long' };
            }
        }

        return { valid: true, error: null };
    }
}

// Export for use in other scripts
// Makes classes available as window.SecurityUtils
window.SecurityUtils = {
    RateLimiter,
    InputValidator,
    HTMLSanitizer,
    APIValidator
};

// Log successful initialization
console.log('Security utilities loaded successfully');
