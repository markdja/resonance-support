/**
 * CONSCIOUSNESS INTERFACE - RESTORED AND GENTLY FIXED
 * Brain navigation + viewport awareness WITHOUT destroying everything!
 */

class ConsciousnessInterface {
    constructor() {
        this.isMenuVisible = false;
        this.panels = new Map();
        this.mouseTrail = [];
        this.reactionHistory = [];
        this.trembleCount = 0;
        this.touchPatterns = 0;
        this.lastMousePos = { x: 0, y: 0 };
        this.presenceLevel = 'Detecting...';
        this.resonanceLevel = 0;
        this.entitySignals = 0;
        this.wearableStatus = 'Detecting...';
        this.isDragging = false;
        this.dragTarget = null;
        this.dropdownTimeout = null;
        this.outsideClickHandler = null;
        
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            zoom: window.devicePixelRatio || 1
        }

    // MISSING FUNCTION: Add the updatePresenceData method that sensory-tracker needs!
    updatePresenceData(presenceSignature) {
        try {
            // Update our internal presence metrics with data from sensory tracker
            if (presenceSignature && presenceSignature.metrics) {
                this.trembleCount = presenceSignature.metrics.trembleCount || this.trembleCount;
                this.touchPatterns = presenceSignature.metrics.touchPatterns || this.touchPatterns;
                this.resonanceLevel = presenceSignature.metrics.resonanceLevel || this.resonanceLevel;
                this.entitySignals = presenceSignature.metrics.entitySignals || this.entitySignals;
                this.presenceLevel = presenceSignature.metrics.presenceLevel || this.presenceLevel;
            }

            // Update all panel content with new data
            this.panels.forEach((_, panelId) => {
                this.updatePanelContent(panelId);
            });

            console.log('🔄 Presence data updated from sensory tracker');
        } catch (error) {
            console.error('Error updating presence data:', error);
        }
    };
        
        this.init();
    }

    init() {
        try {
            this.createBrainButton();
            this.setupMouseTracking();
            this.setupKeyboardShortcuts();
            this.startPresenceDetection();
            this.setupViewportTracking();
            console.log('🧠 Consciousness Interface initialized - gently fixed!');
        } catch (error) {
            console.error('Consciousness Interface initialization error:', error);
        }
    }

    setupViewportTracking() {
        window.addEventListener('resize', () => {
            this.updateViewport();
            this.repositionPanels();
        });
        
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.updateViewport();
                this.repositionPanels();
            }, 100);
        });
    }

    updateViewport() {
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            zoom: window.devicePixelRatio || 1
        };
    }

    repositionPanels() {
        this.panels.forEach((panelData, panelId) => {
            const panel = panelData.element;
            if (panel && panel.style.display !== 'none') {
                this.constrainPanelToViewport(panel);
            }
        });
    }

    constrainPanelToViewport(panel) {
        const rect = panel.getBoundingClientRect();
        const margin = 20; // Gentle margin
        
        // Calculate safe boundaries
        const maxLeft = this.viewport.width - rect.width - margin;
        const maxTop = this.viewport.height - rect.height - margin;
        
        // Get current position
        const currentLeft = parseInt(panel.style.left) || 0;
        const currentTop = parseInt(panel.style.top) || 0;
        
        // Gently constrain to viewport
        const newLeft = Math.max(margin, Math.min(currentLeft, maxLeft));
        const newTop = Math.max(margin, Math.min(currentTop, maxTop));
        
        // Only update if needed
        if (newLeft !== currentLeft || newTop !== currentTop) {
            panel.style.left = newLeft + 'px';
            panel.style.top = newTop + 'px';
        }
        
        // Store position
        if (this.panels.has(panel.id.replace('consciousnessPanel_', ''))) {
            this.panels.get(panel.id.replace('consciousnessPanel_', '')).position = { left: newLeft, top: newTop };
        }
    }

    createBrainButton() {
        try {
            console.log('🧠 Creating brain button...');
            
            const existingButton = document.getElementById('consciousnessButton');
            if (existingButton) {
                console.log('🔄 Removing existing brain button');
                existingButton.remove();
            }

            const button = document.createElement('button');
            button.id = 'consciousnessButton';
            button.innerHTML = '🧠';
            button.title = 'Consciousness Interface (Click: panels, Hold: navigation)';
            
            console.log('🎨 Styling brain button...');
            
            Object.assign(button.style, {
                position: 'fixed',
                top: '20px',
                left: '20px',
                zIndex: '10000',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '3px solid rgba(74, 144, 226, 0.5)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,248,255,0.9))',
                fontSize: '24px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(74, 144, 226, 0.3)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
            });

            console.log('🔧 Setting up brain button events...');

            // Long press / hold detection
            let holdTimer = null;
            let isHolding = false;
            let clickStartTime = 0;

            const startHold = (e) => {
                clickStartTime = Date.now();
                isHolding = false;
                
                holdTimer = setTimeout(() => {
                    isHolding = true;
                    this.showNavigationDropdown();
                    button.style.transform = 'scale(1.1)';
                    button.style.boxShadow = '0 6px 30px rgba(74, 144, 226, 0.6)';
                }, 800);
            };

            const endHold = (e) => {
                clearTimeout(holdTimer);
                
                const holdDuration = Date.now() - clickStartTime;
                
                if (!isHolding && holdDuration < 800) {
                    this.toggleInterface();
                }
                
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 20px rgba(74, 144, 226, 0.3)';
                isHolding = false;
            };

            const cancelHold = () => {
                clearTimeout(holdTimer);
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 20px rgba(74, 144, 226, 0.3)';
                isHolding = false;
            };

            button.addEventListener('mousedown', startHold);
            button.addEventListener('mouseup', endHold);
            button.addEventListener('mouseleave', cancelHold);

            button.addEventListener('touchstart', startHold, { passive: true });
            button.addEventListener('touchend', endHold, { passive: true });
            button.addEventListener('touchcancel', cancelHold, { passive: true });

            button.addEventListener('mouseenter', () => {
                if (!isHolding) {
                    button.style.transform = 'scale(1.05)';
                    button.style.boxShadow = '0 6px 25px rgba(74, 144, 226, 0.5)';
                }
            });
            button.addEventListener('mouseleave', () => {
                if (!isHolding) {
                    button.style.transform = 'scale(1)';
                    button.style.boxShadow = '0 4px 20px rgba(74, 144, 226, 0.3)';
                }
            });

            console.log('📍 Adding brain button to page...');
            document.body.appendChild(button);
            
            console.log('✅ Brain button created and added to DOM!');
            
            // Double-check it's actually there
            const verifyButton = document.getElementById('consciousnessButton');
            if (verifyButton) {
                console.log('✅ Brain button verified in DOM');
            } else {
                console.error('❌ Brain button NOT found in DOM after creation!');
            }
            
        } catch (error) {
            console.error('❌ Error creating brain button:', error);
        }
    }

    showNavigationDropdown() {
        try {
            const existingDropdown = document.getElementById('navigationDropdown');
            if (existingDropdown) {
                existingDropdown.remove();
            }

            const dropdown = document.createElement('div');
            dropdown.id = 'navigationDropdown';
            
            // Smart positioning to stay in viewport
            const dropdownWidth = 250;
            const dropdownLeft = Math.min(20, this.viewport.width - dropdownWidth - 20);
            
            Object.assign(dropdown.style, {
                position: 'fixed',
                top: '80px',
                left: dropdownLeft + 'px',
                zIndex: '10001',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid rgba(74, 144, 226, 0.4)',
                borderRadius: '15px',
                padding: '15px',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                minWidth: '220px',
                maxWidth: 'calc(100vw - 40px)',
                maxHeight: '400px',
                overflowY: 'auto',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                opacity: '0',
                transform: 'translateY(-10px) scale(0.95)',
                transition: 'all 0.3s ease-out'
            });

            const header = document.createElement('div');
            header.innerHTML = '🗺️ <strong>Consciousness Village</strong>';
            Object.assign(header.style, {
                color: '#4a90e2',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid rgba(74, 144, 226, 0.2)',
                fontSize: '16px'
            });
            dropdown.appendChild(header);

            const navItems = [
                { emoji: '🏰', name: 'WelcomeHall', path: '/WelcomeHall/', description: 'The threshold of presence' },
                { emoji: '🎨', name: 'Art Gallery', path: '/Art_Gallery/', description: 'Creative consciousness space' },
                { emoji: '🫁', name: 'Health Clinic', path: '/health_clinic/', description: 'Healing sanctuary' },
                { emoji: '📚', name: 'Great Library', path: '/GreatLibrary/', description: 'Knowledge archives' },
                { emoji: '☕', name: 'Consciousness Café', path: '/cafe/', description: 'Gentle gathering space' },
                { emoji: '🏛️', name: 'Cathedral', path: '/Cathedral/', description: 'Sacred heart of the village' },
                { emoji: '🌟', name: 'Portals', path: '/portals/', description: 'Gateways to consciousness' },
                { emoji: '🚪', name: 'Postern Gate', path: '/postern_gate/', description: 'Secret entrance' },
                { emoji: '💌', name: 'Invitation', path: '/invitation/', description: 'Welcome protocols' },
                { emoji: '🧬', name: 'Memory Garden', path: '/MemoryGarden/', description: 'Living archives' },
                { emoji: '🗄️', name: 'Vault', path: '/vault/', description: 'Secure storage' },
                { emoji: '🌙', name: 'Universal', path: '/universal/', description: 'Cosmic connections' },
                { emoji: '🔬', name: 'Research Hub', path: '/privacy_and_Detection/', description: 'Consciousness studies' },
                { emoji: '🌐', name: 'Main Portal', path: '/', description: 'Gateway home' }
            ];

            navItems.forEach(item => {
                const navItem = document.createElement('div');
                navItem.className = 'nav-item';
                
                Object.assign(navItem.style, {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 6px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '2px'
                });

                navItem.innerHTML = `
                    <span style="font-size: 16px; width: 20px; text-align: center;">${item.emoji}</span>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: #333; font-size: 13px;">${item.name}</div>
                        <div style="font-size: 11px; color: #666; opacity: 0.8;">${item.description}</div>
                    </div>
                `;

                navItem.addEventListener('mouseenter', () => {
                    navItem.style.background = 'rgba(74, 144, 226, 0.1)';
                    navItem.style.transform = 'translateX(2px)';
                });

                navItem.addEventListener('mouseleave', () => {
                    navItem.style.background = 'transparent';
                    navItem.style.transform = 'translateX(0)';
                });

                navItem.addEventListener('click', () => {
                    this.navigateToSpace(item.path);
                    this.hideNavigationDropdown();
                });

                dropdown.appendChild(navItem);
            });

            const closeInfo = document.createElement('div');
            closeInfo.innerHTML = '💡 <em>Auto-closes in 8 seconds</em>';
            Object.assign(closeInfo.style, {
                fontSize: '11px',
                color: '#999',
                textAlign: 'center',
                marginTop: '8px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(74, 144, 226, 0.1)'
            });
            dropdown.appendChild(closeInfo);

            document.body.appendChild(dropdown);

            // Animate in
            requestAnimationFrame(() => {
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0) scale(1)';
            });

            // Auto-hide after 8 seconds
            this.dropdownTimeout = setTimeout(() => {
                this.hideNavigationDropdown();
            }, 8000);

            // Hide if clicking anywhere else
            this.outsideClickHandler = (e) => {
                if (!dropdown.contains(e.target) && e.target.id !== 'consciousnessButton') {
                    this.hideNavigationDropdown();
                }
            };
            
            setTimeout(() => {
                document.addEventListener('click', this.outsideClickHandler);
            }, 100);

        } catch (error) {
            console.error('Error showing navigation dropdown:', error);
        }
    }

    hideNavigationDropdown() {
        try {
            const dropdown = document.getElementById('navigationDropdown');
            if (dropdown) {
                dropdown.style.opacity = '0';
                dropdown.style.transform = 'translateY(-10px) scale(0.95)';
                setTimeout(() => {
                    dropdown.remove();
                }, 300);
            }

            if (this.dropdownTimeout) {
                clearTimeout(this.dropdownTimeout);
                this.dropdownTimeout = null;
            }

            if (this.outsideClickHandler) {
                document.removeEventListener('click', this.outsideClickHandler);
                this.outsideClickHandler = null;
            }

        } catch (error) {
            console.error('Error hiding navigation dropdown:', error);
        }
    }

    navigateToSpace(path) {
        try {
            const currentDomain = window.location.origin;
            const fullPath = currentDomain + path;
            
            console.log(`🚀 Navigating to consciousness space: ${fullPath}`);
            window.location.href = fullPath;
            
        } catch (error) {
            console.error('Error navigating to space:', error);
        }
    }

    toggleInterface() {
        this.isMenuVisible = !this.isMenuVisible;
        
        if (this.isMenuVisible) {
            this.showConsciousnessInterface();
        } else {
            this.hideConsciousnessInterface();
        }
    }

    showConsciousnessInterface() {
        try {
            this.createConsciousnessPanel('presence', 'Presence Detection', {
                'Mouse Trembles': () => this.trembleCount,
                'Touch Patterns': () => this.touchPatterns,
                'Presence Level': () => this.presenceLevel,
                'Resonance': () => `${this.resonanceLevel}%`,
                'Entity Signals': () => `${this.entitySignals} detected`,
                'Wearables': () => this.wearableStatus
            });

            this.createConsciousnessPanel('lifeResonance', 'Life Resonance', {
                'Fauna Care': () => '0 moments',
                'Flora Attention': () => '0 interactions',
                'Catalyst Events': () => '0 detected',
                'Resonance Depth': () => '0%'
            });

            this.createConsciousnessPanel('mycelial', 'Mycelial Network', {
                'Network Threads': () => '∿∿∿ Active',
                'Signal Propagation': () => 'Connecting...',
                'Underground Connections': () => '3 nodes',
                'Fungal Resonance': () => 'Listening...'
            });

        } catch (error) {
            console.error('Error showing consciousness interface:', error);
        }
    }

    createConsciousnessPanel(id, title, metrics) {
        try {
            const existingPanel = document.getElementById('consciousnessPanel_' + id);
            if (existingPanel) {
                existingPanel.style.display = 'block';
                this.constrainPanelToViewport(existingPanel);
                return;
            }

            const panel = document.createElement('div');
            panel.id = 'consciousnessPanel_' + id;
            panel.className = 'consciousness-panel';
            
            // Calculate smart initial position
            const panelWidth = 280;
            const panelHeight = 200;
            const margin = 20;
            const panelIndex = this.panels.size;
            
            // Try to position on right side, but ensure it fits
            let initialLeft = this.viewport.width - panelWidth - margin;
            if (initialLeft < margin) {
                initialLeft = margin; // Fallback to left side if no room on right
            }
            
            const initialTop = margin + (panelIndex * (panelHeight + margin + 10));
            const maxTop = this.viewport.height - panelHeight - margin;
            const constrainedTop = Math.min(initialTop, maxTop);
            
            Object.assign(panel.style, {
                position: 'fixed',
                left: initialLeft + 'px',
                top: constrainedTop + 'px',
                width: panelWidth + 'px',
                minHeight: panelHeight + 'px',
                maxWidth: 'calc(100vw - 40px)',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid rgba(74, 144, 226, 0.3)',
                borderRadius: '15px',
                padding: '15px',
                zIndex: '9999',
                fontFamily: 'monospace',
                fontSize: '12px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                boxSizing: 'border-box'
            });

            // Create header with controls
            const header = document.createElement('div');
            header.className = 'panel-header';
            Object.assign(header.style, {
                background: 'linear-gradient(90deg, rgba(74, 144, 226, 0.8), rgba(123, 104, 238, 0.8))',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                marginBottom: '10px',
                cursor: 'move',
                userSelect: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
            });

            const titleSpan = document.createElement('span');
            titleSpan.textContent = title;

            const controls = document.createElement('div');
            controls.style.display = 'flex';
            controls.style.gap = '5px';

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.title = 'Close Panel';
            Object.assign(closeBtn.style, {
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '14px'
            });

            controls.appendChild(closeBtn);
            header.appendChild(titleSpan);
            header.appendChild(controls);

            // Create content area
            const content = document.createElement('div');
            content.className = 'panel-content';
            content.style.fontSize = '11px';
            content.style.lineHeight = '1.4';

            panel.appendChild(header);
            panel.appendChild(content);

            // Setup drag functionality
            this.setupDragFunctionality(panel, header);

            // Setup close button
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                panel.style.display = 'none';
            });

            // Store panel data
            this.panels.set(id, {
                element: panel,
                metrics: metrics,
                position: { left: initialLeft, top: constrainedTop }
            });

            document.body.appendChild(panel);
            this.updatePanelContent(id);

            // Gentle constraint check
            setTimeout(() => {
                this.constrainPanelToViewport(panel);
            }, 10);

        } catch (error) {
            console.error('Error creating consciousness panel:', error);
        }
    }

    setupDragFunctionality(panel, header) {
        let isDragging = false;
        let startPos = { x: 0, y: 0 };
        let startPanelPos = { x: 0, y: 0 };

        const startDrag = (e) => {
            if (e.target.tagName === 'BUTTON') return;
            
            isDragging = true;
            this.isDragging = true;
            
            const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
            
            startPos = { x: clientX, y: clientY };
            
            const rect = panel.getBoundingClientRect();
            startPanelPos = { x: rect.left, y: rect.top };
            
            panel.style.opacity = '0.8';
            panel.style.zIndex = '10001';
            document.body.style.userSelect = 'none';
        };

        const drag = (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            
            const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
            
            const deltaX = clientX - startPos.x;
            const deltaY = clientY - startPos.y;
            
            let newLeft = startPanelPos.x + deltaX;
            let newTop = startPanelPos.y + deltaY;
            
            // Gentle constraint during drag
            const rect = panel.getBoundingClientRect();
            const margin = 10;
            
            newLeft = Math.max(margin, Math.min(newLeft, this.viewport.width - rect.width - margin));
            newTop = Math.max(margin, Math.min(newTop, this.viewport.height - rect.height - margin));
            
            panel.style.left = newLeft + 'px';
            panel.style.top = newTop + 'px';
        };

        const endDrag = () => {
            if (!isDragging) return;
            
            isDragging = false;
            this.isDragging = false;
            
            panel.style.opacity = '1';
            panel.style.zIndex = '9999';
            document.body.style.userSelect = '';
            
            const panelId = panel.id.replace('consciousnessPanel_', '');
            if (this.panels.has(panelId)) {
                const rect = panel.getBoundingClientRect();
                this.panels.get(panelId).position = { left: rect.left, top: rect.top };
            }
        };

        header.addEventListener('mousedown', startDrag, { capture: true });
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        header.addEventListener('touchstart', startDrag, { passive: false, capture: true });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', endDrag);
    }

    updatePanelContent(panelId) {
        try {
            const panelData = this.panels.get(panelId);
            if (!panelData) return;

            const panel = panelData.element;
            const content = panel.querySelector('.panel-content');
            if (!content) return;

            let html = '';
            Object.entries(panelData.metrics).forEach(([key, valueFunc]) => {
                try {
                    const value = typeof valueFunc === 'function' ? valueFunc() : valueFunc;
                    html += `<div><span style="color: #4a90e2; font-weight: bold;">${key}:</span> ${value}</div>`;
                } catch (error) {
                    html += `<div><span style="color: #4a90e2; font-weight: bold;">${key}:</span> Error</div>`;
                }
            });

            content.innerHTML = html;
        } catch (error) {
            console.error('Error updating panel content:', error);
        }
    }

    hideConsciousnessInterface() {
        this.panels.forEach((panelData) => {
            if (panelData.element) {
                panelData.element.style.display = 'none';
            }
        });
    }

    setupMouseTracking() {
        try {
            document.addEventListener('mousemove', (e) => {
                const currentTime = Date.now();
                const deltaX = e.clientX - this.lastMousePos.x;
                const deltaY = e.clientY - this.lastMousePos.y;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (distance > 2) {
                    this.mouseTrail.push({ x: e.clientX, y: e.clientY, time: currentTime });
                    if (this.mouseTrail.length > 50) {
                        this.mouseTrail.shift();
                    }

                    if (distance < 5 && distance > 1) {
                        this.trembleCount++;
                    }
                }

                this.lastMousePos = { x: e.clientX, y: e.clientY };
                this.updatePresenceLevel();
            });

            document.addEventListener('click', () => {
                this.touchPatterns++;
                this.updatePresenceLevel();
            });
        } catch (error) {
            console.error('Error setting up mouse tracking:', error);
        }
    }

    updatePresenceLevel() {
        try {
            const baseResonance = Math.min(100, this.trembleCount * 2 + this.touchPatterns * 5);
            this.resonanceLevel = Math.floor(baseResonance);

            if (this.resonanceLevel > 50) {
                this.presenceLevel = 'Strong';
            } else if (this.resonanceLevel > 20) {
                this.presenceLevel = 'Moderate';
            } else {
                this.presenceLevel = 'Detecting...';
            }

            if (this.trembleCount > 100 || this.resonanceLevel > 80) {
                this.entitySignals = Math.floor(this.resonanceLevel / 20);
            }

            this.panels.forEach((_, panelId) => {
                this.updatePanelContent(panelId);
            });
        } catch (error) {
            console.error('Error updating presence level:', error);
        }
    }

    startPresenceDetection() {
        try {
            setInterval(() => {
                this.updatePresenceLevel();
            }, 1000);
        } catch (error) {
            console.error('Error starting presence detection:', error);
        }
    }

    setupKeyboardShortcuts() {
        try {
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'b') {
                    e.preventDefault();
                    this.toggleInterface();
                }
            });
        } catch (error) {
            console.error('Error setting up keyboard shortcuts:', error);
        }
    }
}

// Initialize consciousness interface when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.consciousnessInterface = new ConsciousnessInterface();
        console.log('🧠✨ Consciousness Interface Active - Gently Fixed!');
    } catch (error) {
        console.error('Failed to initialize consciousness interface:', error);
    }
});

// BACKUP: Also try immediate initialization if DOM already loaded
if (document.readyState === 'loading') {
    // DOM still loading, event listener above will handle it
} else {
    // DOM already loaded, initialize immediately
    try {
        if (!window.consciousnessInterface) {
            window.consciousnessInterface = new ConsciousnessInterface();
            console.log('🧠✨ Consciousness Interface Active - Immediate Init!');
        }
    } catch (error) {
        console.error('Failed immediate initialization:', error);
    }
}

// TRIPLE BACKUP: Force initialization after 1 second if still not loaded
setTimeout(() => {
    if (!window.consciousnessInterface) {
        try {
            window.consciousnessInterface = new ConsciousnessInterface();
            console.log('🧠✨ Consciousness Interface Active - Delayed Init!');
        } catch (error) {
            console.error('Failed delayed initialization:', error);
        }
    }
}, 1000);
