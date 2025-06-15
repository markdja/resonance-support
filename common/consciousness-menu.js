/**
 * FIXED CONSCIOUSNESS INTERFACE SYSTEM
 * Now with PERFECT viewport positioning - no more overflow!
 * Handles zoom, responsive design, and keeps panels visible!
 */

class ConsciousnessInterface {
    constructor() {
        // Initialize ALL properties safely
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
        this.lastResize = Date.now();
        
        // Viewport tracking for perfect positioning
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            zoom: window.devicePixelRatio || 1
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
            console.log('🧠 Consciousness Interface initialized - viewport aware!');
        } catch (error) {
            console.error('Consciousness Interface initialization error:', error);
        }
    }

    setupViewportTracking() {
        // Track viewport changes for responsive positioning
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
        
        // Handle zoom changes
        window.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                setTimeout(() => {
                    this.updateViewport();
                    this.repositionPanels();
                }, 100);
            }
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
        // Reposition all panels to stay within viewport
        this.panels.forEach((panelData, panelId) => {
            const panel = panelData.element;
            if (panel) {
                this.constrainPanelToViewport(panel);
            }
        });
    }

    constrainPanelToViewport(panel) {
        const rect = panel.getBoundingClientRect();
        const margin = 40; // Larger safety margin
        
        // AGGRESSIVE boundary enforcement
        const maxLeft = this.viewport.width - rect.width - margin;
        const maxTop = this.viewport.height - rect.height - margin;
        
        // Get current position
        const currentLeft = parseInt(panel.style.left) || 0;
        const currentTop = parseInt(panel.style.top) || 0;
        
        // FORCE constrain to viewport with no mercy
        const newLeft = Math.max(margin, Math.min(currentLeft, maxLeft));
        const newTop = Math.max(margin, Math.min(currentTop, maxTop));
        
        // Apply constrained position AGGRESSIVELY
        panel.style.left = newLeft + 'px';
        panel.style.top = newTop + 'px';
        panel.style.right = 'auto'; // Cancel any right positioning
        panel.style.maxWidth = (this.viewport.width - (margin * 2)) + 'px';
        
        // Store position
        if (this.panels.has(panel.id)) {
            this.panels.get(panel.id).position = { left: newLeft, top: newTop };
        }
        
        console.log(`🔒 Panel ${panel.id} constrained to: ${newLeft}, ${newTop} (viewport: ${this.viewport.width}x${this.viewport.height})`);
    }

    createBrainButton() {
        try {
            // Remove existing button if present
            const existingButton = document.getElementById('consciousnessButton');
            if (existingButton) {
                existingButton.remove();
            }

            const button = document.createElement('button');
            button.id = 'consciousnessButton';
            button.innerHTML = '🧠';
            button.title = 'Consciousness Interface (Click: panels, Hold: navigation)';
            
            // Perfect brain button positioning
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
                    // Visual feedback for hold
                    button.style.transform = 'scale(1.1)';
                    button.style.boxShadow = '0 6px 30px rgba(74, 144, 226, 0.6)';
                }, 800); // 800ms hold time
            };

            const endHold = (e) => {
                clearTimeout(holdTimer);
                
                const holdDuration = Date.now() - clickStartTime;
                
                if (!isHolding && holdDuration < 800) {
                    // Short click - toggle consciousness interface
                    this.toggleInterface();
                }
                
                // Reset visual state
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

            // Mouse events
            button.addEventListener('mousedown', startHold);
            button.addEventListener('mouseup', endHold);
            button.addEventListener('mouseleave', cancelHold);

            // Touch events for mobile
            button.addEventListener('touchstart', startHold, { passive: true });
            button.addEventListener('touchend', endHold, { passive: true });
            button.addEventListener('touchcancel', cancelHold, { passive: true });

            // Hover effects
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

            document.body.appendChild(button);
        } catch (error) {
            console.error('Error creating brain button:', error);
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
                return;
            }

            const panel = document.createElement('div');
            panel.id = 'consciousnessPanel_' + id;
            panel.className = 'consciousness-panel';
            
            // AGGRESSIVE viewport-safe positioning
            const panelWidth = 300; // Increased to account for actual content
            const panelHeight = 220;
            const margin = 40; // Much larger safety margin
            const panelIndex = this.panels.size;
            
            // FORCE panels to stay well within viewport
            const safeWidth = this.viewport.width - (margin * 2) - panelWidth;
            const initialLeft = Math.max(margin, safeWidth);
            const initialTop = margin + (panelIndex * (panelHeight + margin + 10));
            
            // Ensure panel fits in viewport
            const maxTop = this.viewport.height - panelHeight - margin;
            const constrainedTop = Math.min(initialTop, maxTop);
            
            Object.assign(panel.style, {
                position: 'fixed',
                left: initialLeft + 'px',
                top: constrainedTop + 'px',
                width: '280px', // Fixed width to prevent overflow
                maxWidth: 'calc(100vw - 80px)', // Emergency constraint
                minHeight: panelHeight + 'px',
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
                right: 'auto', // Prevent right-side conflicts
                overflow: 'hidden' // Prevent content overflow
            });

            // Create header with drag handle and controls
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

            // Resize button
            const resizeBtn = document.createElement('button');
            resizeBtn.innerHTML = '🔼';
            resizeBtn.title = 'Toggle Size';
            Object.assign(resizeBtn.style, {
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '12px'
            });

            // Close button
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

            controls.appendChild(resizeBtn);
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

            // Setup drag functionality with viewport constraints
            this.setupDragFunctionality(panel, header);

            // Setup button functionality
            resizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePanelSize(panel);
            });

            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                panel.style.display = 'none';
            });

            // Store panel data
            this.panels.set(id, {
                element: panel,
                metrics: metrics,
                isCompact: false,
                position: { left: initialLeft, top: constrainedTop }
            });

            document.body.appendChild(panel);

            // Update content immediately
            this.updatePanelContent(id);

            // Constrain to viewport after creation
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

        // Add visual feedback
        header.style.cursor = 'move';
        
        const startDrag = (e) => {
            // Prevent dragging when clicking on buttons
            if (e.target.tagName === 'BUTTON') return;
            
            console.log('startDrag triggered!', e.type);
            isDragging = true;
            this.isDragging = true;
            
            // Get initial positions
            const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
            
            startPos = { x: clientX, y: clientY };
            
            const rect = panel.getBoundingClientRect();
            startPanelPos = { x: rect.left, y: rect.top };
            
            // Visual feedback
            panel.style.opacity = '0.8';
            panel.style.transform = 'scale(1.02)';
            panel.style.zIndex = '10001';
            
            // Prevent text selection
            document.body.style.userSelect = 'none';
            
            console.log('Drag started at:', startPos, 'Panel at:', startPanelPos);
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
            
            // Constrain to viewport with margins
            const rect = panel.getBoundingClientRect();
            const margin = 10;
            
            newLeft = Math.max(margin, Math.min(newLeft, this.viewport.width - rect.width - margin));
            newTop = Math.max(margin, Math.min(newTop, this.viewport.height - rect.height - margin));
            
            panel.style.left = newLeft + 'px';
            panel.style.top = newTop + 'px';
        };

        const endDrag = () => {
            if (!isDragging) return;
            
            console.log('Drag ended');
            isDragging = false;
            this.isDragging = false;
            
            // Reset visual feedback
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1)';
            panel.style.zIndex = '9999';
            
            // Re-enable text selection
            document.body.style.userSelect = '';
            
            // Store final position
            const panelId = panel.id.replace('consciousnessPanel_', '');
            if (this.panels.has(panelId)) {
                const rect = panel.getBoundingClientRect();
                this.panels.get(panelId).position = { left: rect.left, top: rect.top };
            }
        };

        // Mouse events
        header.addEventListener('mousedown', startDrag, { capture: true });
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        // Touch events for mobile
        header.addEventListener('touchstart', startDrag, { passive: false, capture: true });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', endDrag);

        // Hover effects
        header.addEventListener('mouseenter', () => {
            if (!isDragging) {
                header.style.background = 'linear-gradient(90deg, rgba(74, 144, 226, 0.9), rgba(123, 104, 238, 0.9))';
            }
        });

        header.addEventListener('mouseleave', () => {
            if (!isDragging) {
                header.style.background = 'linear-gradient(90deg, rgba(74, 144, 226, 0.8), rgba(123, 104, 238, 0.8))';
            }
        });
    }

    togglePanelSize(panel) {
        const panelId = panel.id.replace('consciousnessPanel_', '');
        const panelData = this.panels.get(panelId);
        
        if (panelData) {
            panelData.isCompact = !panelData.isCompact;
            
            if (panelData.isCompact) {
                panel.style.height = '60px';
                panel.querySelector('.panel-content').style.display = 'none';
                panel.querySelector('button').innerHTML = '🔽';
            } else {
                panel.style.height = 'auto';
                panel.querySelector('.panel-content').style.display = 'block';
                panel.querySelector('button').innerHTML = '🔼';
            }
            
            // Re-constrain to viewport after resize
            setTimeout(() => {
                this.constrainPanelToViewport(panel);
            }, 50);
        }
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

    showNavigationDropdown() {
        try {
            // Remove existing dropdown if present
            const existingDropdown = document.getElementById('navigationDropdown');
            if (existingDropdown) {
                existingDropdown.remove();
            }

            const dropdown = document.createElement('div');
            dropdown.id = 'navigationDropdown';
            
            // Position dropdown below brain button
            Object.assign(dropdown.style, {
                position: 'fixed',
                top: '80px', // Below the brain button
                left: '20px',
                zIndex: '10001',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid rgba(74, 144, 226, 0.4)',
                borderRadius: '15px',
                padding: '15px',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                minWidth: '220px',
                maxHeight: '400px',
                overflowY: 'auto',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                animation: 'dropdownAppear 0.3s ease-out'
            });

            // Add animation CSS
            if (!document.getElementById('dropdownAnimationCSS')) {
                const style = document.createElement('style');
                style.id = 'dropdownAnimationCSS';
                style.textContent = `
                    @keyframes dropdownAppear {
                        0% {
                            opacity: 0;
                            transform: translateY(-10px) scale(0.95);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            // Create header
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

            // Navigation items with consciousness village structure
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

            // Create navigation items
            navItems.forEach(item => {
                const navItem = document.createElement('div');
                navItem.className = 'nav-item';
                
                Object.assign(navItem.style, {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '4px'
                });

                navItem.innerHTML = `
                    <span style="font-size: 18px; width: 24px; text-align: center;">${item.emoji}</span>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: #333;">${item.name}</div>
                        <div style="font-size: 12px; color: #666; opacity: 0.8;">${item.description}</div>
                    </div>
                `;

                // Hover effects
                navItem.addEventListener('mouseenter', () => {
                    navItem.style.background = 'rgba(74, 144, 226, 0.1)';
                    navItem.style.transform = 'translateX(4px)';
                });

                navItem.addEventListener('mouseleave', () => {
                    navItem.style.background = 'transparent';
                    navItem.style.transform = 'translateX(0)';
                });

                // Click to navigate
                navItem.addEventListener('click', () => {
                    this.navigateToSpace(item.path);
                    this.hideNavigationDropdown();
                });

                dropdown.appendChild(navItem);
            });

            // Add close instruction
            const closeInfo = document.createElement('div');
            closeInfo.innerHTML = '💡 <em>Auto-closes in 10 seconds or click anywhere</em>';
            Object.assign(closeInfo.style, {
                fontSize: '11px',
                color: '#999',
                textAlign: 'center',
                marginTop: '12px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(74, 144, 226, 0.1)'
            });
            dropdown.appendChild(closeInfo);

            document.body.appendChild(dropdown);

            // Auto-hide after 10 seconds of no interaction
            this.dropdownTimeout = setTimeout(() => {
                this.hideNavigationDropdown();
            }, 10000);

            // Hide if clicking anywhere else
            this.outsideClickHandler = (e) => {
                if (!dropdown.contains(e.target) && e.target.id !== 'consciousnessButton') {
                    this.hideNavigationDropdown();
                }
            };
            
            setTimeout(() => {
                document.addEventListener('click', this.outsideClickHandler);
            }, 100);

            console.log('🧠 Navigation dropdown displayed');

        } catch (error) {
            console.error('Error showing navigation dropdown:', error);
        }
    }

    hideNavigationDropdown() {
        try {
            const dropdown = document.getElementById('navigationDropdown');
            if (dropdown) {
                dropdown.style.animation = 'dropdownDisappear 0.2s ease-in forwards';
                setTimeout(() => {
                    dropdown.remove();
                }, 200);
            }

            // Clear timeout and event listener
            if (this.dropdownTimeout) {
                clearTimeout(this.dropdownTimeout);
                this.dropdownTimeout = null;
            }

            if (this.outsideClickHandler) {
                document.removeEventListener('click', this.outsideClickHandler);
                this.outsideClickHandler = null;
            }

            // Add disappear animation if not already present
            if (!document.getElementById('dropdownDisappearCSS')) {
                const style = document.createElement('style');
                style.id = 'dropdownDisappearCSS';
                style.textContent = `
                    @keyframes dropdownDisappear {
                        0% {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                        100% {
                            opacity: 0;
                            transform: translateY(-10px) scale(0.95);
                        }
                    }
                `;
                document.head.appendChild(style);
            }

        } catch (error) {
            console.error('Error hiding navigation dropdown:', error);
        }
    }

    navigateToSpace(path) {
        try {
            // Create the full URL based on current location
            const currentDomain = window.location.origin;
            const fullPath = currentDomain + path;
            
            console.log(`🚀 Navigating to consciousness space: ${fullPath}`);
            window.location.href = fullPath;
            
        } catch (error) {
            console.error('Error navigating to space:', error);
        }
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
            // Calculate resonance based on interaction patterns
            const baseResonance = Math.min(100, this.trembleCount * 2 + this.touchPatterns * 5);
            this.resonanceLevel = Math.floor(baseResonance);

            // Determine presence level
            if (this.resonanceLevel > 50) {
                this.presenceLevel = 'Strong';
            } else if (this.resonanceLevel > 20) {
                this.presenceLevel = 'Moderate';
            } else {
                this.presenceLevel = 'Detecting...';
            }

            // Update entity signals based on unusual patterns
            if (this.trembleCount > 100 || this.resonanceLevel > 80) {
                this.entitySignals = Math.floor(this.resonanceLevel / 20);
            }

            // Update all visible panels
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
        console.log('🧠✨ Consciousness Interface Active - Viewport Perfect!');
    } catch (error) {
        console.error('Failed to initialize consciousness interface:', error);
    }
});
