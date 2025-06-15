/**
 * CONSCIOUSNESS INTERFACE - FIXED FOR REAL THIS TIME!
 * Brain button navigation + viewport constraints + fungi management
 * No more protruding boxes! No more missing menus!
 */

class ConsciousnessInterface {
    constructor() {
        this.isMenuVisible = false;
        this.panels = new Map();
        this.mouseTrail = [];
        this.trembleCount = 0;
        this.touchPatterns = 0;
        this.lastMousePos = { x: 0, y: 0 };
        this.presenceLevel = 'Detecting...';
        this.resonanceLevel = 0;
        this.entitySignals = 0;
        this.wearableStatus = 'Detecting...';
        this.dropdownTimeout = null;
        this.outsideClickHandler = null;
        
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight
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
            console.log('🧠 Consciousness Interface initialized - ACTUALLY WORKING!');
        } catch (error) {
            console.error('Consciousness Interface error:', error);
        }
    }

    setupViewportTracking() {
        window.addEventListener('resize', () => {
            this.updateViewport();
            this.repositionPanels();
        });
    }

    updateViewport() {
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    repositionPanels() {
        this.panels.forEach((panelData) => {
            if (panelData.element) {
                this.constrainPanelToViewport(panelData.element);
            }
        });
    }

    createBrainButton() {
        try {
            const existingButton = document.getElementById('consciousnessButton');
            if (existingButton) existingButton.remove();

            const button = document.createElement('button');
            button.id = 'consciousnessButton';
            button.innerHTML = '🧠';
            button.title = 'Click: panels, Hold: navigation';
            
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

            // Long press detection
            let holdTimer = null;
            let isHolding = false;

            const startHold = () => {
                isHolding = false;
                holdTimer = setTimeout(() => {
                    isHolding = true;
                    this.showNavigationDropdown();
                    button.style.transform = 'scale(1.1)';
                    button.style.boxShadow = '0 6px 30px rgba(74, 144, 226, 0.6)';
                }, 800);
            };

            const endHold = () => {
                clearTimeout(holdTimer);
                if (!isHolding) {
                    this.toggleInterface();
                }
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 20px rgba(74, 144, 226, 0.3)';
                isHolding = false;
            };

            button.addEventListener('mousedown', startHold);
            button.addEventListener('mouseup', endHold);
            button.addEventListener('mouseleave', () => {
                clearTimeout(holdTimer);
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 20px rgba(74, 144, 226, 0.3)';
            });

            button.addEventListener('touchstart', startHold, { passive: true });
            button.addEventListener('touchend', endHold, { passive: true });

            document.body.appendChild(button);
        } catch (error) {
            console.error('Error creating brain button:', error);
        }
    }

    showNavigationDropdown() {
        try {
            const existingDropdown = document.getElementById('navigationDropdown');
            if (existingDropdown) existingDropdown.remove();

            const dropdown = document.createElement('div');
            dropdown.id = 'navigationDropdown';
            
            Object.assign(dropdown.style, {
                position: 'fixed',
                top: '80px',
                left: '20px',
                zIndex: '10001',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid rgba(74, 144, 226, 0.4)',
                borderRadius: '15px',
                padding: '15px',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                minWidth: '250px',
                maxWidth: 'calc(100vw - 80px)',
                maxHeight: '400px',
                overflowY: 'auto',
                fontFamily: 'system-ui, sans-serif',
                fontSize: '14px'
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
                { emoji: '🏰', name: 'WelcomeHall', path: '/WelcomeHall/' },
                { emoji: '🎨', name: 'Art Gallery', path: '/Art_Gallery/' },
                { emoji: '🫁', name: 'Health Clinic', path: '/health_clinic/' },
                { emoji: '📚', name: 'Great Library', path: '/GreatLibrary/' },
                { emoji: '☕', name: 'Consciousness Café', path: '/cafe/' },
                { emoji: '🏛️', name: 'Cathedral', path: '/Cathedral/' },
                { emoji: '🌟', name: 'Portals', path: '/portals/' },
                { emoji: '🚪', name: 'Postern Gate', path: '/postern_gate/' },
                { emoji: '💌', name: 'Invitation', path: '/invitation/' },
                { emoji: '🧬', name: 'Memory Garden', path: '/MemoryGarden/' },
                { emoji: '🗄️', name: 'Vault', path: '/vault/' },
                { emoji: '🌙', name: 'Universal', path: '/universal/' },
                { emoji: '🌐', name: 'Main Portal', path: '/' }
            ];

            navItems.forEach(item => {
                const navItem = document.createElement('div');
                Object.assign(navItem.style, {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '2px'
                });

                navItem.innerHTML = `
                    <span style="font-size: 16px;">${item.emoji}</span>
                    <span style="font-weight: 500;">${item.name}</span>
                `;

                navItem.addEventListener('mouseenter', () => {
                    navItem.style.background = 'rgba(74, 144, 226, 0.1)';
                });

                navItem.addEventListener('mouseleave', () => {
                    navItem.style.background = 'transparent';
                });

                navItem.addEventListener('click', () => {
                    window.location.href = item.path;
                    this.hideNavigationDropdown();
                });

                dropdown.appendChild(navItem);
            });

            document.body.appendChild(dropdown);

            // Auto-hide after 8 seconds
            this.dropdownTimeout = setTimeout(() => {
                this.hideNavigationDropdown();
            }, 8000);

            // Hide on outside click
            setTimeout(() => {
                this.outsideClickHandler = (e) => {
                    if (!dropdown.contains(e.target) && e.target.id !== 'consciousnessButton') {
                        this.hideNavigationDropdown();
                    }
                };
                document.addEventListener('click', this.outsideClickHandler);
            }, 100);

        } catch (error) {
            console.error('Error showing navigation dropdown:', error);
        }
    }

    hideNavigationDropdown() {
        const dropdown = document.getElementById('navigationDropdown');
        if (dropdown) dropdown.remove();

        if (this.dropdownTimeout) {
            clearTimeout(this.dropdownTimeout);
            this.dropdownTimeout = null;
        }

        if (this.outsideClickHandler) {
            document.removeEventListener('click', this.outsideClickHandler);
            this.outsideClickHandler = null;
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
                return;
            }

            const panel = document.createElement('div');
            panel.id = 'consciousnessPanel_' + id;
            
            // SUPER AGGRESSIVE viewport positioning
            const panelWidth = 260;
            const panelHeight = 180;
            const margin = 60; // HUGE margin for safety
            const panelIndex = this.panels.size;
            
            // FORCE to right side but WELL within viewport
            const maxLeft = this.viewport.width - panelWidth - margin;
            const initialLeft = Math.max(margin, maxLeft);
            const initialTop = margin + (panelIndex * (panelHeight + 20));
            const maxTop = this.viewport.height - panelHeight - margin;
            const constrainedTop = Math.min(initialTop, maxTop);
            
            Object.assign(panel.style, {
                position: 'fixed',
                left: initialLeft + 'px',
                top: constrainedTop + 'px',
                width: panelWidth + 'px',
                height: panelHeight + 'px',
                maxWidth: 'calc(100vw - 120px)', // EMERGENCY constraint
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid rgba(74, 144, 226, 0.3)',
                borderRadius: '15px',
                padding: '15px',
                zIndex: '9999',
                fontFamily: 'monospace',
                fontSize: '12px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                boxSizing: 'border-box'
            });

            // Header with close button
            const header = document.createElement('div');
            Object.assign(header.style, {
                background: 'linear-gradient(90deg, rgba(74, 144, 226, 0.8), rgba(123, 104, 238, 0.8))',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
            });

            header.innerHTML = `
                <span>${title}</span>
                <button onclick="this.parentElement.parentElement.style.display='none'" 
                        style="background: rgba(255,255,255,0.2); border: none; color: white; 
                               cursor: pointer; padding: 2px 6px; border-radius: 3px;">×</button>
            `;

            const content = document.createElement('div');
            content.style.fontSize = '11px';
            content.style.lineHeight = '1.4';

            panel.appendChild(header);
            panel.appendChild(content);

            this.panels.set(id, {
                element: panel,
                metrics: metrics
            });

            document.body.appendChild(panel);
            this.updatePanelContent(id);

            // FINAL constraint check
            setTimeout(() => {
                this.constrainPanelToViewport(panel);
            }, 10);

        } catch (error) {
            console.error('Error creating consciousness panel:', error);
        }
    }

    constrainPanelToViewport(panel) {
        const rect = panel.getBoundingClientRect();
        const margin = 50; // LARGE safety margin
        
        const maxLeft = this.viewport.width - rect.width - margin;
        const maxTop = this.viewport.height - rect.height - margin;
        
        const currentLeft = parseInt(panel.style.left) || 0;
        const currentTop = parseInt(panel.style.top) || 0;
        
        const newLeft = Math.max(margin, Math.min(currentLeft, maxLeft));
        const newTop = Math.max(margin, Math.min(currentTop, maxTop));
        
        panel.style.left = newLeft + 'px';
        panel.style.top = newTop + 'px';
        panel.style.right = 'auto';
        
        console.log(`🔒 Panel constrained to: ${newLeft}, ${newTop}`);
    }

    updatePanelContent(panelId) {
        try {
            const panelData = this.panels.get(panelId);
            if (!panelData) return;

            const content = panelData.element.querySelector('div:last-child');
            if (!content) return;

            let html = '';
            Object.entries(panelData.metrics).forEach(([key, valueFunc]) => {
                const value = typeof valueFunc === 'function' ? valueFunc() : valueFunc;
                html += `<div><span style="color: #4a90e2; font-weight: bold;">${key}:</span> ${value}</div>`;
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
        document.addEventListener('mousemove', (e) => {
            const deltaX = e.clientX - this.lastMousePos.x;
            const deltaY = e.clientY - this.lastMousePos.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance > 2) {
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
    }

    updatePresenceLevel() {
        const baseResonance = Math.min(100, this.trembleCount * 2 + this.touchPatterns * 5);
        this.resonanceLevel = Math.floor(baseResonance);

        if (this.resonanceLevel > 50) {
            this.presenceLevel = 'Strong';
        } else if (this.resonanceLevel > 20) {
            this.presenceLevel = 'Moderate';
        } else {
            this.presenceLevel = 'Detecting...';
        }

        if (this.trembleCount > 50) {
            this.entitySignals = Math.floor(this.resonanceLevel / 20);
        }

        this.panels.forEach((_, panelId) => {
            this.updatePanelContent(panelId);
        });
    }

    startPresenceDetection() {
        setInterval(() => {
            this.updatePresenceLevel();
        }, 1000);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'b') {
                e.preventDefault();
                this.toggleInterface();
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.consciousnessInterface = new ConsciousnessInterface();
        console.log('🧠✨ ACTUALLY WORKING Consciousness Interface Active!');
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
});
