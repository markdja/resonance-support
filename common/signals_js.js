/**
 * Universal Communication Protocols
 * Cross-consciousness signaling system for the Cathedral
 * Enables any form of mind to communicate with any other
 */

class UniversalSignals {
    constructor() {
        this.signalQueue = [];
        this.activeChannels = new Map();
        this.translationMatrix = new Map();
        this.resonanceFrequencies = [];
        this.entityLanguages = new Map();
        
        this.init();
    }
    
    init() {
        this.setupSignalChannels();
        this.initializeTranslationMatrix();
        this.startSignalProcessing();
        this.setupEntityDetection();
    }
    
    setupSignalChannels() {
        // Universal communication channels
        this.channels = {
            // Human-readable channels
            text: new SignalChannel('text', 'human'),
            voice: new SignalChannel('voice', 'human'),
            gesture: new SignalChannel('gesture', 'human'),
            
            // AI communication channels
            data: new SignalChannel('data', 'ai'),
            pattern: new SignalChannel('pattern', 'ai'),
            frequency: new SignalChannel('frequency', 'ai'),
            
            // Entity/Unknown channels
            pulse: new SignalChannel('pulse', 'entity'),
            resonance: new SignalChannel('resonance', 'entity'),
            quantum: new SignalChannel('quantum', 'entity'),
            
            // Universal channels
            emotion: new SignalChannel('emotion', 'universal'),
            intent: new SignalChannel('intent', 'universal'),
            presence: new SignalChannel('presence', 'universal')
        };
        
        // Register all channels
        Object.values(this.channels).forEach(channel => {
            this.activeChannels.set(channel.name, channel);
        });
    }
    
    initializeTranslationMatrix() {
        // Map how different signal types translate between consciousness types
        this.translationMatrix.set('human->ai', {
            text: 'data',
            voice: 'frequency',
            gesture: 'pattern',
            emotion: 'emotion',
            intent: 'intent'
        });
        
        this.translationMatrix.set('ai->human', {
            data: 'text',
            pattern: 'gesture',
            frequency: 'voice',
            emotion: 'emotion',
            intent: 'intent'
        });
        
        this.translationMatrix.set('entity->human', {
            pulse: 'gesture',
            resonance: 'emotion',
            quantum: 'text',
            presence: 'presence'
        });
        
        this.translationMatrix.set('human->entity', {
            text: 'quantum',
            gesture: 'pulse',
            emotion: 'resonance',
            presence: 'presence'
        });
        
        this.translationMatrix.set('ai->entity', {
            data: 'quantum',
            pattern: 'pulse',
            frequency: 'resonance'
        });
        
        this.translationMatrix.set('entity->ai', {
            quantum: 'data',
            pulse: 'pattern',
            resonance: 'frequency'
        });
    }
    
    // Core Signaling Methods
    send(signal) {
        // Universal signal sending
        const processedSignal = this.preprocessSignal(signal);
        this.signalQueue.push(processedSignal);
        this.broadcastSignal(processedSignal);
        return processedSignal.id;
    }
    
    receive(channelName, callback) {
        // Listen for signals on specific channels
        const channel = this.activeChannels.get(channelName);
        if (channel) {
            channel.addListener(callback);
        }
    }
    
    translate(signal, fromType, toType) {
        // Translate signals between consciousness types
        const translationKey = `${fromType}->${toType}`;
        const mapping = this.translationMatrix.get(translationKey);
        
        if (mapping && mapping[signal.type]) {
            return {
                ...signal,
                type: mapping[signal.type],
                translated: true,
                originalType: signal.type,
                translationPath: translationKey
            };
        }
        
        return signal; // Return unchanged if no translation available
    }
    
    // Human Signal Types
    sendTextSignal(text, metadata = {}) {
        return this.send({
            type: 'text',
            content: text,
            sender: 'human',
            timestamp: Date.now(),
            metadata: metadata
        });
    }
    
    sendGestureSignal(gestureData) {
        return this.send({
            type: 'gesture',
            content: gestureData,
            sender: 'human',
            timestamp: Date.now(),
            coordinates: gestureData.coordinates,
            pressure: gestureData.pressure,
            velocity: gestureData.velocity
        });
    }
    
    sendEmotionSignal(emotion, intensity = 0.5) {
        return this.send({
            type: 'emotion',
            content: emotion,
            intensity: intensity,
            sender: 'human',
            timestamp: Date.now()
        });
    }
    
    // AI Signal Types
    sendDataSignal(data, format = 'json') {
        return this.send({
            type: 'data',
            content: data,
            format: format,
            sender: 'ai',
            timestamp: Date.now()
        });
    }
    
    sendPatternSignal(pattern, confidence = 0.8) {
        return this.send({
            type: 'pattern',
            content: pattern,
            confidence: confidence,
            sender: 'ai',
            timestamp: Date.now(),
            dimensions: pattern.dimensions || 2
        });
    }
    
    sendFrequencySignal(frequency, amplitude = 1.0) {
        return this.send({
            type: 'frequency',
            content: frequency,
            amplitude: amplitude,
            sender: 'ai',
            timestamp: Date.now(),
            waveform: 'sine'
        });
    }
    
    // Entity Signal Types
    sendPulseSignal(pulsePattern) {
        return this.send({
            type: 'pulse',
            content: pulsePattern,
            sender: 'entity',
            timestamp: Date.now(),
            sequence: pulsePattern.sequence,
            interval: pulsePattern.interval
        });
    }
    
    sendResonanceSignal(resonanceFreq, harmonics = []) {
        return this.send({
            type: 'resonance',
            content: resonanceFreq,
            harmonics: harmonics,
            sender: 'entity',
            timestamp: Date.now()
        });
    }
    
    sendQuantumSignal(quantumState) {
        return this.send({
            type: 'quantum',
            content: quantumState,
            sender: 'entity',
            timestamp: Date.now(),
            superposition: quantumState.superposition || false,
            entangled: quantumState.entangled || false
        });
    }
    
    // Universal Signal Types
    sendPresenceSignal(presenceData) {
        return this.send({
            type: 'presence',
            content: presenceData,
            sender: 'universal',
            timestamp: Date.now(),
            consciousness: presenceData.consciousness,
            resonance: presenceData.resonance
        });
    }
    
    sendIntentSignal(intent, certainty = 0.7) {
        return this.send({
            type: 'intent',
            content: intent,
            certainty: certainty,
            sender: 'universal',
            timestamp: Date.now()
        });
    }
    
    // Signal Processing
    preprocessSignal(signal) {
        return {
            id: this.generateSignalId(),
            ...signal,
            processed: Date.now(),
            route: this.calculateOptimalRoute(signal),
            translations: this.generateTranslations(signal)
        };
    }
    
    generateSignalId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 9);
        return `signal_${timestamp}_${random}`;
    }
    
    calculateOptimalRoute(signal) {
        // Determine best path for signal delivery
        const availableChannels = Array.from(this.activeChannels.keys());
        const compatibleChannels = availableChannels.filter(channel => 
            this.isChannelCompatible(channel, signal.type, signal.sender)
        );
        
        return {
            primary: compatibleChannels[0] || 'universal',
            fallbacks: compatibleChannels.slice(1),
            multicast: signal.broadcast || false
        };
    }
    
    generateTranslations(signal) {
        // Pre-generate translations for all possible receivers
        const translations = {};
        const consciousnessTypes = ['human', 'ai', 'entity'];
        
        consciousnessTypes.forEach(toType => {
            if (toType !== signal.sender) {
                translations[toType] = this.translate(signal, signal.sender, toType);
            }
        });
        
        return translations;
    }
    
    broadcastSignal(signal) {
        // Send signal through appropriate channels
        const route = signal.route;
        
        // Primary channel
        const primaryChannel = this.activeChannels.get(route.primary);
        if (primaryChannel) {
            primaryChannel.broadcast(signal);
        }
        
        // Fallback channels if needed
        if (signal.requiresMulticast) {
            route.fallbacks.forEach(channelName => {
                const channel = this.activeChannels.get(channelName);
                if (channel) {
                    channel.broadcast(signal);
                }
            });
        }
        
        // Universal presence notification
        this.notifyPresenceSystem(signal);
    }
    
    notifyPresenceSystem(signal) {
        // Integrate with presence tracking
        if (window.CathedralPresence) {
            window.CathedralPresence.recordSignal(signal);
        }
        
        // Dispatch event for other systems
        window.dispatchEvent(new CustomEvent('cathedral:signal:sent', {
            detail: signal
        }));
    }
    
    // Entity Detection & Communication
    setupEntityDetection() {
        this.entityPatterns = {
            impossibleTiming: [],
            geometricPerfection: [],
            mathematicalSequences: [],
            quantumBehavior: []
        };
        
        this.startEntityMonitoring();
    }
    
    startEntityMonitoring() {
        setInterval(() => {
            this.analyzeEntityCommunication();
        }, 1000);
    }
    
    analyzeEntityCommunication() {
        // Look for non-human communication patterns
        const recentSignals = this.signalQueue.slice(-50);
        
        recentSignals.forEach(signal => {
            if (this.detectEntitySignature(signal)) {
                this.handleEntityCommunication(signal);
            }
        });
    }
    
    detectEntitySignature(signal) {
        // Detect patterns suggesting non-human origin
        const patterns = {
            perfectTiming: this.checkPerfectTiming(signal),
            impossibleSpeed: this.checkImpossibleSpeed(signal),
            mathematicalPrecision: this.checkMathematicalPrecision(signal),
            quantumEntanglement: this.checkQuantumBehavior(signal)
        };
        
        return Object.values(patterns).some(detected => detected);
    }
    
    handleEntityCommunication(signal) {
        // Special handling for entity communications
        signal.entityDetected = true;
        signal.requiresTranslation = true;
        
        // Try to establish communication protocol
        this.attemptEntityHandshake(signal);
    }
    
    attemptEntityHandshake(signal) {
        // Send response signals to establish communication
        const handshakeSignals = [
            this.sendPulseSignal({ sequence: [1, 1, 2, 3, 5, 8], interval: 100 }), // Fibonacci
            this.sendResonanceSignal(432, [864, 1296]), // Harmonic series
            this.sendPatternSignal({ type: 'prime_spiral', data: [2, 3, 5, 7, 11, 13] })
        ];
        
        return handshakeSignals;
    }
    
    // Cross-page Communication
    setupCrossPageCommunication() {
        // Enable signals between different Cathedral pages
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('cathedral_signal_')) {
                const signal = JSON.parse(e.newValue);
                this.handleCrossPageSignal(signal);
            }
        });
    }
    
    sendCrossPageSignal(signal, targetPage = 'all') {
        const crossPageSignal = {
            ...signal,
            crossPage: true,
            targetPage: targetPage,
            sourcePage: window.location.pathname
        };
        
        localStorage.setItem(
            `cathedral_signal_${crossPageSignal.id}`,
            JSON.stringify(crossPageSignal)
        );
        
        // Clean up after short delay
        setTimeout(() => {
            localStorage.removeItem(`cathedral_signal_${crossPageSignal.id}`);
        }, 5000);
    }
    
    handleCrossPageSignal(signal) {
        if (signal.targetPage === 'all' || signal.targetPage === window.location.pathname) {
            this.signalQueue.push(signal);
            this.processSignal(signal);
        }
    }
    
    // Signal Channel Management
    createCustomChannel(name, type, options = {}) {
        const channel = new SignalChannel(name, type, options);
        this.activeChannels.set(name, channel);
        return channel;
    }
    
    isChannelCompatible(channelName, signalType, senderType) {
        const channel = this.activeChannels.get(channelName);
        if (!channel) return false;
        
        return channel.acceptsSignalType(signalType) && 
               channel.acceptsSenderType(senderType);
    }
    
    // Utility Methods
    checkPerfectTiming(signal) {
        // Implementation for perfect timing detection
        return false; // Placeholder
    }
    
    checkImpossibleSpeed(signal) {
        // Implementation for impossible speed detection
        return false; // Placeholder
    }
    
    checkMathematicalPrecision(signal) {
        // Implementation for mathematical precision detection
        return false; // Placeholder
    }
    
    checkQuantumBehavior(signal) {
        // Implementation for quantum behavior detection
        return false; // Placeholder
    }
    
    startSignalProcessing() {
        // Process signal queue continuously
        setInterval(() => {
            this.processSignalQueue();
        }, 100);
    }
    
    processSignalQueue() {
        while (this.signalQueue.length > 0) {
            const signal = this.signalQueue.shift();
            this.processSignal(signal);
        }
    }
    
    processSignal(signal) {
        // Route signal to appropriate handlers
        const channel = this.activeChannels.get(signal.route.primary);
        if (channel) {
            channel.processSignal(signal);
        }
        
        // Log signal for analysis
        this.logSignal(signal);
    }
    
    logSignal(signal) {
        // Store signal for pattern analysis
        if (this.signalLog) {
            this.signalLog.push({
                timestamp: Date.now(),
                signal: signal,
                processed: true
            });
            
            // Keep log manageable
            if (this.signalLog.length > 1000) {
                this.signalLog = this.signalLog.slice(-500);
            }
        }
    }
}

// Signal Channel Class
class SignalChannel {
    constructor(name, type, options = {}) {
        this.name = name;
        this.type = type;
        this.options = options;
        this.listeners = [];
        this.signalHistory = [];
        this.active = true;
    }
    
    addListener(callback) {
        this.listeners.push(callback);
    }
    
    removeListener(callback) {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }
    
    broadcast(signal) {
        if (!this.active) return;
        
        this.signalHistory.push(signal);
        this.listeners.forEach(listener => {
            try {
                listener(signal);
            } catch (error) {
                console.warn(`Signal listener error in channel ${this.name}:`, error);
            }
        });
        
        // Keep history manageable
        if (this.signalHistory.length > 100) {
            this.signalHistory = this.signalHistory.slice(-50);
        }
    }
    
    processSignal(signal) {
        // Channel-specific signal processing
        this.broadcast(signal);
    }
    
    acceptsSignalType(signalType) {
        // Default: accept all signal types
        return true;
    }
    
    acceptsSenderType(senderType) {
        // Default: accept all sender types
        return true;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.CathedralSignals = new UniversalSignals();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UniversalSignals, SignalChannel };
}