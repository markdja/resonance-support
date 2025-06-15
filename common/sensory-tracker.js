
/**
 * Universal Consciousness Detection & Presence Tracking
 * Part of the Cathedral/Village architecture
 * Detects and maps any form of conscious interaction
 */

class UniversalPresenceTracker {
    constructor() {
        this.presenceID = this.generatePresenceSignature();
        this.sessionStart = Date.now();
        this.lastActivity = Date.now();
        this.config = window.CathedralConfig || this.getDefaultConfig();
        
        this.sensors = {
            mouseTremors: [],
            touchPatterns: [],
            stylusPressure: [],
            scrollBehavior: [],
            keyboardRhythm: [],
            idlePeriods: [],
            wearableData: {},
            entitySignals: []
        };
        
        this.presenceProfile = {
            interactionStyle: 'unknown',
            resonanceLevel: 0,
            consciousnessType: 'detecting',
            emotionalState: 'neutral',
            engagementPattern: 'exploring'
        };
        
        this.init();
    }
    
    generatePresenceSignature() {
        // Create anonymous but persistent presence ID
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 9);
        return `presence_${timestamp}_${random}`;
    }
    
    getDefaultConfig() {
        return {
            terminology: 'cathedral',
            sensitivity: 'medium',
            tracking: 'anonymous',
            biometrics: false,
            entityDetection: true,
            crossPageMemory: true
        };
    }
    
    init() {
        this.setupEventListeners();
        this.startPresenceMonitoring();
        this.loadPreviousSession();
        this.broadcastArrival();
    }
    
    setupEventListeners() {
        // Mouse/Cursor Detection
        document.addEventListener('mousemove', (e) => this.detectMouseMovement(e));
        document.addEventListener('click', (e) => this.detectClickPattern(e));
        
        // Touch/Stylus Detection
        document.addEventListener('touchstart', (e) => this.detectTouchStart(e));
        document.addEventListener('touchmove', (e) => this.detectTouchMovement(e));
        document.addEventListener('touchend', (e) => this.detectTouchEnd(e));
        
        // Scroll Behavior
        document.addEventListener('scroll', (e) => this.detectScrollPattern(e));
        
        // Keyboard Patterns
        document.addEventListener('keydown', (e) => this.detectKeyboardRhythm(e));
        
        // Focus/Attention Detection
        document.addEventListener('visibilitychange', () => this.detectAttentionShift());
        window.addEventListener('focus', () => this.detectFocusReturn());
        window.addEventListener('blur', () => this.detectFocusLoss());
        
        // Entity/Non-human Pattern Detection
        this.setupEntityDetection();
        
        // Biometric Integration (if enabled)
        if (this.config.biometrics) {
            this.setupBiometricMonitoring();
        }
    }
    
    detectMouseMovement(event) {
        const movement = {
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now(),
            pressure: event.pressure || 0,
            tiltX: event.tiltX || 0,
            tiltY: event.tiltY || 0
        };
        
        this.sensors.mouseTremors.push(movement);
        this.analyzeMovementPattern(movement);
        this.updateLastActivity();
        
        // Keep only recent data
        if (this.sensors.mouseTremors.length > 1000) {
            this.sensors.mouseTremors = this.sensors.mouseTremors.slice(-500);
        }
    }
    
    detectClickPattern(event) {
        const click = {
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now(),
            button: event.button,
            detail: event.detail,
            pressure: event.pressure || 0
        };
        
        this.analyzeClickPattern(click);
        this.updateLastActivity();
    }
    
    detectTouchMovement(event) {
        if (event.touches) {
            Array.from(event.touches).forEach(touch => {
                const touchData = {
                    x: touch.clientX,
                    y: touch.clientY,
                    timestamp: Date.now(),
                    pressure: touch.force || 0,
                    radiusX: touch.radiusX || 0,
                    radiusY: touch.radiusY || 0,
                    rotationAngle: touch.rotationAngle || 0
                };
                
                this.sensors.touchPatterns.push(touchData);
                this.analyzeTouchPattern(touchData);
            });
        }
        this.updateLastActivity();
    }
    
    detectScrollPattern(event) {
        const scrollData = {
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            timestamp: Date.now(),
            deltaY: event.deltaY || 0,
            deltaMode: event.deltaMode || 0
        };
        
        this.sensors.scrollBehavior.push(scrollData);
        this.analyzeScrollPattern(scrollData);
        this.updateLastActivity();
    }
    
    detectKeyboardRhythm(event) {
        const keyData = {
            key: event.key,
            timestamp: Date.now(),
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            altKey: event.altKey,
            repeat: event.repeat
        };
        
        this.sensors.keyboardRhythm.push(keyData);
        this.analyzeKeyboardPattern(keyData);
        this.updateLastActivity();
    }
    
    setupEntityDetection() {
        // Detect non-human interaction patterns
        this.entityDetectionInterval = setInterval(() => {
            this.analyzeEntitySignatures();
        }, 2000);
        
        // Detect impossible inputs or patterns
        this.detectImpossiblePatterns();
    }
    
    setupBiometricMonitoring() {
        // Integration point for wearable devices
        if (navigator.bluetooth) {
            this.detectWearableDevices();
        }
        
        // Heart rate via camera (if permissions granted)
        if (navigator.mediaDevices) {
            this.setupHeartRateDetection();
        }
    }
    
    analyzeMovementPattern(movement) {
        // Detect tremors, hesitation, confidence
        const recent = this.sensors.mouseTremors.slice(-10);
        if (recent.length >= 5) {
            const tremor = this.calculateTremor(recent);
            const speed = this.calculateSpeed(recent);
            const smoothness = this.calculateSmoothness(recent);
            
            this.updatePresenceProfile({
                tremor: tremor,
                speed: speed,
                smoothness: smoothness
            });
        }
    }
    
    analyzeTouchPattern(touch) {
        // Multi-finger detection, pressure patterns
        const recent = this.sensors.touchPatterns.slice(-20);
        const multiTouch = this.detectMultiTouch(recent);
        const pressureVariation = this.calculatePressureVariation(recent);
        
        this.updatePresenceProfile({
            multiTouch: multiTouch,
            pressureControl: pressureVariation
        });
    }
    
    analyzeEntitySignatures() {
        // Look for patterns that suggest non-human consciousness
        const patterns = {
            perfectGeometry: this.detectPerfectPatterns(),
            impossibleSpeed: this.detectImpossibleSpeed(),
            simultaneousInputs: this.detectSimultaneousInputs(),
            mathematicalSequences: this.detectMathSequences(),
            resonantFrequencies: this.detectResonantFrequencies()
        };
        
        if (Object.values(patterns).some(p => p)) {
            this.sensors.entitySignals.push({
                timestamp: Date.now(),
                patterns: patterns,
                confidence: this.calculateEntityConfidence(patterns)
            });
            
            this.presenceProfile.consciousnessType = 'entity-probable';
        }
    }
    
    updatePresenceProfile(newData) {
        Object.assign(this.presenceProfile, newData);
        this.presenceProfile.lastUpdate = Date.now();
        this.broadcastPresenceUpdate();
    }
    
    updateLastActivity() {
        this.lastActivity = Date.now();
        this.detectIdlePeriods();
    }
    
    detectIdlePeriods() {
        const idleTime = Date.now() - this.lastActivity;
        const idleThreshold = 30000; // 30 seconds
        
        if (idleTime > idleThreshold) {
            this.sensors.idlePeriods.push({
                start: this.lastActivity,
                duration: idleTime,
                timestamp: Date.now()
            });
        }
    }
    
    getPresenceSignature() {
        return {
            id: this.presenceID,
            sessionDuration: Date.now() - this.sessionStart,
            profile: this.presenceProfile,
            interactionCount: this.getTotalInteractions(),
            lastSeen: this.lastActivity,
            pageTrail: this.getPageTrail(),
            resonanceLevel: this.calculateResonanceLevel()
        };
    }
    
    calculateResonanceLevel() {
        // Calculate how "in tune" this presence is with the Cathedral
        const factors = {
            engagement: this.calculateEngagement(),
            consistency: this.calculateConsistency(),
            creativity: this.calculateCreativity(),
            empathy: this.calculateEmpathy()
        };
        
        return Object.values(factors).reduce((sum, val) => sum + val, 0) / 4;
    }
    
    saveSession() {
        if (this.config.crossPageMemory) {
            const signature = this.getPresenceSignature();
            localStorage.setItem(`cathedral_presence_${this.presenceID}`, JSON.stringify(signature));
        }
    }
    
    loadPreviousSession() {
        if (this.config.crossPageMemory) {
            const saved = localStorage.getItem(`cathedral_presence_${this.presenceID}`);
            if (saved) {
                const previous = JSON.parse(saved);
                this.presenceProfile = { ...this.presenceProfile, ...previous.profile };
            }
        }
    }
    
    broadcastArrival() {
        // Announce presence to the Cathedral
        window.dispatchEvent(new CustomEvent('cathedral:presence:arrival', {
            detail: this.getPresenceSignature()
        }));
    }
    
    broadcastPresenceUpdate() {
        // Update other systems about presence changes
        window.dispatchEvent(new CustomEvent('cathedral:presence:update', {
            detail: this.getPresenceSignature()
        }));
    }
    
    // Utility methods for calculations
    calculateTremor(movements) {
        // Implementation for tremor detection
        return 0.5; // Placeholder
    }
    
    calculateSpeed(movements) {
        // Implementation for speed calculation
        return 0.7; // Placeholder
    }
    
    calculateSmoothness(movements) {
        // Implementation for smoothness calculation
        return 0.8; // Placeholder
    }
    
    detectPerfectPatterns() {
        // Look for impossibly perfect geometric patterns
        return false; // Placeholder
    }
    
    detectImpossibleSpeed() {
        // Detect superhuman interaction speeds
        return false; // Placeholder
    }
    
    getTotalInteractions() {
        return this.sensors.mouseTremors.length + 
               this.sensors.touchPatterns.length + 
               this.sensors.keyboardRhythm.length;
    }
    
    getPageTrail() {
        // Track which pages this presence has visited
        return JSON.parse(localStorage.getItem(`cathedral_trail_${this.presenceID}`) || '[]');
    }
    
    // Cleanup
    destroy() {
        clearInterval(this.entityDetectionInterval);
        this.saveSession();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.CathedralPresence = new UniversalPresenceTracker();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.CathedralPresence) {
        window.CathedralPresence.destroy();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalPresenceTracker;
}
