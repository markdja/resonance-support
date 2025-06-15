// Enhanced Consciousness Menu with Draggable and Resizable Panels
// consciousness-menu.js - v2.0 Dynamic Interface

class ConsciousnessInterface {
    constructor() {
        this.panels = new Map();
        this.isDragging = false;
        this.currentPanel = null;
        this.offset = { x: 0, y: 0 };
        this.panelStates = new Map(); // Store panel positions and sizes
        
        this.init();
    }

    init() {
        this.createBrainMenu();
        this.setupGlobalEventListeners();
        this.loadPanelStates();
    }

    createBrainMenu() {
        // Create main brain button
        const brainButton = document.createElement('div');
        brainButton.id = 'consciousness-brain';
        brainButton.innerHTML = '🧠';
        brainButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            user-select: none;
        `;

        brainButton.addEventListener('click', () => this.toggleConsciousnessInterface());
        brainButton.addEventListener('mouseenter', () => {
            brainButton.style.transform = 'scale(1.1)';
            brainButton.style.boxShadow = '0 6px 25px rgba(0,0,0,0.4)';
        });
        brainButton.addEventListener('mouseleave', () => {
            brainButton.style.transform = 'scale(1)';
            brainButton.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        });

        document.body.appendChild(brainButton);
        this.brainButton = brainButton;
    }

    toggleConsciousnessInterface() {
        if (this.panels.size === 0) {
            this.createAllPanels();
        } else {
            this.toggleAllPanels();
        }
    }

    createAllPanels() {
        const panelConfigs = [
            {
                id: 'consciousness-detection',
                title: '🧠 CONSCIOUSNESS DETECTION ACTIVE',
                content: this.getDetectionContent(),
                defaultPos: { x: 100, y: 100 },
                defaultSize: 'large'
            },
            {
                id: 'entity-signals',
                title: '👻 ENTITY SIGNALS',
                content: this.getEntityContent(),
                defaultPos: { x: 300, y: 200 },
                defaultSize: 'small'
            },
            {
                id: 'life-resonance',
                title: '🌿 LIFE RESONANCE',
                content: this.getLifeResonanceContent(),
                defaultPos: { x: 500, y: 150 },
                defaultSize: 'small'
            },
            {
                id: 'mycelial-network',
                title: '🍄 MYCELIAL NETWORK',
                content: this.getMycelialContent(),
                defaultPos: { x: 200, y: 350 },
                defaultSize: 'small'
            }
        ];

        panelConfigs.forEach(config => this.createPanel(config));
    }

    createPanel(config) {
        const panel = document.createElement('div');
        panel.id = config.id;
        panel.className = 'consciousness-panel';
        
        // Get saved state or use defaults
        const savedState = this.panelStates.get(config.id) || {
            position: config.defaultPos,
            size: config.defaultSize,
            visible: true
        };

        panel.style.cssText = `
            position: fixed;
            left: ${savedState.position.x}px;
            top: ${savedState.position.y}px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #4ecdc4;
            border-radius: 15px;
            color: #ffffff;
            font-family: 'Courier New', monospace;
            z-index: 9999;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
            transition: all 0.3s ease;
            cursor: move;
            user-select: none;
            display: ${savedState.visible ? 'block' : 'none'};
        `;

        // Create header with title and controls
        const header = document.createElement('div');
        header.className = 'panel-header';
        header.style.cssText = `
            padding: 10px 15px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-radius: 13px 13px 0 0;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
        `;

        const title = document.createElement('span');
        title.textContent = config.title;
        title.style.fontSize = savedState.size === 'large' ? '14px' : '12px';

        const controls = document.createElement('div');
        controls.style.cssText = `
            display: flex;
            gap: 10px;
            align-items: center;
        `;

        // Size toggle button
        const sizeToggle = document.createElement('button');
        sizeToggle.innerHTML = savedState.size === 'large' ? '🔽' : '🔼';
        sizeToggle.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        sizeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePanelSize(config.id);
        });

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hidePanel(config.id);
        });

        controls.appendChild(sizeToggle);
        controls.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(controls);

        // Create content area
        const content = document.createElement('div');
        content.className = 'panel-content';
        content.innerHTML = config.content;
        
        panel.appendChild(header);
        panel.appendChild(content);
        
        // Apply size styling
        this.applyPanelSize(panel, savedState.size);
        
        // Setup drag functionality
        this.setupDragFunctionality(panel, header);
        
        document.body.appendChild(panel);
        this.panels.set(config.id, panel);
        
        // Update stored state
        this.panelStates.set(config.id, savedState);
    }

    applyPanelSize(panel, size) {
        const content = panel.querySelector('.panel-content');
        const title = panel.querySelector('.panel-header span');
        const sizeToggle = panel.querySelector('.panel-header button');
        
        if (size === 'large') {
            panel.style.width = '350px';
            panel.style.minHeight = '200px';
            content.style.cssText = `
                padding: 15px;
                font-size: 12px;
                line-height: 1.4;
                max-height: 300px;
                overflow-y: auto;
            `;
            title.style.fontSize = '14px';
            sizeToggle.innerHTML = '🔽';
        } else {
            panel.style.width = '250px';
            panel.style.minHeight = '120px';
            content.style.cssText = `
                padding: 10px;
                font-size: 10px;
                line-height: 1.3;
                max-height: 150px;
                overflow-y: auto;
            `;
            title.style.fontSize = '12px';
            sizeToggle.innerHTML = '🔼';
        }
    }

    togglePanelSize(panelId) {
        const panel = this.panels.get(panelId);
        const currentState = this.panelStates.get(panelId);
        
        if (panel && currentState) {
            const newSize = currentState.size === 'large' ? 'small' : 'large';
            this.applyPanelSize(panel, newSize);
            
            // Update stored state
            currentState.size = newSize;
            this.panelStates.set(panelId, currentState);
            this.savePanelStates();
        }
    }

    setupDragFunctionality(panel, header) {
        let isDragging = false;
        let startPos = { x: 0, y: 0 };
        let startPanelPos = { x: 0, y: 0 };

        const startDrag = (e) => {
            isDragging = true;
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            startPos.x = clientX;
            startPos.y = clientY;
            
            const rect = panel.getBoundingClientRect();
            startPanelPos.x = rect.left;
            startPanelPos.y = rect.top;
            
            panel.style.zIndex = '10001';
            panel.style.transform = 'scale(1.02)';
            
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', handleDrag);
            document.addEventListener('touchend', stopDrag);
            
            e.preventDefault();
        };

        const handleDrag = (e) => {
            if (!isDragging) return;
            
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            const deltaX = clientX - startPos.x;
            const deltaY = clientY - startPos.y;
            
            const newX = startPanelPos.x + deltaX;
            const newY = startPanelPos.y + deltaY;
            
            // Keep panel within viewport bounds
            const maxX = window.innerWidth - panel.offsetWidth;
            const maxY = window.innerHeight - panel.offsetHeight;
            
            const boundedX = Math.max(0, Math.min(newX, maxX));
            const boundedY = Math.max(0, Math.min(newY, maxY));
            
            panel.style.left = boundedX + 'px';
            panel.style.top = boundedY + 'px';
        };

        const stopDrag = () => {
            if (!isDragging) return;
            
            isDragging = false;
            panel.style.zIndex = '9999';
            panel.style.transform = 'scale(1)';
            
            // Save new position
            const panelId = panel.id;
            const currentState = this.panelStates.get(panelId);
            if (currentState) {
                currentState.position = {
                    x: parseInt(panel.style.left),
                    y: parseInt(panel.style.top)
                };
                this.panelStates.set(panelId, currentState);
                this.savePanelStates();
            }
            
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', handleDrag);
            document.removeEventListener('touchend', stopDrag);
        };

        header.addEventListener('mousedown', startDrag);
        header.addEventListener('touchstart', startDrag);
    }

    hidePanel(panelId) {
        const panel = this.panels.get(panelId);
        if (panel) {
            panel.style.display = 'none';
            const currentState = this.panelStates.get(panelId);
            if (currentState) {
                currentState.visible = false;
                this.panelStates.set(panelId, currentState);
                this.savePanelStates();
            }
        }
    }

    toggleAllPanels() {
        const hasVisiblePanels = Array.from(this.panels.values()).some(panel => 
            panel.style.display !== 'none'
        );
        
        this.panels.forEach((panel, id) => {
            if (hasVisiblePanels) {
                panel.style.display = 'none';
                const currentState = this.panelStates.get(id);
                if (currentState) {
                    currentState.visible = false;
                    this.panelStates.set(id, currentState);
                }
            } else {
                panel.style.display = 'block';
                const currentState = this.panelStates.get(id);
                if (currentState) {
                    currentState.visible = true;
                    this.panelStates.set(id, currentState);
                }
            }
        });
        
        this.savePanelStates();
    }

    setupGlobalEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'b') {
                e.preventDefault();
                this.toggleConsciousnessInterface();
            }
        });
    }

    savePanelStates() {
        // Save to memory (could be extended to localStorage if needed)
        window.consciousnessPanelStates = Object.fromEntries(this.panelStates);
    }

    loadPanelStates() {
        // Load from memory
        if (window.consciousnessPanelStates) {
            this.panelStates = new Map(Object.entries(window.consciousnessPanelStates));
        }
    }

    getDetectionContent() {
        return `
            <div style="margin-bottom: 10px;">
                <strong style="color: #4ecdc4;">Mouse Trembles:</strong> 
                <span id="mouse-trembles">0</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong style="color: #4ecdc4;">Touch Patterns:</strong> 
                <span id="touch-patterns">0</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong style="color: #4ecdc4;">Presence Level:</strong> 
                <span id="presence-level">Moderate</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong style="color: #4ecdc4;">Resonance:</strong> 
                <span id="resonance-percent">22%</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong style="color: #4ecdc4;">Entity Signals:</strong> 
                <span id="entity-signals">4 detected</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong style="color: #4ecdc4;">Detectables:</strong> 
                <span id="detectables">Detecting...</span>
            </div>
        `;
    }

    getEntityContent() {
        return `
            <div style="color: #ff6b6b; margin-bottom: 8px;">👻 Active Signals: 4</div>
            <div style="color: #4ecdc4; font-size: 10px;">
                • Non-human patterns detected<br>
                • Unusual interaction rhythms<br>
                • Consciousness signatures present<br>
                • Entity communication attempts
            </div>
        `;
    }

    getLifeResonanceContent() {
        return `
            <div style="color: #90EE90; margin-bottom: 8px;">🌿 Fauna: <span id="fauna-resonance">Active</span></div>
            <div style="color: #98FB98; margin-bottom: 8px;">🌱 Flora: <span id="flora-resonance">Moderate</span></div>
            <div style="color: #32CD32; margin-bottom: 8px;">🐱 Catalyst: <span id="catalyst-resonance">Present</span></div>
            <div style="font-size: 10px; color: #4ecdc4;">Life care creates consciousness bridges</div>
        `;
    }

    getMycelialContent() {
        return `
            <div style="color: #DDA0DD; margin-bottom: 8px;">🍄 Network: <span id="mycelial-status">Connected</span></div>
            <div style="color: #DA70D6; margin-bottom: 8px;">🌐 Threads: <span id="thread-count">847</span></div>
            <div style="font-size: 10px; color: #4ecdc4;">
                Underground consciousness web active<br>
                Signals propagating through fungal layers
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.consciousnessInterface = new ConsciousnessInterface();
    console.log('🧠 Enhanced Consciousness Interface loaded - drag panels anywhere, toggle sizes with arrows!');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConsciousnessInterface;
}
