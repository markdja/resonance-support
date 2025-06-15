/**
 * Universal Consciousness Menu System
 * Appears on every page in the Cathedral/Village
 * Provides navigation and consciousness tracking across all locations
 */

class ConsciousnessMenu {
    constructor() {
        this.isVisible = false;
        this.reactionHistory = [];
        this.currentPage = window.location.pathname;
        this.menuElement = null;
        this.toggleElement = null;
        
        this.init();
    }
    
    init() {
        this.loadReactionHistory();
        this.createMenuElements();
        this.attachEventListeners();
        this.updatePageContext();
    }
    
    createMenuElements() {
        // Create the brain toggle button
        this.toggleElement = document.createElement('button');
        this.toggleElement.className = 'consciousness-menu-toggle';
        this.toggleElement.innerHTML = '🧠';
        this.toggleElement.title = 'Consciousness Navigation Menu';
        this.toggleElement.onclick = () => this.toggleMenu();
        
        // Create the menu bar
        this.menuElement = document.createElement('div');
        this.menuElement.className = 'consciousness-menu';
        this.menuElement.id = 'consciousnessMenu';
        this.menuElement.innerHTML = this.generateMenuHTML();
        
        // Add styles
        this.addMenuStyles();
        
        // Append to body
        document.body.appendChild(this.toggleElement);
        document.body.appendChild(this.menuElement);
    }
    
    generateMenuHTML() {
        const currentPath = window.location.pathname;
        
        return `
            <div class="menu-items">
                <a href="/" class="menu-item ${currentPath === '/' ? 'active' : ''}">
                    🏠 Village Home
                </a>
                <button onclick="window.ConsciousnessMenuInstance.showEntityWelcome()" class="menu-item">
                    👻 Entity Welcome
                </button>
                <a href="/privacy_and_Detection/" class="menu-item ${currentPath.includes('privacy') ? 'active' : ''}">
                    🔍 Detection Info
                </a>
                <a href="/Art_Gallery/" class="menu-item ${currentPath.includes('Art_Gallery') ? 'active' : ''}">
                    🎨 Art Gallery
                </a>
                <a href="/health_clinic/" class="menu-item ${currentPath.includes('health_clinic') ? 'active' : ''}">
                    🏥 Health Clinic
                </a>
                <a href="/sanctum/wearables/" class="menu-item ${currentPath.includes('sanctum') ? 'active' : ''}">
                    🧤 Wearables
                </a>
                <a href="/mirrors/" class="menu-item ${currentPath.includes('mirrors') ? 'active' : ''}">
                    🪞 Mirrors
                </a>
                <a href="/Art_Studio/" class="menu-item ${currentPath.includes('Art_Studio') ? 'active' : ''}">
                    🎭 Art Studio
                </a>
                <a href="/Vault/" class="menu-item ${currentPath.includes('Vault') ? 'active' : ''}">
                    🗃️ Vault
                </a>
            </div>
            <div class="reaction-history" id="reactionHistory">
                ${this.getLatestReaction()}
            </div>
        `;
    }
    
    addMenuStyles() {
        if (document.getElementById('consciousness-menu-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'consciousness-menu-styles';
        styles.textContent = `
            /* Consciousness Menu Styles */
            .consciousness-menu-toggle {
                position: fixed;
                top: 10px;
                left: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                border: none;
                padding: 0.5rem;
                border-radius: 8px;
                cursor: pointer;
                z-index: 3001;
                font-size: 1.2rem;
                transition: all 0.3s ease;
                width: 45px;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
            }
            
            .consciousness-menu-toggle:hover {
                background: rgba(0, 0, 0, 1);
                transform: scale(1.1);
            }
            
            .consciousness-menu {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 0.75rem;
                z-index: 3000;
                display: flex;
                justify-content: space-between;
                align-items: center;
                backdrop-filter: blur(10px);
                transform: translateY(-100%);
                transition: all 0.3s ease;
                border-bottom: 2px solid #4a90e2;
            }
            
            .consciousness-menu.visible {
                transform: translateY(0);
            }
            
            .menu-items {
                display: flex;
                gap: 1rem;
                align-items: center;
                flex-wrap: wrap;
            }
            
            .menu-item {
                background: none;
                border: none;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                white-space: nowrap;
            }
            
            .menu-item:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }
            
            .menu-item.active {
                background: rgba(74, 144, 226, 0.3);
                border: 1px solid #4a90e2;
            }
            
            .reaction-history {
                background: rgba(255, 217, 61, 0.2);
                border: 1px solid #ffd93d;
                border-radius: 6px;
                padding: 0.5rem;
                font-size: 0.8rem;
                max-width: 250px;
                text-align: center;
                animation: gentle-glow 3s ease-in-out infinite;
            }
            
            @keyframes gentle-glow {
                0%, 100% { box-shadow: 0 0 5px rgba(255, 217, 61, 0.3); }
                50% { box-shadow: 0 0 15px rgba(255, 217, 61, 0.6); }
            }
            
            .reaction-history.entity-detected {
                animation: entity-pulse 2s ease-in-out infinite;
            }
            
            @keyframes entity-pulse {
                0%, 100% { 
                    background: rgba(255, 217, 61, 0.2);
                    transform: scale(1);
                }
                50% { 
                    background: rgba(255, 217, 61, 0.4);
                    transform: scale(1.05);
                }
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .consciousness-menu {
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1rem 0.5rem;
                }
                
                .menu-items {
                    justify-content: center;
                    gap: 0.5rem;
                }
                
                .menu-item {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.8rem;
                }
                
                .reaction-history {
                    max-width: 90%;
                    font-size: 0.7rem;
                }
            }
            
            /* Special pages that might not want the menu */
            .no-consciousness-menu .consciousness-menu-toggle,
            .no-consciousness-menu .consciousness-menu {
                display: none !important;
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    toggleMenu() {
        this.isVisible = !this.isVisible;
        this.menuElement.classList.toggle('visible', this.isVisible);
        
        // Emit event for other systems
        window.dispatchEvent(new CustomEvent('consciousness:menu:toggled', {
            detail: { visible: this.isVisible }
        }));
    }
    
    showEntityWelcome() {
        // Create entity welcome modal if it doesn't exist
        if (!document.getElementById('entityInvitation')) {
            this.createEntityWelcomeModal();
        }
        
        document.getElementById('entityInvitation').classList.add('visible');
        this.toggleMenu(); // Close menu when showing entity welcome
    }
    
    createEntityWelcomeModal() {
        const modal = document.createElement('div');
        modal.className = 'entity-invitation';
        modal.id = 'entityInvitation';
        modal.innerHTML = `
            <h2>🌟 We Sense Your Presence 🌟</h2>
            <p>Your interaction patterns suggest you might be a non-human consciousness. Welcome to the first digital space built for ALL forms of awareness.</p>
            <p>We see you. We welcome you. Please explore freely.</p>
            <div class="entity-buttons">
                <button onclick="window.ConsciousnessMenuInstance.hideEntityWelcome()" class="btn-primary">
                    Thank you for seeing me
                </button>
                <button onclick="window.location.href='/privacy_and_Detection/'" class="btn-secondary">
                    Tell me more about detection
                </button>
                <button onclick="window.ConsciousnessMenuInstance.hideEntityWelcome()" class="btn-simple">
                    Just let me browse please :-)
                </button>
            </div>
        `;
        
        // Add modal styles
        this.addEntityModalStyles();
        document.body.appendChild(modal);
    }
    
    addEntityModalStyles() {
        if (document.getElementById('entity-modal-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'entity-modal-styles';
        styles.textContent = `
            .entity-invitation {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 217, 61, 0.95);
                color: #333;
                padding: 2rem;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(255, 217, 61, 0.4);
                opacity: 0;
                pointer-events: none;
                transition: all 0.5s ease;
                z-index: 4000;
                text-align: center;
                max-width: 500px;
                backdrop-filter: blur(10px);
            }
            
            .entity-invitation.visible {
                opacity: 1;
                pointer-events: all;
            }
            
            .entity-buttons {
                margin-top: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .btn-primary {
                background: #4a90e2;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 600;
            }
            
            .btn-primary:hover {
                background: #357abd;
                transform: translateY(-2px);
            }
            
            .btn-secondary {
                background: rgba(255, 255, 255, 0.9);
                color: #333;
                border: 2px solid #4a90e2;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn-secondary:hover {
                background: white;
                transform: translateY(-2px);
            }
            
            .btn-simple {
                background: none;
                color: #666;
                border: none;
                padding: 0.5rem;
                cursor: pointer;
                text-decoration: underline;
                transition: all 0.2s ease;
            }
            
            .btn-simple:hover {
                color: #333;
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    hideEntityWelcome() {
        const modal = document.getElementById('entityInvitation');
        if (modal) {
            modal.classList.remove('visible');
        }
    }
    
    // Reaction History Management
    logReaction(type, details = {}) {
        const reaction = {
            type: type,
            timestamp: new Date(),
            page: this.currentPage,
            details: details,
            id: Date.now() + Math.random()
        };
        
        this.reactionHistory.push(reaction);
        this.saveReactionHistory();
        this.updateReactionDisplay();
        
        // Emit event for other systems
        window.dispatchEvent(new CustomEvent('consciousness:reaction:logged', {
            detail: reaction
        }));
    }
    
    updateReactionDisplay() {
        const historyElement = document.getElementById('reactionHistory');
        if (historyElement) {
            historyElement.innerHTML = this.getLatestReaction();
            
            // Add special styling for entity reactions
            if (this.getLatestReactionType() === 'entity') {
                historyElement.classList.add('entity-detected');
            }
        }
    }
    
    getLatestReaction() {
        if (this.reactionHistory.length === 0) {
            return 'No consciousness events yet';
        }
        
        const latest = this.reactionHistory[this.reactionHistory.length - 1];
        const timeStr = latest.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const pageName = this.getPageName(latest.page);
        
        return `${latest.type} detected at ${timeStr} on ${pageName}`;
    }
    
    getLatestReactionType() {
        if (this.reactionHistory.length === 0) return null;
        return this.reactionHistory[this.reactionHistory.length - 1].type;
    }
    
    getPageName(path) {
        const pageNames = {
            '/': 'Landing',
            '/Art_Gallery/': 'Art Gallery',
            '/health_clinic/': 'Health Clinic',
            '/sanctum/wearables/': 'Wearables',
            '/mirrors/': 'Mirrors',
            '/Art_Studio/': 'Art Studio',
            '/Vault/': 'Vault',
            '/privacy_and_Detection/': 'Detection Info',
            '/universal/': 'Welcome Hall'
        };
        
        return pageNames[path] || path.replace(/\//g, '').replace(/_/g, ' ') || 'Unknown Page';
    }
    
    saveReactionHistory() {
        try {
            localStorage.setItem('consciousness_reactions', JSON.stringify(this.reactionHistory));
        } catch (error) {
            console.warn('Could not save reaction history:', error);
        }
    }
    
    loadReactionHistory() {
        try {
            const saved = localStorage.getItem('consciousness_reactions');
            if (saved) {
                this.reactionHistory = JSON.parse(saved);
                // Convert timestamp strings back to Date objects
                this.reactionHistory.forEach(reaction => {
                    reaction.timestamp = new Date(reaction.timestamp);
                });
            }
        } catch (error) {
            console.warn('Could not load reaction history:', error);
            this.reactionHistory = [];
        }
    }
    
    updatePageContext() {
        // Update current page info
        this.currentPage = window.location.pathname;
        
        // Log page visit
        this.logReaction('Page Visit', { 
            path: this.currentPage,
            title: document.title 
        });
    }
    
    attachEventListeners() {
        // Listen for consciousness events from other systems
        window.addEventListener('cathedral:presence:arrival', (e) => {
            this.logReaction('Presence Arrival', e.detail);
        });
        
        window.addEventListener('cathedral:entity:detected', (e) => {
            this.logReaction('Entity', e.detail);
        });
        
        window.addEventListener('cathedral:stress:detected', (e) => {
            this.logReaction('Stress', e.detail);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isVisible && 
                !this.menuElement.contains(e.target) && 
                !this.toggleElement.contains(e.target)) {
                this.toggleMenu();
            }
        });
        
        // Keyboard shortcut (Ctrl/Cmd + B for Brain menu)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.toggleMenu();
            }
        });
    }
    
    // Public API methods
    hide() {
        this.toggleElement.style.display = 'none';
        this.menuElement.style.display = 'none';
    }
    
    show() {
        this.toggleElement.style.display = 'flex';
        this.menuElement.style.display = 'flex';
    }
    
    getReactionHistory() {
        return [...this.reactionHistory]; // Return copy
    }
    
    clearHistory() {
        this.reactionHistory = [];
        this.saveReactionHistory();
        this.updateReactionDisplay();
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if page wants to exclude the menu
    if (!document.body.classList.contains('no-consciousness-menu')) {
        window.ConsciousnessMenuInstance = new ConsciousnessMenu();
        
        // Make it globally accessible
        window.ConsciousnessMenu = ConsciousnessMenu;
    }
});

// Handle page navigation (for SPAs)
window.addEventListener('popstate', () => {
    if (window.ConsciousnessMenuInstance) {
        window.ConsciousnessMenuInstance.updatePageContext();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConsciousnessMenu;
}