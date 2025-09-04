# StartupLab Web Presentation

A modern, responsive web presentation built from StartupLab's brand template, following official brand guidelines and design system.

## 🚀 Features

### Brand Compliant Design
- **Colors**: Official StartupLab Red (#FF3333), White, and Dark backgrounds
- **Typography**: Inter font family (matching website standards)  
- **Visual Identity**: Consistent logo usage and brand elements
- **Design System**: Follows established StartupLab brand guidelines

### Interactive Navigation
- **Keyboard Controls**: Arrow keys, Space, Home, End
- **Touch Support**: Swipe gestures for mobile/tablet
- **Mouse Navigation**: Click navigation buttons
- **Fullscreen Mode**: Press 'F' or click fullscreen button

### Modern Web Features
- **Responsive Design**: Adapts to all screen sizes
- **Smooth Animations**: CSS3 and JavaScript transitions
- **Progress Tracking**: Visual progress bar and slide counter
- **Performance Optimized**: Smooth 60fps animations
- **Accessibility**: Keyboard navigation and semantic HTML

## 📁 Project Structure

```
web-presentation/
├── index.html          # Main HTML structure
├── styles.css          # Brand-compliant CSS styles  
├── script.js           # Interactive functionality
└── README.md           # This documentation
```

## 🎯 Slide Content

### Current Slides
1. **Hero Slide** - StartupLab branding and tagline
2. **Who Are We** - Company introduction
3. **Agenda** - Presentation structure
4. **Program Schedule** - Event timeline
5. **Content Template** - Multi-image layout example
6. **Statistics** - Data visualization with puzzle piece design
7. **Timeline** - Roadmap presentation
8. **Summer Pitch Party** - Event showcase
9. **Full Screen Title** - Impact statement
10. **Contact/Thank You** - Final slide with contact details

## 🎮 Navigation Controls

### Keyboard Shortcuts
- **→ ↓ Space**: Next slide
- **← ↑**: Previous slide
- **Home**: First slide
- **End**: Last slide
- **F**: Toggle fullscreen
- **P**: Toggle presentation mode
- **R**: Reset to first slide

### Touch Gestures
- **Swipe Left**: Next slide
- **Swipe Right**: Previous slide

### Mouse Controls
- **← →**: Navigation buttons in header
- **⛶**: Fullscreen toggle button

## 🎨 Customization

### Adding New Slides
1. Copy an existing slide structure in `index.html`
2. Update the `data-slide` attribute with next number
3. Customize content and styling as needed
4. Update `totalSlides` count automatically detected

### Modifying Content
- Edit text directly in HTML
- Replace placeholder images with actual assets
- Adjust layouts using existing CSS grid classes
- Follow brand guidelines for colors and typography

### Styling Options
```css
/* Available layout classes */
.dark-bg      /* Dark gradient background */
.red-bg       /* StartupLab red background */
.pink-bg      /* Light pink accent background */

/* Typography classes */
.startup-logo /* Large logo styling */
.large-title  /* Section headers */
.red-text     /* StartupLab red color */
.white-text   /* White text */

/* Layout classes */
.two-column   /* Split layout */
.hero-slide   /* Hero section layout */
.image-grid   /* Image grid layout */
```

## 📱 Responsive Behavior

### Desktop (1024px+)
- Full two-column layouts
- Large typography scaling
- Hover effects and transitions
- All interactive features enabled

### Tablet (768px - 1024px)
- Single column layouts on smaller screens
- Adjusted spacing and typography
- Touch-optimized navigation
- Simplified animations

### Mobile (< 768px)
- Mobile-first responsive design
- Larger touch targets
- Simplified layouts
- Optimized text sizing

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in a modern web browser
2. Use keyboard arrows or click navigation buttons
3. Press 'F' for fullscreen presentation mode

### Development Setup
```bash
# No build process required - pure HTML/CSS/JS
# Simply open index.html in your browser

# For local development server (optional):
# Python 3
python -m http.server 8000

# Python 2  
python -m SimpleHTTPServer 8000

# Node.js (if you have serve installed)
npx serve .

# Then visit: http://localhost:8000
```

### Hosting Options
- **Static Hosting**: Upload to any web server
- **GitHub Pages**: Host directly from repository
- **Netlify/Vercel**: Drag-and-drop deployment
- **Local Network**: Share via local server

## 🎯 Brand Guidelines Compliance

### Colors Used
- **Primary**: #FF3333 (StartupLab Red)
- **Background**: #1A1A1A (Dark), #2A2A2A (Medium Dark)
- **Text**: #FFFFFF (White), #808080 (Gray)
- **Accent**: #FFE5EA (Light Pink)

### Typography Hierarchy
- **Headers**: Inter 800 (Extra Bold)
- **Body Text**: Inter 400 (Regular)
- **UI Elements**: Inter 500 (Medium)

### Logo Usage
- Proper "STARTUP LAB" split formatting
- Correct color applications (Red + White)
- Appropriate sizing and spacing
- Brand-compliant positioning

## 🔧 Advanced Features

### Auto-Advance Mode
```javascript
// Start auto-advance (10 seconds per slide)
window.presentation.startAutoAdvance(10000);

// Stop auto-advance
window.presentation.stopAutoAdvance();
```

### Custom Animations
- Slide-specific animation sequences
- Staggered element animations
- CSS3 transitions and transforms
- Performance-optimized rendering

### Performance Features
- Optimized CSS animations
- Efficient DOM manipulation
- Responsive image handling
- Smooth 60fps transitions

## 🤝 Contributing

### Making Changes
1. Follow existing code structure
2. Test on multiple screen sizes
3. Maintain brand guideline compliance
4. Ensure accessibility standards

### Code Style
- Use semantic HTML5 elements
- Follow BEM CSS methodology
- Write clean, documented JavaScript
- Maintain responsive design principles

## 📄 Browser Support

### Recommended Browsers
- **Chrome 90+** ✅ Full support
- **Firefox 88+** ✅ Full support  
- **Safari 14+** ✅ Full support
- **Edge 90+** ✅ Full support

### Mobile Browsers
- **iOS Safari** ✅ Full support
- **Chrome Mobile** ✅ Full support
- **Samsung Internet** ✅ Full support

## 📞 Support

### Project Information
- **Brand Guidelines**: See `brand-profile/README.md`
- **Asset Inventory**: See `docs/brand-assets-inventory.md`
- **Development Guide**: See main project `WARP.md`

### Contact
- **Website**: startuplab.no
- **Locations**: Oslo • Bergen
- **Project**: StartupLab Partner Program Presentation

---

**Built with ❤️ following StartupLab brand guidelines**
