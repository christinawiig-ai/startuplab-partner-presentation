# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **StartupLab Partner Program Presentation** project - a brand-focused presentation development repository containing comprehensive brand guidelines, visual assets, and content materials for creating partner program presentations.

### Key Project Characteristics
- **Type**: Brand asset management and presentation content development
- **Primary Goal**: Develop a professional partner program presentation following StartupLab's brand guidelines
- **Content-focused**: Heavy emphasis on brand compliance, visual consistency, and messaging alignment
- **Static Assets**: No compilation or build process - primarily document and asset management

## Architecture & Structure

The project follows a **content-centric architecture** organized around brand asset management and presentation development:

### Core Directory Structure
```
startuplab-partner-presentation/
├── brand-profile/           # Complete StartupLab brand system
│   ├── fonts/              # Typography assets (Replica primary, Gelasio secondary)
│   ├── logo/               # Primary StartupLab logos (SVG, PNG, JPG, EPS)
│   ├── symbol/             # SL symbol variations
│   ├── industry-programs/  # Industry-specific program logos
│   └── README.md           # Brand guidelines and usage rules
├── content/                # Presentation content and outlines
├── docs/                   # Documentation and inventories
├── assets/                 # General presentation assets (future use)
├── design-elements/        # Visual components and layouts (future use)
└── background-materials/   # Research and supporting data (future use)
```

### Brand System Architecture
The project implements a **hierarchical brand system**:

1. **Primary Brand Elements** (`brand-profile/`)
   - Main StartupLab logos in multiple formats
   - SL symbol for space-constrained usage
   - Complete typography system (Replica LL + Gelasio)

2. **Industry Program Extensions** (`brand-profile/industry-programs/`)
   - Specialized logos for: Hardware, Data Science, Energy, Mobility, Construction, Fintech, Ventures
   - Consistent format structure: SVG, PNG, JPG, EPS in multiple colors

3. **Content Framework** (`content/`)
   - Structured presentation outlines
   - Key messaging frameworks
   - Slide templates and guidelines

## Brand Guidelines & Standards

### Logo Usage Hierarchy
1. **Primary Usage**: Full StartupLab wordmark (red preferred, white/black for contrast)
2. **Secondary Usage**: SL symbol (only when space-limited or brand well-established)
3. **Industry-Specific**: Program-specific logos for targeted presentations

### Typography System
- **Primary Font**: Replica LL TT (custom brand font) - headers, key messaging
- **Secondary Font**: Gelasio - body text, supporting content
- **Web Fallback**: Inter (website compatibility)

### Color Palette Standards
- **Primary**: StartupLab Red (#FF3333 based on website tokens)
- **Secondary**: White (#FFFFFF), Black (#000000)
- **Accent**: Light Pink (#FFE5EA) for backgrounds and highlights

### Brand Voice Guidelines
The project enforces specific tone of voice principles:
- Clear and concise, but not dull
- Tech-savvy, but not technical
- Professional, but not corporate
- Informative, but not overwhelming
- Supportive, but not intrusive

## Common Development Tasks

### Asset Management
```powershell
# View brand asset inventory
Get-Content docs/brand-assets-inventory.md

# Check brand guidelines
Get-Content brand-profile/README.md

# Review presentation structure
Get-Content content/presentation-outline.md
```

### Content Development Workflow
1. **Review Brand Guidelines**: Always start with `brand-profile/README.md`
2. **Check Asset Inventory**: Reference `docs/brand-assets-inventory.md`
3. **Follow Presentation Outline**: Use `content/presentation-outline.md` as framework
4. **Maintain Brand Compliance**: Verify against established guidelines

### File Organization Commands
```powershell
# List all logo assets
Get-ChildItem brand-profile/logo -Recurse

# Find specific industry program assets
Get-ChildItem brand-profile/industry-programs -Recurse -Include "*.svg"

# Check font assets
Get-ChildItem brand-profile/fonts -Recurse
```

### Version Control Workflow
Based on README.md status tracking, the project follows these stages:
1. **Asset Collection**: Gather official logos and brand materials
2. **Content Development**: Create presentation content following guidelines
3. **Template Creation**: Build slide templates with brand compliance
4. **Messaging Framework**: Develop partner-specific messaging
5. **Review & Refinement**: Ensure brand guideline adherence

## Brand Compliance Requirements

### Critical Brand Rules
- **Logo Integrity**: Never alter proportions, rotation, or add effects
- **Color Usage**: Only use approved red, white, or black versions
- **Typography**: Use Replica for headers, Gelasio for body text
- **Messaging**: Follow established tone of voice principles
- **Industry Programs**: Use appropriate program logos for targeted content

### Quality Assurance Checklist
Before finalizing any presentation materials:
- [ ] Logo usage follows brand guidelines
- [ ] Colors match specified palette
- [ ] Typography uses approved fonts
- [ ] Messaging aligns with brand voice
- [ ] Industry program assets used appropriately
- [ ] All assets are high-quality and properly formatted

## Project Status Tracking

Current project completion status (from README.md):
- ✅ Git repository initialized
- ✅ Project structure organized  
- ✅ Brand guidelines documented
- ✅ Company messaging established
- ✅ Logo usage rules defined
- ✅ Typography guidelines identified
- 📋 Pending: Official logo collection, content development, template creation

## Key Success Factors

1. **Brand Consistency**: All materials must strictly follow StartupLab brand guidelines
2. **Asset Organization**: Maintain systematic file organization for easy asset location
3. **Content Quality**: Ensure all presentation content reflects StartupLab's professional standards
4. **Version Control**: Track all changes and maintain clean project history
5. **Stakeholder Alignment**: Regular communication with brand standards and presentation objectives
