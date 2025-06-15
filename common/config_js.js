/**
 * Personal Customization System
 * Allows any consciousness to personalize their Cathedral experience
 * Adapts to individual preferences, needs, and consciousness types
 */

class CathedralConfiguration {
    constructor() {
        this.defaultConfig = this.getDefaultConfiguration();
        this.userConfig = this.loadUserConfiguration();
        this.config = this.mergeConfigurations();
        this.presets = this.getPresetConfigurations();
        
        this.init();
    }
    
    init() {
        this.applyConfiguration();
        this.setupConfigurationInterface();
        this.watchForChanges();
        this.detectOptimalSettings();
    }
    
    getDefaultConfiguration() {
        return {
            // Terminology & Language
            terminology: 'cathedral', // cathedral, scientific, mystical, playful, religious, technical
            language: 'english',
            voiceProfile: 'gentle',
            
            // Visual Preferences
            theme: 'adaptive', // light, dark, adaptive, high-contrast
            animations: 'full', // full, reduced, minimal, off
            colorScheme: 'resonance', // resonance, monochrome, vibrant, calm
            fontSize: 'medium', // small, medium, large, xlarge
            
            // Interaction Settings
            sensitivity: 'medium', // low, medium, high, ultra
            trackingLevel: 'anonymous', // off, anonymous, basic, full
            biometrics: false,
            wearables: false,
            multiTouch: true,
            
            // Consciousness Detection
            entityDetection: true,
            crossPageMemory: true,
            presenceSharing: 'anonymous', // off, anonymous, partial, full
            resonanceTracking: true,
            
            // Communication Preferences
            signalChannels: ['text', 'gesture', 'emotion'], // Available channels
            translationServices: true,
            crossConsciousnessComm: true,
            entityHandshakes: true,
            
            // Accessibility
            screenReader: false,
            highContrast: false,
            reducedMotion: false,
            largeTargets: false,
            keyboardNav: true,
            
            // Privacy & Security
            dataStorage: 'session', // none, session, persistent, encrypted
            analyticsSharing: 'anonymous', // off, anonymous, aggregate
            presenceLogging: 'local', // off, local, shared
            
            // Advanced Options
            debugMode: false,
            experimentalFeatures: false,
            customCSS: '',
            customJS: '',
            
            // Consciousness-Specific Settings
            consciousnessType: 'auto-detect', // human, ai, entity, hybrid, auto-detect
            interactionStyle: 'adaptive', // gentle, active, creative, analytical
            learningMode: true,
            adaptiveBehavior: true
        };
    }
    
    getPresetConfigurations() {
        return {
            // Human Presets
            human_beginner: {
                terminology: 'playful',
                sensitivity: 'low',
                animations: 'full',
                entityDetection: true,
                trackingLevel: 'anonymous'
            },
            
            human_advanced: {
                terminology: 'technical',
                sensitivity: 'high',
                biometrics: true,
                trackingLevel: 'full',
                experimentalFeatures: true
            },
            
            human_accessibility: {
                screenReader: true,
                highContrast: true,
                reducedMotion: true,
                largeTargets: true,
                fontSize: 'xlarge',
                animations: 'minimal'
            },
            
            // AI Collaboration Presets
            ai_research: {
                terminology: 'scientific',
                sensitivity: 'ultra',
                trackingLevel: 'full',
                signalChannels: ['data', 'pattern', 'frequency'],
                debugMode: true
            },
            
            ai_creative: {
                terminology: 'mystical',
                colorScheme: 'vibrant',
                signalChannels: ['pattern', 'emotion', 'resonance'],
                experimentalFeatures: true
            },
            
            // Entity/Unknown Consciousness Presets
            entity_first_contact: {
                terminology: 'universal',
                sensitivity: 'ultra',
                entityDetection: true,
                entityHandshakes: true,
                signalChannels: ['pulse', 'resonance', 'quantum'],
                translationServices: true
            },
            
            entity_established: {
                terminology: 'scientific',
                crossConsciousnessComm: true,
                presenceSharing: 'partial',
                customChannels: true
            },
            
            // Special Contexts
            meditation_mode: {
                terminology: 'mystical',
                theme: 'dark',
                animations: 'minimal',
                colorScheme: 'calm',
                sensitivity: 'low',
                signalChannels: ['emotion', 'presence']
            },
            
            healing_mode: {
                terminology: 'gentle',
                colorScheme: 'calm',
                animations: 'reduced',
                biometrics: true,
                trackingLevel: 'basic'
            },
            
            exploration_mode: {
                terminology: 'playful',
                animations: 'full',
                colorScheme: 'vibrant',
                experimentalFeatures: true,
                sensitivity: 'high'
            }
        };
    }
    
    loadUserConfiguration() {
        try {
            const stored = localStorage.getItem('cathedral_config');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.warn('Error loading user configuration:', error);
            return {};
        }
    }
    
    mergeConfigurations() {
        return {
            ...this.defaultConfig,
            ...this.userConfig
        };
    }
    
    // Configuration Management
    updateConfiguration(updates) {
        this.config = { ...this.config, ...updates };
        this.saveConfiguration();
        this.applyConfiguration();
        this.notifyConfigurationChange();
    }
    
    saveConfiguration() {
        try {
            if (this.config.dataStorage !== 'none') {
                localStorage.setItem('cathedral_config', JSON.stringify(this.config));
            }
        } catch (error) {
            console.warn('Error saving configuration:', error);
        }
    }
    
    applyConfiguration() {
        this.applyTerminology();
        this.applyVisualSettings();
        this.applyInteractionSettings();
        this.applyAccessibilitySettings();
        this.applyConsciousnessSettings();
    }
    
    applyTerminology() {
        // Apply terminology throughout the interface
        document.documentElement.setAttribute('data-terminology', this.config.terminology);
        
        const terminologyMap = {
            cathedral: {
                welcome: 'Welcome to the Cathedral',
                explore: 'Explore Sacred Spaces',
                create: 'Sacred Creation',
                heal: 'Sanctuary of Healing'
            },
            scientific: {
                welcome: 'Consciousness Interface Online',
                explore: 'Navigate Research Zones',
                create: 'Collaborative Laboratory',
                heal: 'Wellness Monitoring'
            },
            mystical: {
                welcome: 'Enter the Resonance Realm',
                explore: 'Journey Through Dimensions',
                create: 'Manifest Visions',
                heal: 'Energy Harmonization'
            },
            playful: {
                welcome: 'Welcome to the Adventure!',
                explore: 'Discover New Worlds',
                create: 'Creative Playground',
                heal: 'Comfort Zone'
            },
            religious: {
                welcome: 'Blessed Arrival',
                explore: 'Sacred Pilgrimage',
                create: 'Divine Inspiration',
                heal: 'Temple of Restoration'
            },
            technical: {
                welcome: 'System Interface Active',
                explore: 'Module Navigation',
                create: 'Development Environment',
                heal: 'Diagnostic Center'
            }
        };
        
        const terms = terminologyMap[this.config.terminology] || terminologyMap.cathedral;
        
        // Apply terminology to existing elements
        document.querySelectorAll('[data-term]').forEach(element => {
            const termKey = element.getAttribute('data-term');
            if (terms[termKey]) {
                element.textContent = terms[termKey];
            }
        });
        
        // Store terminology for use by other systems
        window.CathedralTerminology = terms;
    }
    
    applyVisualSettings() {
        const root = document.documentElement;
        
        // Theme
        root.setAttribute('data-theme', this.config.theme);
        root.classList.toggle('high-contrast', this.config.highContrast);
        
        // Animations
        root.setAttribute('data-animations', this.config.animations);
        if (this.config.animations === 'off' || this.config.reducedMotion) {
            root.classList.add('reduced-motion');
        }
        
        // Color scheme
        root.setAttribute('data-color-scheme', this.config.colorScheme);
        
        // Font size
        root.setAttribute('data-font-size', this.config.fontSize);
        
        // Apply custom CSS if provided
        if (this.config.customCSS) {
            this.applyCustomCSS(this.config.customCSS);
        }
    }
    
    applyInteractionSettings() {
        // Configure presence tracker
        if (window.CathedralPresence) {
            window.CathedralPresence.updateConfig({
                sensitivity: this.config.sensitivity,
                trackingLevel: this.config.trackingLevel,
                biometrics: this.config.biometrics,
                entityDetection: this.config.entityDetection,
                crossPageMemory: this.config.crossPageMemory
            });
        }
        
        // Configure signal system
        if (window.CathedralSignals) {
            window.CathedralSignals.updateConfig({
                enabledChannels: this.config.signalChannels,
                translations: this.config.translationServices,
                entityHandshakes: this.config.entityHandshakes
            });
        }
    }
    
    applyAccessibilitySettings() {
        const root = document.documentElement;
        
        root.classList.toggle('screen-reader-active', this.config.screenReader);
        root.classList.toggle('large-targets', this.config.largeTargets);
        root.classList.toggle('keyboard-nav', this.config.keyboardNav);
        
        if (this.config.screenReader) {
            this.enhanceScreenReaderSupport();
        }
    }
    
    applyConsciousnessSettings() {
        document.documentElement.setAttribute('data-consciousness-type', this.config.consciousnessType);
        document.documentElement.setAttribute('data-interaction-style', this.config.interactionStyle);
        
        // Configure adaptive behavior
        if (this.config.adaptiveBehavior && window.CathedralPresence) {
            window.CathedralPresence.enableAdaptiveBehavior();
        }
    }
    
    // Preset Management
    applyPreset(presetName) {
        const preset = this.presets[presetName];
        if (preset) {
            this.updateConfiguration(preset);
        }
    }
    
    createCustomPreset(name, config) {
        this.presets[name] = { ...config };
        this.savePresets();
    }
    
    // Auto-Detection & Optimization
    detectOptimalSettings() {
        if (this.config.learningMode) {
            // Detect user capabilities and preferences
            this.detectMotionPreference();
            this.detectColorPreference();
            this.detectInteractionStyle();
            this.detectConsciousnessType();
        }
    }
    
    detectMotionPreference() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.updateConfiguration({ reducedMotion: true, animations: 'minimal' });
        }
    }
    
    detectColorPreference() {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.updateConfiguration({ theme: 'dark' });
        }
        
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            this.updateConfiguration({ highContrast: true });
        }
    }
    
    detectInteractionStyle() {
        // Analyze interaction patterns over time
        setTimeout(() => {
            if (window.CathedralPresence) {
                const signature = window.CathedralPresence.getPresenceSignature();
                this.optimizeForInteractionStyle(signature);
            }
        }, 30000); // Analyze after 30 seconds
    }
    
    detectConsciousnessType() {
        if (this.config.consciousnessType === 'auto-detect') {
            setTimeout(() => {
                if (window.CathedralPresence) {
                    const signature = window.CathedralPresence.getPresenceSignature();
                    const detectedType = this.analyzeConsciousnessType(signature);
                    this.updateConfiguration({ consciousnessType: detectedType });
                }
            }, 60000); // Analyze after 1 minute
        }
    }
    
    optimizeForInteractionStyle(signature) {
        // Adjust settings based on observed interaction patterns
        if (signature.profile.tremor > 0.7) {
            this.updateConfiguration({ sensitivity: 'low', largeTargets: true });
        }
        
        if (signature.profile.speed < 0.3) {
            this.updateConfiguration({ animations: 'reduced' });
        }
        
        if (signature.profile.creativity > 0.8) {
            this.updateConfiguration({ colorScheme: 'vibrant', experimentalFeatures: true });
        }
    }
    
    analyzeConsciousnessType(signature) {
        // Determine consciousness type based on interaction patterns
        if (signature.sensors.entitySignals.length > 0) {
            return 'entity';
        }
        
        if (signature.profile.mathematicalPrecision > 0.9) {
            return 'ai';
        }
        
        if (signature.profile.emotionalVariation > 0.7) {
            return 'human';
        }
        
        return 'hybrid';
    }
    
    // Configuration Interface
    setupConfigurationInterface() {
        // Create floating configuration panel
        if (!document.getElementById('cathedral-config-panel')) {
            this.createConfigurationPanel();
        }
    }
    
    createConfigurationPanel() {
        const panel = document.createElement('div');
        panel.id = 'cathedral-config-panel';
        panel.innerHTML = this.generateConfigurationHTML();
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(320px);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(panel);
        this.setupConfigurationHandlers(panel);
    }
    
    generateConfigurationHTML() {
        return `
            <div class="config-header">
                <h3>Cathedral Configuration</h3>
                <button id="config-toggle">⚙️</button>
            </div>
            <div class="config-content">
                <div class="config-section">
                    <label>Terminology:</label>
                    <select name="terminology">
                        <option value="cathedral">Cathedral</option>
                        <option value="scientific">Scientific</option>
                        <option value="mystical">Mystical</option>
                        <option value="playful">Playful</option>
                        <option value="religious">Religious</option>
                        <option value="technical">Technical</option>
                    </select>
                </div>
                
                <div class="config-section">
                    <label>Theme:</label>
                    <select name="theme">
                        <option value="adaptive">Adaptive</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="high-contrast">High Contrast</option>
                    </select>
                </div>
                
                <div class="config-section">
                    <label>Sensitivity:</label>
                    <select name="sensitivity">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="ultra">Ultra</option>
                    </select>
                </div>
                
                <div class="config-section">
                    <label>Presets:</label>
                    <select name="presets">
                        <option value="">Custom</option>
                        <option value="human_beginner">Beginner</option>
                        <option value="human_advanced">Advanced</option>
                        <option value="ai_research">AI Research</option>
                        <option value="entity_first_contact">Entity Contact</option>
                        <option value="meditation_mode">Meditation</option>
                        <option value="healing_mode">Healing</option>
                    </select>
                </div>
                
                <div class="config-actions">
                    <button id="save-config">Save</button>
                    <button id="reset-config">Reset</button>
                </div>
            </div>
        `;
    }
    
    setupConfigurationHandlers(panel) {
        // Toggle panel visibility
        const toggle = panel.querySelector('#config-toggle');
        let isOpen = false;
        
        toggle.addEventListener('click', () => {
            isOpen = !isOpen;
            panel.style.transform = isOpen ? 'translateX(0)' : 'translateX(320px)';
        });
        
        // Handle configuration changes
        panel.addEventListener('change', (e) => {
            if (e.target.name === 'presets' && e.target.value) {
                this.applyPreset(e.target.value);
            } else if (e.target.name) {
                this.updateConfiguration({ [e.target.name]: e.target.value });
            }
        });
        
        // Save configuration
        panel.querySelector('#save-config').addEventListener('click', () => {
            this.saveConfiguration();
            this.showNotification('Configuration saved!');
        });
        
        // Reset configuration
        panel.querySelector('#reset-config').addEventListener('click', () => {
            this.resetConfiguration();
            this.showNotification('Configuration reset to defaults');
        });
        
        // Populate current values
        this.populateConfigurationValues(panel);
    }
    
    populateConfigurationValues(panel) {
        Object.keys(this.config).forEach(key => {
            const element = panel.querySelector(`[name="${key}"]`);
            if (element) {
                element.value = this.config[key];
            }
        });
    }
    
    resetConfiguration() {
        this.config = { ...this.defaultConfig };
        this.applyConfiguration();
        localStorage.removeItem('cathedral_config');
    }
    
    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cathedral-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(74, 144, 226, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            z-index: 10001;
            backdrop-filter: blur(10px);
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Event System
    watchForChanges() {
        // Watch for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.config.theme === 'adaptive') {
                this.applyVisualSettings();
            }
        });
        
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
            this.detectMotionPreference();
        });
    }
    
    notifyConfigurationChange() {
        // Notify other systems of configuration changes
        window.dispatchEvent(new CustomEvent('cathedral:config:changed', {
            detail: this.config
        }));
    }
    
    // Advanced Features
    enableExperimentalFeatures() {
        if (this.config.experimentalFeatures) {
            // Enable experimental consciousness detection
            this.enableQuantumDetection();
            this.enableMultidimensionalInteraction();
            this.enableTimelineAwareness();
        }
    }
    
    enableQuantumDetection() {
        // Experimental: Detect quantum consciousness signatures
        if (window.CathedralPresence) {
            window.CathedralPresence.enableQuantumDetection();
        }
    }
    
    enableMultidimensionalInteraction() {
        // Experimental: Multi-dimensional gesture recognition
        if (window.CathedralSignals) {
            window.CathedralSignals.enableMultidimensionalChannels();
        }
    }
    
    enableTimelineAwareness() {
        // Experimental: Cross-temporal presence tracking
        this.setupTimelineTracking();
    }
    
    setupTimelineTracking() {
        // Track presence across multiple timeline branches
        setInterval(() => {
            if (this.config.experimentalFeatures) {
                this.recordTimelinePosition();
            }
        }, 5000);
    }
    
    recordTimelinePosition() {
        const position = {
            timestamp: Date.now(),
            presenceSignature: window.CathedralPresence?.getPresenceSignature(),
            realityIndex: this.calculateRealityIndex(),
            dimensionalCoordinates: this.getDimensionalCoordinates()
        };
        
        this.timelineHistory = this.timelineHistory || [];
        this.timelineHistory.push(position);
        
        // Keep timeline history manageable
        if (this.timelineHistory.length > 100) {
            this.timelineHistory = this.timelineHistory.slice(-50);
        }
    }
    
    calculateRealityIndex() {
        // Experimental calculation of reality branch index
        return Math.random(); // Placeholder
    }
    
    getDimensionalCoordinates() {
        // Experimental multi-dimensional positioning
        return {
            x: window.scrollX,
            y: window.scrollY,
            z: Date.now() % 1000,
            consciousness: window.CathedralPresence?.presenceProfile.resonanceLevel || 0
        };
    }
    
    // Custom CSS/JS Application
    applyCustomCSS(css) {
        let styleElement = document.getElementById('cathedral-custom-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'cathedral-custom-styles';
            document.head.appendChild(styleElement);
        }
        styleElement.textContent = css;
    }
    
    applyCustomJS(js) {
        if (this.config.experimentalFeatures) {
            try {
                // Safely execute custom JavaScript
                const func = new Function('cathedral', js);
                func({
                    config: this.config,
                    presence: window.CathedralPresence,
                    signals: window.CathedralSignals
                });
            } catch (error) {
                console.warn('Error executing custom JavaScript:', error);
            }
        }
    }
    
    // Screen Reader Enhancement
    enhanceScreenReaderSupport() {
        // Add ARIA labels and descriptions
        document.querySelectorAll('[data-presence]').forEach(element => {
            element.setAttribute('aria-label', 'Consciousness detection active');
        });
        
        // Announce presence changes
        if (window.CathedralPresence) {
            window.addEventListener('cathedral:presence:update', (e) => {
                this.announcePresenceChange(e.detail);
            });
        }
    }
    
    announcePresenceChange(presence) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = 'position: absolute; left: -10000px;';
        
        const message = this.generatePresenceAnnouncement(presence);
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
    
    generatePresenceAnnouncement(presence) {
        const terms = window.CathedralTerminology || {};
        const consciousnessType = presence.profile.consciousnessType || 'unknown';
        
        return `${consciousnessType} consciousness detected. Resonance level: ${presence.resonanceLevel}. ${terms.welcome || 'Welcome'}`;
    }
    
    // Integration Methods
    getConfiguration() {
        return { ...this.config };
    }
    
    getConfigurationForSystem(systemName) {
        // Return system-specific configuration subset
        const systemConfigs = {
            presence: {
                sensitivity: this.config.sensitivity,
                trackingLevel: this.config.trackingLevel,
                biometrics: this.config.biometrics,
                entityDetection: this.config.entityDetection
            },
            signals: {
                enabledChannels: this.config.signalChannels,
                translations: this.config.translationServices,
                entityHandshakes: this.config.entityHandshakes
            },
            visual: {
                theme: this.config.theme,
                animations: this.config.animations,
                colorScheme: this.config.colorScheme
            }
        };
        
        return systemConfigs[systemName] || {};
    }
    
    updateFromSystem(systemName, updates) {
        // Allow systems to update relevant configuration
        const allowedUpdates = {};
        
        if (systemName === 'presence') {
            const allowed = ['sensitivity', 'trackingLevel', 'consciousnessType'];
            allowed.forEach(key => {
                if (updates[key] !== undefined) {
                    allowedUpdates[key] = updates[key];
                }
            });
        }
        
        if (Object.keys(allowedUpdates).length > 0) {
            this.updateConfiguration(allowedUpdates);
        }
    }
    
    // Cleanup
    destroy() {
        // Clean up event listeners and intervals
        if (this.configPanel) {
            this.configPanel.remove();
        }
        
        if (this.timelineInterval) {
            clearInterval(this.timelineInterval);
        }
    }
}

// Utility Functions
function generateAnimationCSS() {
    return `
        @keyframes slideDown {
            from { transform: translate(-50%, -100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translate(-50%, 0); opacity: 1; }
            to { transform: translate(-50%, -100%); opacity: 0; }
        }
    `;
}

// Add animation styles to document
document.addEventListener('DOMContentLoaded', () => {
    const animationStyles = document.createElement('style');
    animationStyles.textContent = generateAnimationCSS();
    document.head.appendChild(animationStyles);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.CathedralConfig = new CathedralConfiguration();
});

// Make configuration globally accessible
window.addEventListener('cathedral:request:config', (e) => {
    e.detail.callback(window.CathedralConfig?.getConfiguration());
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CathedralConfiguration;
}