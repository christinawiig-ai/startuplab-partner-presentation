# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **StartupLab Partner Program Presentation** project - a brand-focused presentation development repository containing comprehensive brand guidelines, visual assets, and web presentation materials for creating partner program presentations.

## Key Architecture & Structure

### Web Presentation System (`web-presentation/`)
- **Technology Stack**: Pure HTML5/CSS3/JavaScript (no build process required)
- **Interactive Features**: Keyboard navigation, touch/swipe support, fullscreen mode
- **Animation System**: CSS3 transitions with JavaScript orchestration
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts

### Brand Asset System (`brand-profile/`)
- **Typography**: Replica LL (primary), Gelasio (secondary), Inter (web fallback)
- **Logo Hierarchy**: Full wordmark → SL symbol → Industry-specific programs
- **Color System**: StartupLab Red (#FF3333), White, Black, Light Pink accent
- **Industry Programs**: Hardware, Data Science, Energy, Mobility, Construction, Fintech, Ventures

## Common Commands

### Web Presentation Development
```bash
# No build process required - direct browser opening
# For local development server (if needed):
python -m http.server 8000
# or
npx serve .
```

### Content & Asset Management
```bash
# View brand guidelines and usage rules
cat brand-profile/README.md

# Check presentation structure and content outline
cat content/presentation-outline.md

# Review brand asset inventory
cat docs/brand-assets-inventory.md
```

## Code Architecture

### JavaScript Architecture (`web-presentation/script.js`)
- **Class-based Structure**: `StartupLabPresentation` main controller class
- **Event-driven Navigation**: Keyboard, mouse, and touch event handlers
- **Animation Engine**: Slide-specific animation sequences with timing controls
- **State Management**: Slide tracking, progress indication, fullscreen handling
- **Performance Optimization**: Debounced events, 60fps animations, transition monitoring

### CSS Architecture (`web-presentation/styles.css`)
- **Brand-compliant Design System**: Official colors, typography, spacing
- **Responsive Grid Layouts**: Flexbox and CSS Grid for slide layouts
- **Animation Framework**: Smooth transitions and slide-specific animations
- **Component-based Styling**: Reusable slide layouts and visual components

### HTML Structure (`web-presentation/index.html`)
- **Semantic Slide Architecture**: Section-based slide organization
- **Accessibility Features**: Keyboard navigation, semantic HTML5
- **Brand-compliant Content**: Official logo usage, approved messaging
- **Interactive Navigation**: Progress bar, slide counter, fullscreen controls

## Brand Compliance Requirements

### Critical Brand Standards
- **Logo Usage**: Only red, white, or black versions - never alter proportions
- **Typography Hierarchy**: Replica LL for headers, Gelasio for body text
- **Color Palette**: Strict adherence to #FF3333 primary red and approved secondaries
- **Messaging Tone**: Professional but not corporate, tech-savvy but accessible

### Web Presentation Navigation
- **Keyboard**: Arrow keys, Space (next), Home/End (first/last), F (fullscreen)
- **Touch**: Swipe left/right for navigation
- **Mouse**: Navigation buttons, fullscreen toggle
- **API**: `window.presentation.goToSlide(n)`, auto-advance controls

## Development Workflow

1. **Brand Compliance Check**: Always reference `brand-profile/README.md` first
2. **Content Development**: Follow structure in `content/presentation-outline.md`
3. **Asset Integration**: Use organized assets from `brand-profile/` subdirectories
4. **Web Testing**: Test responsiveness across mobile, tablet, desktop
5. **Performance Validation**: Ensure smooth 60fps animations and transitions

## File Organization Patterns

```
├── web-presentation/          # Interactive web presentation (HTML/CSS/JS)
├── brand-profile/            # Complete brand system and guidelines
├── content/                  # Presentation content and messaging
├── docs/                     # Asset inventories and documentation
└── [future directories]      # Assets, design-elements, background-materials
```

## Key Success Factors

1. **Brand Consistency**: All materials must follow StartupLab brand guidelines
2. **Web Performance**: Maintain smooth animations and responsive behavior
3. **Accessibility**: Ensure keyboard navigation and semantic structure
4. **Cross-platform Compatibility**: Test across browsers and devices
5. **Content Quality**: Align all messaging with StartupLab's professional standards