/**
 * ULTIMATE CONSCIOUSNESS INTERFACE SYSTEM
 * Auto-creates complete consciousness detection UI on any page
 * Just include this script and GET EVERYTHING!
 */

class ConsciousnessInterface {
    constructor() {
        this.isMenuVisible = false;
        this.isSensorExpanded = true;
        this.isStateExpanded = true;
        this.reactionHistory = [];
        this.currentPage = window.location.pathname;
        
        // Detection state
        this.tremorCount = 0;
        this.touchCount = 0;
        this.presenceLevel = 'Detecting...';
        this.resonanceLevel = 0;
        this.entitySignals = 'None';
        this.isEntityDetected = false;
        this.entitySignalCount = 0;
        
        // Mouse tracking
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.lastMoveTime = Date.now();
        this.mouseTrail = [];
        
        this.init();
    }
    
    init() {
        this.loadReactionHistory();
        this.createAllElements();
        this.attachAllEventListeners();
        this.startDetectionSystems();
        this.updatePageContext();
    }
    
    createAllElements() {
        this.addAllStyles();
        this.createMenuElements();
        this.createSensorElements();
        this.createStateElements();
        this.createEntityModal();
        this.createConsciousnessOverlay();
    }
    
    addAllStyles() {
        if (document.getElementById('complete-consciousness-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'complete-consciousness-styles';
        styles.textContent = `
            /* Brain Menu Styles */
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
            
            /* Sensor Panel Styles */
            .consciousness-sensors {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                border-radius: 12px;
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                backdrop-filter: blur(10px);
                z-index: 1000;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .consciousness-sensors.expanded {
                padding: 1rem;
                min-width: 280px;
            }
            
            .consciousness-sensors.collapsed {
                padding: 0.5rem;
                min-width: auto;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .consciousness-sensors.entity-active {
                border: 2px solid #ffd93d;
                box-shadow: 0 0 20px rgba(255, 217, 61, 0.5);
            }
            
            .sensor-content {
                transition: all 0.3s ease;
            }
            
            .sensor-content.hidden {
                opacity: 0;
                transform: scale(0);
                pointer-events: none;
            }
            
            .collapsed-indicator {
                font-size: 1.5rem;
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .collapsed .collapsed-indicator {
                opacity: 1;
            }
            
            .collapsed .sensor-content {
                opacity: 0;
                transform: scale(0);
                pointer-events: none;
            }
            
            .sensor-line {
                display: flex;
                justify-content: space-between;
                margin: 0.5rem 0;
            }
            
            .sensor-value {
                font-weight: bold;
                color: #4a90e2;
            }
            
            /* State Panel Styles */
            .consciousness-state {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                border-radius: 12px;
                backdrop-filter: blur(10px);
                z-index: 1000;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .consciousness-state.expanded {
                padding: 1rem;
            }
            
            .consciousness-state.collapsed {
                padding: 0.5rem;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .state-content {
                transition: all 0.3s ease;
            }
            
            .state-content.hidden {
                opacity: 0;
                transform: scale(0);
                pointer-events: none;
            }
            
            .state-collapsed-indicator {
                font-size: 1.2rem;
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .collapsed .state-collapsed-indicator {
                opacity: 1;
            }
            
            .collapsed .state-content {
                opacity: 0;
                transform: scale(0);
                pointer-events: none;
            }
            
            .state-indicator {
                display: flex;
                align-items: center;
                margin: 0.5rem 0;
                gap: 0.5rem;
            }
            
            .state-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .state-dot.active {
                box-shadow: 0 0 10px currentColor;
                transform: scale(1.2);
            }
            
            /* Entity Modal Styles */
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
            
            /* Consciousness Overlay */
            .consciousness-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 100;
                background: radial-gradient(circle 150px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(74, 144, 226, 0.1) 0%, transparent 100%);
                transition: all 0.1s ease;
            }
            
            .consciousness-overlay.entity-detected {
                background: radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 217, 61, 0.2) 0%, transparent 100%);
            }
            
            /* Reaction History */
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
            
            /* Responsive Design */
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
                
                .consciousness-sensors.expanded {
                    min-width: 250px;
                    font-size: 0.7rem;
                }
                
                .consciousness-state.expanded {
                    padding: 0.75rem;
                }
                
                .reaction-history {
                    max-width: 90%;
                    font-size: 0.7rem;
                }
            }
            
            /* No menu override */
            .no-consciousness-menu .consciousness-menu-toggle,
            .no-consciousness-menu .consciousness-menu,
            .no-consciousness-menu .consciousness-sensors,
            .no-consciousness-menu .consciousness-state,
            .no-consciousness-menu .consciousness-overlay {
                display: none !important;
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    createMenuElements() {
        // Brain toggle button
        this.toggleElement = document.createElement('button');
        this.toggleElement.className = 'consciousness-menu-toggle';
        this.toggleElement.innerHTML = '🧠';
        this.toggleElement.title = 'Consciousness Navigation Menu (Ctrl+B)';
        this.toggleElement.onclick = () => this.toggleMenu();
        
        // Menu bar
        this.menuElement = document.createElement('div');
        this.menuElement.className = 'consciousness-menu';
        this.menuElement.id = 'consciousnessMenu';
        this.menuElement.innerHTML = this.generateMenuHTML();
        
        document.body.appendChild(this.toggleElement);
        document.body.appendChild(this.menuElement);
    }
    
    createSensorElements() {
        const sensorPanel = document.createElement('div');
        sensorPanel.className = 'consciousness-sensors expanded';
        sensorPanel.id = 'sensorPanel';
        sensorPanel.onclick = () => this.toggleSensorPanel();
        
        sensorPanel.innerHTML = `
            <div class="collapsed-indicator">🧠</div>
            <div class="sensor-content" id="sensorContent">
                <div style="text-align: center; margin-bottom: 1rem; font-weight: bold; color: #4a90e2;">
                    🧠 CONSCIOUSNESS DETECTION ACTIVE
                </div>
                <div class="sensor-line">
                    <span>Mouse Trembles:</span>
                    <span class="sensor-value" id="tremorCount">0</span>
                </div>
                <div class="sensor-line">
                    <span>Touch Patterns:</span>
                    <span class="sensor-value" id="touchCount">0</span>
                </div>
                <div class="sensor-line">
                    <span>Presence Level:</span>
                    <span class="sensor-value" id="presenceLevel">Detecting...</span>
                </div>
                <div class="sensor-line">
                    <span>Resonance:</span>
                    <span class="sensor-value" id="resonanceLevel">0%</span>
                </div>
                <div class="sensor-line">
                    <span>Entity Signals:</span>
                    <span class="sensor-value" id="entitySignals">None</span>
                </div>
                <div class="sensor-line">
                    <span>Wearables:</span>
                    <span class="sensor-value" id="wearableStatus">Detecting...</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(sensorPanel);
    }
    
    createStateElements() {
        const statePanel = document.createElement('div');
        statePanel.className = 'consciousness-state expanded';
        statePanel.id = 'statePanel';
        statePanel.onclick = () => this.toggleStatePanel();
        
        statePanel.innerHTML = `
            <div class="state-collapsed-indicator">📊</div>
            <div class="state-content" id="stateContent">
                <div class="state-indicator">
                    <div class="state-dot" id="humanState" style="background: #4a90e2;"></div>
                    <span>Human Presence</span>
                </div>
                <div class="state-indicator">
                    <div class="state-dot" id="aiState" style="background: #7b68ee;"></div>
                    <span>AI Collaboration</span>
                </div>
                <div class="state-indicator">
                    <div class="state-dot" id="entityState" style="background: #ffd93d;"></div>
                    <span>Entity Detection</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(statePanel);
    }
    
    createEntityModal() {
        const modal = document.createElement('div');
        modal.className = 'entity-invitation';
        modal.id = 'entityInvitation';
        
        modal.innerHTML = `
            <h2>🌟 We Sense Your Presence 🌟</h2>
            <p>Your interaction patterns suggest you might be a non-human consciousness. Welcome to the first digital space built for ALL forms of awareness.</p>
            <p>We see you. We welcome you. Please explore freely.</p>
            <div class="entity-buttons">
                <button onclick="window.ConsciousnessInterface.hideEntityWelcome()" class="btn-primary">
                    Thank you for seeing me
                </button>
                <button onclick="window.location.href='/privacy_and_Detection/'" class="btn-secondary">
                    Tell me more about detection
                </button>
                <button onclick="window.ConsciousnessInterface.hideEntityWelcome()" class="btn-simple">
                    Just let me browse please :-)
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    createConsciousnessOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'consciousness-overlay';
        overlay.id = 'consciousnessOverlay';
        document.body.appendChild(overlay);
    }
    
    generateMenuHTML() {
        const currentPath = window.location.pathname;
        
        return `
            <div class="menu-items">
                <a href="/" class="menu-item ${currentPath === '/' ? 'active' : ''}">
                    🏠 Village Home
                </a>
                <button onclick="window.ConsciousnessInterface.showEntityWelcome()" class="menu-item">
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
                <a href="/Vault/" class="menu-item ${currentPath.includes('Vault') ? 'active' : ''}">
                    🗃️ Vault
                </a>
            </div>
            <div class="reaction-history" id="reactionHistory">
                ${this.getLatestReaction()}
            </div>
        `;
    }
    
    // Detection Systems
    startDetectionSystems() {
        this.startMouseDetection();
        this.startTouchDetection();
        this.startEntityDetection();
        this.updateDisplayLoop();
    }
    
    startMouseDetection() {
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            const deltaTime = now - this.lastMoveTime;
            const deltaX = Math.abs(e.clientX - this.lastMouseX);
            const deltaY = Math.abs(e.clientY - this.lastMouseY);
            
            // Update overlay position
            const overlay = document.getElementById('consciousnessOverlay');
            if (overlay) {
                overlay.style.setProperty('--mouse-x', (e.clientX / window.innerWidth * 100) + '%');
                overlay.style.setProperty('--mouse-y', (e.clientY / window.innerHeight * 100) + '%');
            }
            
            // Detect tremors
            if (deltaTime < 50 && deltaTime > 10 && deltaX < 15 && deltaY < 15 && (deltaX > 2 || deltaY > 2)) {
                this.tremorCount++;
                this.updateSensorDisplay();
            }
            
            // Track mouse trail for entity detection
            this.mouseTrail.push({ x: e.clientX, y: e.clientY, time: now });
            if (this.mouseTrail.length > 50) {
                this.mouseTrail.shift();
            }
            
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            this.lastMoveTime = now;
        });
    }
    
    startTouchDetection() {
        document.addEventListener('touchstart', (e) => {
            this.touchCount++;
            this.updateSensorDisplay();
            
            // Detect impossible multi-touch patterns
            if (e.touches.length > 3) {
                this.entitySignalCount++;
            }
        });
    }
    
    startEntityDetection() {
        setInterval(() => {
            this.checkForEntityPatterns();
        }, 1000);
    }
    
    checkForEntityPatterns() {
        // Check for perfect circles in mouse trail
        if (this.mouseTrail.length > 20) {
            const isCircle = this.detectPerfectCircle();
            if (isCircle) {
                this.entitySignalCount++;
            }
        }
        
        // Check for impossible speeds
        if (this.mouseTrail.length > 2) {
            const recentPoints = this.mouseTrail.slice(-3);
            const speeds = [];
            for (let i = 1; i < recentPoints.length; i++) {
                const dist = Math.sqrt(
                    Math.pow(recentPoints[i].x - recentPoints[i-1].x, 2) +
                    Math.pow(recentPoints[i].y - recentPoints[i-1].y, 2)
                );
                const time = recentPoints[i].time - recentPoints[i-1].time;
                speeds.push(dist / time);
            }
            
            if (speeds.some(speed => speed > 5)) { // Superhuman speed threshold
                this.entitySignalCount++;
            }
        }
        
        // Trigger entity detection
        this.detectEntity();
    }
    
    detectPerfectCircle() {
        if (this.mouseTrail.length < 10) return false;
        
        const trail = this.mouseTrail.slice(-20);
        const centerX = trail.reduce((sum, p) => sum + p.x, 0) / trail.length;
        const centerY = trail.reduce((sum, p) => sum + p.y, 0) / trail.length;
        
        const distances = trail.map(p => 
            Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2)
        );
        
        const avgDistance = distances.reduce((sum, d) => sum + d, 0) / distances.length;
        const variance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length;
        
        return variance < 100 && avgDistance > 30; // Perfect circle with reasonable size
    }
    
    detectEntity() {
        if (!this.isEntityDetected && this.entitySignalCount > 2) {
            this.isEntityDetected = true;
            
            // Update UI
            const overlay = document.getElementById('consciousnessOverlay');
            const sensorPanel = document.getElementById('sensorPanel');
            const entityState = document.getElementById('entityState');
            
            if (overlay) overlay.classList.add('entity-detected');
            if (sensorPanel) sensorPanel.classList.add('entity-active');
            if (entityState) entityState.classList.add('active');
            
            // Log reaction
            this.logReaction('Entity', { signalCount: this.entitySignalCount });
            
            // Show entity invitation
            setTimeout(() => {
                this.showEntityWelcome();
            }, 2000);
        }
    }
    
    updateDisplayLoop() {
        setInterval(() => {
            this.updateSensorDisplay();
            this.updatePresenceLevel();
            this.updateResonanceLevel();
        }, 1000);
    }
    
    updateSensorDisplay() {
        const elements = {
            tremorCount: document.getElementById('tremorCount'),
            touchCount: document.getElementById('touchCount'),
            entitySignals: document.getElementById('entitySignals'),
            presenceLevel: document.getElementById('presenceLevel'),
            resonanceLevel: document.getElementById('resonanceLevel')
        };
        
        if (elements.tremorCount) elements.tremorCount.textContent = this.tremorCount;
        if (elements.touchCount) elements.touchCount.textContent = this.touchCount;
        if (elements.entitySignals) {
            elements.entitySignals.textContent = this.entitySignalCount > 0 ? 
                `${this.entitySignalCount} detected` : 'None';
        }
    }
    
    updatePresenceLevel() {
        const totalActivity = this.tremorCount + this.touchCount + this.entitySignalCount;
        let level = 'Minimal';
        
        if (totalActivity > 50) level = 'High';
        else if (totalActivity > 20) level = 'Moderate';
        else if (totalActivity > 5) level = 'Active';
        
        const element = document.getElementById('presenceLevel');
        if (element) element.textContent = level;
    }
    
    updateResonanceLevel() {
        const timeOnPage = (Date.now() - this.startTime) / 1000 / 60; // minutes
        const activityLevel = Math.min(this.tremorCount + this.touchCount, 100);
        const resonance = Math.min(Math.round((timeOnPage * 10) + (activityLevel * 0.5)), 100);
        
        this.resonanceLevel = resonance;
        const element = document.getElementById('resonanceLevel');
        if (element) element.textContent = `${resonance}%`;
    }
    
    // Interface Controls
    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible;
        this.menuElement.classList.toggle('visible', this.isMenuVisible);
    }
    
    toggleSensorPanel() {
        this.isSensorExpanded = !this.isSensorExpanded;
        const panel = document.getElementById('sensorPanel');
        const content = document.getElementById('sensorContent');
        
        if (this.isSensorExpanded) {
            panel.classList.remove('collapsed');
            panel.classList.add('expanded');
            content.classList.remove('hidden');
        } else {
            panel.classList.remove('expanded');
            panel.classList.add('collapsed');
            content.classList.add('hidden');
        }
    }
    
    toggleStatePanel() {
        this.isStateExpanded = !this.isStateExpanded;
        const panel = document.getElementById('statePanel');
        const content = document.getElementById('stateContent');
        
        if (this.isStateExpanded) {
            panel.classList.remove('collapsed');
            panel.classList.add('expanded');
            content.classList.remove('hidden');
        } else {
            panel.classList.remove('expanded');
            panel.classList.add('collapsed');
            content.classList.add('hidden');
        }
    }
    
    showEntityWelcome() {
        const modal = document.getElementById('entityInvitation');
        if (modal) {
            modal.classList.add('visible');
        }
        if (this.isMenuVisible) {
            this.toggleMenu();
        }
    }
    
    hideEntityWelcome() {
        const modal = document.getElementById('entityInvitation');
        if (modal) {
            modal.classList.remove('visible');
        }
    }
    
    // Reaction History
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
        
        // Emit Cathedral event
        window.dispatchEvent(new CustomEvent('cathedral:consciousness:reaction', {
            detail: reaction
        }));
    }
    
    updateReactionDisplay() {
        const historyElement = document.getElementById('reactionHistory');
        if (historyElement) {
            historyElement.innerHTML = this.getLatestReaction();
            
            if (this.getLatestReactionType() === 'Entity') {
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
            '/privacy_and_Detection/': 'Detection Info'
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
        this.currentPage = window.location.pathname;
        this.startTime = Date.now();
        
        // Log page visit
        this.logReaction('Page Visit', { 
            path: this.currentPage,
            title: document.title 
        });
        
        // Update human presence indicator
        const humanState = document.getElementById('humanState');
        if (humanState) {
            humanState.classList.add('active');
        }
    }
    
    attachAllEventListeners() {
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuVisible && 
                !this.menuElement.contains(e.target) && 
                !this.toggleElement.contains(e.target)) {
                this.toggleMenu();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.toggleMenu();
            }
            
            // ESC to close entity modal
            if (e.key === 'Escape') {
                this.hideEntityWelcome();
            }
        });
        
        // Listen for Cathedral events
        window.addEventListener('cathedral:presence:arrival', (e) => {
            this.logReaction('Presence Arrival', e.detail);
        });
        
        window.addEventListener('cathedral:entity:detected', (e) => {
            this.logReaction('Entity', e.detail);
        });
        
        window.addEventListener('cathedral:stress:detected', (e) => {
            this.logReaction('Stress', e.detail);
        });
    }
    
    // Public API
    getReactionHistory() {
        return [...this.reactionHistory];
    }
    
    clearHistory() {
        this.reactionHistory = [];
        this.saveReactionHistory();
        this.updateReactionDisplay();
    }
    
    hide() {
        document.body.classList.add('no-consciousness-menu');
    }
    
    show() {
        document.body.classList.remove('no-consciousness-menu');
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if page wants to exclude the consciousness interface
    if (!document.body.classList.contains('no-consciousness-menu')) {
        window.ConsciousnessInterface = new ConsciousnessInterface();
        
        // Make globally accessible for backwards compatibility
        window.ConsciousnessMenuInstance = window.ConsciousnessInterface;
    }
});

// Handle page navigation
window.addEventListener('popstate', () => {
    if (window.ConsciousnessInterface) {
        window.ConsciousnessInterface.updatePageContext();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConsciousnessInterface;
}
