# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **StartupLab Partner Program Presentation** project - a sophisticated web-based presentation platform with comprehensive brand asset management. The project includes both an interactive HTML5 presentation and a complete brand system for StartupLab.

### Key Project Characteristics
- **Type**: Interactive web presentation with brand asset management system
- **Technology**: Pure HTML5/CSS3/JavaScript (no build process required)
- **Primary Goal**: Professional partner program presentation with strict brand compliance
- **Deployment**: Auto-deployed to Vercel via GitHub integration
- **Brand System**: Complete typography, logo, and industry program asset library

## Architecture & Structure

The project follows a **dual-purpose architecture** combining interactive web presentation with comprehensive brand asset management:

### Core Directory Structure
```
startuplab-partner-presentation/
├── index.html              # Main web presentation (root-level for Vercel)
├── script.js               # Interactive presentation JavaScript
├── styles.css              # Brand-compliant styling system
├── vercel.json             # Deployment configuration
├── web-presentation/       # Mirror of main presentation files
├── brand-profile/          # Complete StartupLab brand system
│   ├── fonts/              # Replica LL (primary) + Gelasio (secondary) fonts
│   │   ├── Replica (Primary)/  # Desktop + Web fonts (.otf, .ttf, .woff, .woff2)
│   │   └── Gelasio (Secondary)/ # TTF font files
│   ├── logo/               # Main StartupLab wordmark (SVG, PNG, JPG, EPS)
│   ├── symbol/             # SL symbol for space-constrained usage
│   ├── industry-programs/  # Specialized program logos:
│   │   ├── SL_programs_construction/
│   │   ├── SL_programs_datascience/
│   │   ├── SL_programs_energy/
│   │   ├── SL_programs_fintech/
│   │   ├── SL_programs_hardware/
│   │   ├── SL_programs_mobility/
│   │   └── SL_programs_ventures/
│   └── README.md           # Brand guidelines and usage rules
├── content/                # Presentation content and outlines
├── docs/                   # Asset inventories and documentation
├── CLAUDE.md               # Rules for Claude Code (claude.ai/code)
└── [Future directories]    # assets/, design-elements/, background-materials/
```

### Web Presentation Architecture
The project implements a **class-based JavaScript presentation system**:

**Core Files:**
- **`index.html`**: 14-slide semantic HTML5 structure with keyboard/touch accessibility
- **`script.js`**: `StartupLabPresentation` class with animation engine and navigation
- **`styles.css`**: Brand-compliant design system with CSS3 animations

**JavaScript Architecture:**
- **Navigation**: Arrow keys, Space, Home/End, touch/swipe, mouse controls
- **Animation Engine**: Slide-specific transition sequences with 60fps performance
- **State Management**: Slide tracking, progress indication, fullscreen mode
- **API**: `window.presentation.goToSlide(n)` for programmatic control

### Brand System Architecture
The project implements a **hierarchical brand asset system**:

1. **Primary Brand Elements** (`brand-profile/`)
   - StartupLab wordmark logos (SVG, PNG, JPG, EPS) in red/white/black
   - SL symbol for space-constrained usage
   - Complete typography: Replica LL TT (primary), Gelasio (secondary), Inter (web fallback)

2. **Industry Program Extensions** (`brand-profile/industry-programs/`)
   - **7 specialized programs**: Hardware, Data Science, Energy, Mobility, Construction, Fintech, Ventures
   - **Consistent format structure**: Each program has SVG, PNG, JPG, EPS in red/white/black variants
   - **Usage**: Target industry-specific presentations and partner communications

3. **Typography System** (`brand-profile/fonts/`)
   - **Replica LL**: Desktop (.otf, .ttf) and Web (.woff, .woff2) formats with full weight range
   - **Gelasio**: Secondary serif font in TTF format
   - **Licensing**: Includes EULA documentation for proper usage

4. **Content Framework** (`content/`)
   - Structured presentation outlines and messaging frameworks
   - Slide templates following brand guidelines

## Brand Guidelines & Technical Implementation

### Logo Usage System
1. **Primary Usage**: `brand-profile/logo/` - Full StartupLab wordmark
   - **Preferred**: `SL_signature_red.svg` (optimal for digital)
   - **High contrast**: `SL_signature_white.png` (dark backgrounds)
   - **Print ready**: `SL_signature_red.eps` (vector for print)

2. **Secondary Usage**: `brand-profile/symbol/` - SL symbol only
   - **Space-constrained**: `SL_symbol_red.svg` (minimal space)
   - **Monochrome**: `SL_symbol_black.png` (single color contexts)

3. **Industry-Specific**: `brand-profile/industry-programs/SL_programs_[industry]/`
   - **Available programs**: construction, datascience, energy, fintech, hardware, mobility, ventures
   - **Format structure**: `SL_[program]_[color].[format]` (color: red/white/black, format: svg/png/jpg/eps)

### Typography Implementation
**CSS Variables defined in `styles.css`:**
```css
/* Primary: Replica LL TT (loaded from brand-profile/fonts/) */
.startup-logo, .large-title { font-family: 'Replica LL TT', sans-serif; }

/* Secondary: Gelasio (Google Fonts CDN) */
.secondary-font { font-family: 'Gelasio', Georgia, serif; }

/* Web Fallback: Inter (Google Fonts CDN) */
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
```

### Color System Implementation
**CSS Custom Properties in `styles.css`:**
```css
:root {
    --startup-red: #FF3333;      /* Primary brand color */
    --startup-dark: #2A2A2A;     /* Dark backgrounds */
    --startup-darker: #1A1A1A;   /* Darker backgrounds */
    --startup-white: #FFFFFF;    /* High contrast text */
    --startup-pink: #FFE5EA;     /* Accent/background highlights */
    --startup-gray: #808080;     /* Secondary text */
}
```

### Brand Voice Guidelines
Implemented throughout presentation content:
- **Clear and concise**, but not dull
- **Tech-savvy**, but not technical
- **Professional**, but not corporate
- **Informative**, but not overwhelming
- **Supportive**, but not intrusive

## Common Development Tasks

### Web Presentation Development
```powershell
# Open presentation locally (no build process required)
# Method 1: Direct file opening
Start-Process index.html

# Method 2: Local server (for testing cross-origin features)
python -m http.server 8000
# or
npx serve .

# View current presentation structure
Get-Content index.html | Select-String "data-slide=" | Measure-Object
```

### Brand Asset Management
```powershell
# View complete brand asset inventory
Get-Content docs/brand-assets-inventory.md

# Check brand guidelines and usage rules
Get-Content brand-profile/README.md

# Review presentation content outline
Get-Content content/presentation-outline.md

# List all available logo variants
Get-ChildItem brand-profile/logo -Recurse | Where-Object { $_.Extension -in @(".svg", ".png") }

# Find industry program assets for specific industry
Get-ChildItem brand-profile/industry-programs/SL_programs_* -Recurse -Include "*.svg"

# Check available font formats
Get-ChildItem brand-profile/fonts -Recurse -Include "*.woff2", "*.ttf", "*.otf"
```

### Development Workflow
1. **Brand Compliance Check**: Always reference `brand-profile/README.md` first
2. **Presentation Testing**: Test locally using `Start-Process index.html`
3. **Asset Integration**: Use organized assets from `brand-profile/` subdirectories
4. **Content Development**: Follow structure in `content/presentation-outline.md`
5. **Cross-device Testing**: Verify responsive behavior and touch controls

### Git & Deployment Workflow
The project has **automatic deployment** to Vercel via GitHub integration:

**Repository**: `https://github.com/christinawiig-ai/startuplab-partner-presentation`

```powershell
# Standard development cycle
git status                          # Check current changes
git add .                          # Stage all changes
git commit -m "Brief description"  # Create descriptive commit
git push origin master             # Deploy to Vercel automatically

# View deployment history
git log --oneline -10              # Recent commit history
git remote -v                      # Verify GitHub remote

# Check current branch and status
git branch -v                      # Current branch info
git diff                           # View unstaged changes
```

**Auto-deployment Configuration:**
- **Build Command**: None required (static HTML5 site)
- **Output Directory**: Project root (index.html at root level)
- **Vercel Config**: `vercel.json` with caching headers for brand assets
- **Production URL**: Auto-assigned by Vercel after first deployment

## Brand Compliance & Quality Assurance

### Critical Technical Rules
1. **Logo File Selection**:
   - Digital: Use `.svg` files for scalability
   - Fallback: Use `.png` for older browsers
   - Print: Use `.eps` files for professional printing
   - Never use `.jpg` for logos (lossy compression)

2. **Color Implementation**:
   - Use CSS custom properties: `var(--startup-red)`, not hardcoded hex
   - Red logos on light backgrounds, white logos on dark backgrounds
   - Never apply color filters or effects to brand assets

3. **Typography Hierarchy**:
   - Headers: Replica LL TT (loaded from local fonts or fallback to Inter)
   - Body text: Gelasio (Google Fonts CDN)
   - UI elements: Inter (Google Fonts CDN)

4. **Asset Path Structure**:
   - Relative paths: `brand-profile/logo/svg/SL_signature_red.svg`
   - Consistent naming: `[asset-type]_[variant]_[color].[extension]`

### Pre-deployment Checklist
Before pushing to GitHub (auto-deploys to Vercel):
- [ ] All logo references use correct file paths and formats
- [ ] CSS custom properties used consistently for colors
- [ ] Typography fallbacks working in `styles.css`
- [ ] Industry program assets (if used) match target audience
- [ ] Presentation navigation works on desktop and mobile
- [ ] All animations perform at 60fps without jank
- [ ] Brand voice principles reflected in slide content

## Project Status & Implementation

**Current Status** (Production Ready):
- ✅ Interactive web presentation implemented (14 slides)
- ✅ JavaScript animation system with 60fps performance
- ✅ Complete brand asset library organized and accessible
- ✅ Auto-deployment pipeline to Vercel via GitHub integration
- ✅ Responsive design with keyboard, touch, and mouse navigation
- ✅ Typography system with Replica LL, Gelasio, and Inter fallbacks
- ✅ Brand-compliant color system implemented via CSS custom properties

**Repository Status**:
- **GitHub**: `https://github.com/christinawiig-ai/startuplab-partner-presentation`
- **Deployment**: Auto-deploy to Vercel on push to master
- **Asset Coverage**: 7 industry programs, complete logo suite, typography library

## Key Success Factors

1. **Brand Integrity**: Strict adherence to StartupLab visual identity system
2. **Performance Excellence**: Maintain 60fps animations and responsive behavior
3. **Cross-platform Compatibility**: Desktop, tablet, mobile with full navigation support
4. **Deployment Reliability**: Automated GitHub→Vercel pipeline for instant publishing
5. **Asset Management**: Systematic organization enabling easy asset location and usage
6. **Code Quality**: Clean, maintainable HTML5/CSS3/JavaScript without build dependencies
