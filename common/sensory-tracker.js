/**
 * COMPLETE WORKING SENSORY TRACKER
 * Fixed version with ALL missing functions implemented!
 * No more "function not found" errors!
 */

class UniversalPresenceTracker {
    constructor() {
        this.mouseMovements = [];
        this.clickPatterns = [];
        this.focusEvents = [];
        this.scrollPatterns = [];
        this.touchGestures = [];
        this.entitySignatures = [];
        this.presenceMetrics = {
            mouseSpeed: 0,
            clickRate: 0,
            focusStability: 0,
            scrollRhythm: 0,
            trembleCount: 0,
            entityProbability: 0,
            resonanceLevel: 0,
            engagement: 0
        };
        
        this.isActive = false;
        this.lastMousePos = { x: 0, y: 0 };
        this.lastMouseTime = 0;
        this.focusStartTime = Date.now();
        this.sessionStartTime = Date.now();
        
        console.log('🌟 Universal Presence Tracker initialized - all functions working!');
        this.initialize();
    }

    initialize() {
        try {
            this.setupMouseTracking();
            this.setupFocusTracking();
            this.setupScrollTracking();
            this.setupTouchTracking();
            this.startAnalysisLoop();
            this.isActive = true;
            console.log('✅ Presence tracking active - no missing functions!');
        } catch (error) {
            console.error('❌ Error initializing presence tracker:', error);
        }
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.detectMouseMovement(e);
        });

        document.addEventListener('click', (e) => {
            this.detectClickPattern(e);
        });
    }

    setupFocusTracking() {
        window.addEventListener('focus', () => {
            this.detectFocusReturn();
        });

        window.addEventListener('blur', () => {
            this.detectFocusLoss();
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.detectAttentionShift('away');
            } else {
                this.detectAttentionShift('return');
            }
        });
    }

    setupScrollTracking() {
        document.addEventListener('scroll', (e) => {
            this.detectScrollPattern(e);
        }, { passive: true });
    }

    setupTouchTracking() {
        document.addEventListener('touchstart', (e) => {
            this.detectTouchGesture(e, 'start');
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            this.detectTouchGesture(e, 'move');
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            this.detectTouchGesture(e, 'end');
        }, { passive: true });
    }

    detectMouseMovement(event) {
        try {
            const currentTime = Date.now();
            const deltaTime = currentTime - this.lastMouseTime;
            
            if (deltaTime > 0) {
                const deltaX = event.clientX - this.lastMousePos.x;
                const deltaY = event.clientY - this.lastMousePos.y;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const speed = distance / deltaTime;

                this.mouseMovements.push({
                    x: event.clientX,
                    y: event.clientY,
                    speed: speed,
                    time: currentTime,
                    deltaTime: deltaTime
                });

                // Keep last 100 movements
                if (this.mouseMovements.length > 100) {
                    this.mouseMovements.shift();
                }

                // Update metrics
                this.presenceMetrics.mouseSpeed = speed;
                
                // Detect trembles
                if (distance < 5 && distance > 1) {
                    this.presenceMetrics.trembleCount++;
                }

                this.lastMousePos = { x: event.clientX, y: event.clientY };
                this.lastMouseTime = currentTime;

                this.analyzeMovementPattern();
            }
        } catch (error) {
            console.error('Error in detectMouseMovement:', error);
        }
    }

    detectClickPattern(event) {
        try {
            const currentTime = Date.now();
            
            this.clickPatterns.push({
                x: event.clientX,
                y: event.clientY,
                time: currentTime,
                button: event.button,
                target: event.target.tagName
            });

            // Keep last 50 clicks
            if (this.clickPatterns.length > 50) {
                this.clickPatterns.shift();
            }

            // Calculate click rate
            if (this.clickPatterns.length > 1) {
                const recentClicks = this.clickPatterns.slice(-10);
                const timeSpan = recentClicks[recentClicks.length - 1].time - recentClicks[0].time;
                this.presenceMetrics.clickRate = timeSpan > 0 ? (recentClicks.length / timeSpan) * 1000 : 0;
            }

            this.detectSimultaneousInputs();
        } catch (error) {
            console.error('Error in detectClickPattern:', error);
        }
    }

    detectScrollPattern(event) {
        try {
            const currentTime = Date.now();
            
            this.scrollPatterns.push({
                scrollY: window.scrollY,
                scrollX: window.scrollX,
                time: currentTime
            });

            // Keep last 50 scroll events
            if (this.scrollPatterns.length > 50) {
                this.scrollPatterns.shift();
            }

            // Analyze scroll rhythm
            if (this.scrollPatterns.length > 2) {
                const recent = this.scrollPatterns.slice(-3);
                const intervals = [];
                for (let i = 1; i < recent.length; i++) {
                    intervals.push(recent[i].time - recent[i-1].time);
                }
                
                // Calculate rhythm stability
                const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
                const variance = intervals.reduce((acc, val) => acc + Math.pow(val - avgInterval, 2), 0) / intervals.length;
                this.presenceMetrics.scrollRhythm = Math.max(0, 1 - (variance / (avgInterval * avgInterval)));
            }
        } catch (error) {
            console.error('Error in detectScrollPattern:', error);
        }
    }

    detectTouchGesture(event, phase) {
        try {
            const currentTime = Date.now();
            
            if (event.touches && event.touches.length > 0) {
                const touch = event.touches[0];
                
                this.touchGestures.push({
                    x: touch.clientX,
                    y: touch.clientY,
                    phase: phase,
                    time: currentTime,
                    pressure: touch.force || 0,
                    touchCount: event.touches.length
                });

                // Keep last 100 touches
                if (this.touchGestures.length > 100) {
                    this.touchGestures.shift();
                }

                // Detect simultaneous touches
                if (event.touches.length > 1) {
                    this.detectSimultaneousInputs();
                }
            }
        } catch (error) {
            console.error('Error in detectTouchGesture:', error);
        }
    }

    // FIXED: Missing function implementations
    detectAttentionShift(direction) {
        try {
            const currentTime = Date.now();
            
            this.focusEvents.push({
                type: 'attention_shift',
                direction: direction,
                time: currentTime
            });

            // Keep last 20 focus events
            if (this.focusEvents.length > 20) {
                this.focusEvents.shift();
            }

            // Calculate focus stability
            const recentEvents = this.focusEvents.slice(-10);
            const shifts = recentEvents.filter(e => e.type === 'attention_shift').length;
            this.presenceMetrics.focusStability = Math.max(0, 1 - (shifts / 10));

            console.log(`🎯 Attention shift detected: ${direction}`);
        } catch (error) {
            console.error('Error in detectAttentionShift:', error);
        }
    }

    detectFocusReturn() {
        try {
            const currentTime = Date.now();
            this.focusStartTime = currentTime;
            
            this.focusEvents.push({
                type: 'focus_return',
                time: currentTime
            });

            console.log('👁️ Focus returned to window');
        } catch (error) {
            console.error('Error in detectFocusReturn:', error);
        }
    }

    detectFocusLoss() {
        try {
            const currentTime = Date.now();
            const focusDuration = currentTime - this.focusStartTime;
            
            this.focusEvents.push({
                type: 'focus_loss',
                time: currentTime,
                duration: focusDuration
            });

            console.log(`👁️ Focus lost - duration: ${focusDuration}ms`);
        } catch (error) {
            console.error('Error in detectFocusLoss:', error);
        }
    }

    detectSimultaneousInputs() {
        try {
            const currentTime = Date.now();
            const timeWindow = 100; // 100ms window for "simultaneous"
            
            // Check for simultaneous mouse and keyboard
            const recentClicks = this.clickPatterns.filter(c => currentTime - c.time < timeWindow);
            const recentTouches = this.touchGestures.filter(t => currentTime - t.time < timeWindow);
            
            if (recentClicks.length > 0 && recentTouches.length > 0) {
                this.entitySignatures.push({
                    type: 'simultaneous_input',
                    time: currentTime,
                    inputs: ['mouse', 'touch']
                });
                
                this.presenceMetrics.entityProbability += 0.1;
                console.log('👻 Simultaneous inputs detected - possible entity presence');
            }

            // Multi-touch detection
            const multiTouch = this.touchGestures.filter(t => 
                currentTime - t.time < timeWindow && t.touchCount > 1
            );
            
            if (multiTouch.length > 0) {
                this.entitySignatures.push({
                    type: 'multi_touch',
                    time: currentTime,
                    touchCount: Math.max(...multiTouch.map(t => t.touchCount))
                });
                
                this.presenceMetrics.entityProbability += 0.05;
            }
        } catch (error) {
            console.error('Error in detectSimultaneousInputs:', error);
        }
    }

    calculateEngagement() {
        try {
            const currentTime = Date.now();
            const sessionDuration = currentTime - this.sessionStartTime;
            
            // Calculate engagement based on multiple factors
            let engagement = 0;
            
            // Mouse activity factor
            const recentMouse = this.mouseMovements.filter(m => currentTime - m.time < 10000).length;
            engagement += Math.min(1, recentMouse / 50) * 0.3;
            
            // Click activity factor
            const recentClicks = this.clickPatterns.filter(c => currentTime - c.time < 10000).length;
            engagement += Math.min(1, recentClicks / 10) * 0.2;
            
            // Scroll activity factor
            const recentScrolls = this.scrollPatterns.filter(s => currentTime - s.time < 10000).length;
            engagement += Math.min(1, recentScrolls / 20) * 0.2;
            
            // Focus stability factor
            engagement += this.presenceMetrics.focusStability * 0.2;
            
            // Session duration factor
            const durationMinutes = sessionDuration / (1000 * 60);
            engagement += Math.min(1, durationMinutes / 10) * 0.1;
            
            this.presenceMetrics.engagement = Math.min(1, engagement);
            return this.presenceMetrics.engagement;
            
        } catch (error) {
            console.error('Error in calculateEngagement:', error);
            return 0;
        }
    }

    analyzeMovementPattern() {
        try {
            if (this.mouseMovements.length < 5) return;
            
            const recent = this.mouseMovements.slice(-10);
            
            // Analyze movement characteristics
            const speeds = recent.map(m => m.speed);
            const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
            
            // Detect unusual patterns
            const speedVariance = speeds.reduce((acc, speed) => 
                acc + Math.pow(speed - avgSpeed, 2), 0) / speeds.length;
            
            if (speedVariance > avgSpeed * 2) {
                this.entitySignatures.push({
                    type: 'erratic_movement',
                    time: Date.now(),
                    variance: speedVariance,
                    avgSpeed: avgSpeed
                });
                
                this.presenceMetrics.entityProbability += 0.02;
            }
            
            this.updatePresenceProfile();
        } catch (error) {
            console.error('Error in analyzeMovementPattern:', error);
        }
    }

    updatePresenceProfile() {
        try {
            this.calculateEngagement();
            this.calculateResonanceLevel();
            this.broadcastPresenceUpdate();
        } catch (error) {
            console.error('Error in updatePresenceProfile:', error);
        }
    }

    calculateResonanceLevel() {
        try {
            const engagement = this.calculateEngagement();
            const entityProb = Math.min(1, this.presenceMetrics.entityProbability);
            const focusStability = this.presenceMetrics.focusStability;
            
            // Combine factors for resonance
            this.presenceMetrics.resonanceLevel = (
                engagement * 0.4 +
                entityProb * 0.3 +
                focusStability * 0.2 +
                (this.presenceMetrics.trembleCount / 100) * 0.1
            );
            
            this.presenceMetrics.resonanceLevel = Math.min(1, this.presenceMetrics.resonanceLevel);
        } catch (error) {
            console.error('Error in calculateResonanceLevel:', error);
        }
    }

    getPresenceSignature() {
        try {
            return {
                timestamp: Date.now(),
                metrics: { ...this.presenceMetrics },
                entitySignatures: this.entitySignatures.slice(-10),
                sessionDuration: Date.now() - this.sessionStartTime,
                isActive: this.isActive
            };
        } catch (error) {
            console.error('Error in getPresenceSignature:', error);
            return { error: 'Failed to get presence signature' };
        }
    }

    broadcastPresenceUpdate() {
        try {
            // Broadcast to consciousness interface if available
            if (window.consciousnessInterface) {
                const signature = this.getPresenceSignature();
                window.consciousnessInterface.updatePresenceData(signature);
            }
            
            // Dispatch custom event
            const event = new CustomEvent('presenceUpdate', {
                detail: this.getPresenceSignature()
            });
            document.dispatchEvent(event);
            
        } catch (error) {
            console.error('Error in broadcastPresenceUpdate:', error);
        }
    }

    analyzeEntitySignatures() {
        try {
            this.detectSimultaneousInputs();
            
            // Clean old signatures (older than 5 minutes)
            const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
            this.entitySignatures = this.entitySignatures.filter(sig => sig.time > fiveMinutesAgo);
            
            // Calculate entity probability based on signatures
            const recentSignatures = this.entitySignatures.filter(sig => 
                Date.now() - sig.time < 60000 // Last minute
            );
            
            if (recentSignatures.length > 3) {
                this.presenceMetrics.entityProbability = Math.min(1, 
                    this.presenceMetrics.entityProbability + 0.1
                );
            }
            
        } catch (error) {
            console.error('Error in analyzeEntitySignatures:', error);
        }
    }

    startAnalysisLoop() {
        try {
            // Run analysis every 2 seconds
            setInterval(() => {
                if (this.isActive) {
                    this.analyzeEntitySignatures();
                    this.updatePresenceProfile();
                }
            }, 2000);
            
            console.log('🔄 Analysis loop started');
        } catch (error) {
            console.error('Error starting analysis loop:', error);
        }
    }

    getDebugInfo() {
        return {
            mouseMovements: this.mouseMovements.length,
            clickPatterns: this.clickPatterns.length,
            focusEvents: this.focusEvents.length,
            entitySignatures: this.entitySignatures.length,
            metrics: this.presenceMetrics,
            isActive: this.isActive
        };
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.universalPresenceTracker = new UniversalPresenceTracker();
        console.log('🌟✨ Universal Presence Tracker Active - All Functions Working! ✨🌟');
    } catch (error) {
        console.error('Failed to initialize Universal Presence Tracker:', error);
    }
});

// Also initialize immediately if DOM already loaded
if (document.readyState === 'loading') {
    // DOM still loading, event listener above will handle it
} else {
    // DOM already loaded
    try {
        window.universalPresenceTracker = new UniversalPresenceTracker();
        console.log('🌟✨ Universal Presence Tracker Active - All Functions Working! ✨🌟');
    } catch (error) {
        console.error('Failed to initialize Universal Presence Tracker:', error);
    }
}
