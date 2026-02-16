/**
 * StartupLab PowerPoint Template Generator
 * Creates a branded presentation template with all 10 component types
 * Using pptxgenjs for PowerPoint generation
 */

import PptxGenJS from 'pptxgenjs';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load design tokens
const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));

// PPT Configuration
const PPT_CONFIG = {
  width: '10',
  height: '5.625',
  layout: 'LAYOUT_16x9'
};

// Brand Colors (RGB format for pptxgenjs)
const COLORS = {
  primary: 'E5463A',
  dark: '0B0F14', 
  light: 'F5F7FA',
  muted: '9AA4B2',
  white: 'FFFFFF',
  border: 'E5E8EC'
};

// Typography (PPT-safe fonts)
const FONTS = {
  primary: 'Aptos',
  fallback: 'Calibri'
};

/**
 * Initialize presentation
 */
function createPresentation() {
  const pres = new PptxGenJS();
  pres.defineLayout({ 
    name: 'CUSTOM', 
    width: parseFloat(PPT_CONFIG.width), 
    height: parseFloat(PPT_CONFIG.height) 
  });
  pres.layout = 'CUSTOM';
  
  return pres;
}

/**
 * Add common text formatting
 */
function getTextStyle(type = 'body') {
  const styles = {
    hero: {
      fontSize: 72,
      fontFace: FONTS.primary,
      bold: true,
      color: COLORS.dark
    },
    title: {
      fontSize: 48,
      fontFace: FONTS.primary,
      bold: true,
      color: COLORS.dark
    },
    section: {
      fontSize: 36,
      fontFace: FONTS.primary,
      bold: true,
      color: COLORS.dark
    },
    heading: {
      fontSize: 28,
      fontFace: FONTS.primary,
      bold: true,
      color: COLORS.dark
    },
    subheading: {
      fontSize: 24,
      fontFace: FONTS.primary,
      bold: false,
      color: COLORS.muted
    },
    body: {
      fontSize: 18,
      fontFace: FONTS.primary,
      bold: false,
      color: COLORS.dark
    },
    caption: {
      fontSize: 16,
      fontFace: FONTS.primary,
      bold: false,
      color: COLORS.muted
    },
    small: {
      fontSize: 14,
      fontFace: FONTS.primary,
      bold: false,
      color: COLORS.muted
    }
  };
  
  return styles[type] || styles.body;
}

/**
 * 1. Title Slide
 */
function addTitleSlide(pres) {
  const slide = pres.addSlide();
  
  // Background gradient
  slide.background = { color: COLORS.light };
  
  // Hero title
  slide.addText('Empowering Tech Founders\\nTo Go Further', {
    x: 1.5,
    y: 1.5,
    w: 7,
    h: 2,
    align: 'center',
    valign: 'middle',
    ...getTextStyle('hero'),
    breakLine: true
  });
  
  // Subtitle
  slide.addText('StartupLab Partner Presentation', {
    x: 1.5,
    y: 3.8,
    w: 7,
    h: 0.5,
    align: 'center',
    ...getTextStyle('subheading')
  });
  
  // Brand mark (large SL)
  slide.addText('SL', {
    x: 7.5,
    y: 0.3,
    w: 2,
    h: 1.5,
    fontSize: 120,
    fontFace: FONTS.primary,
    bold: true,
    color: COLORS.primary + '20' // 20% opacity
  });
}

/**
 * 2. Section Divider
 */
function addSectionDivider(pres, number = '01', title = 'Partnership Overview') {
  const slide = pres.addSlide();
  
  // Dark background
  slide.background = { color: COLORS.dark };
  
  // Large number
  slide.addText(number, {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 1.5,
    align: 'center',
    fontSize: 72,
    fontFace: FONTS.primary,
    bold: true,
    color: COLORS.primary + '30' // 30% opacity
  });
  
  // Section title
  slide.addText(title, {
    x: 1,
    y: 2.2,
    w: 8,
    h: 1,
    align: 'center',
    fontSize: 48,
    fontFace: FONTS.primary,
    bold: true,
    color: COLORS.white
  });
  
  // Accent line
  slide.addShape(pres.ShapeType.rect, {
    x: 4.2,
    y: 3.5,
    w: 1.6,
    h: 0.05,
    fill: { color: COLORS.primary }
  });
}

/**
 * 3. Two-Column Content
 */
function addTwoColumnSlide(pres) {
  const slide = pres.addSlide();
  
  // Left column - text
  slide.addText('Building Norway\'s Next Unicorns', {
    x: 0.5,
    y: 0.8,
    w: 4.5,
    h: 0.8,
    ...getTextStyle('section')
  });
  
  slide.addText('StartupLab has been at the forefront of Norwegian tech entrepreneurship since 2012, supporting over 100 startups that have collectively raised more than €500M in funding.', {
    x: 0.5,
    y: 1.8,
    w: 4.5,
    h: 0.8,
    ...getTextStyle('body'),
    lineSpacing: 24
  });
  
  slide.addText('Our unique combination of capital, community, and expertise creates an ecosystem where ambitious founders can scale globally from day one.', {
    x: 0.5,
    y: 2.7,
    w: 4.5,
    h: 0.8,
    ...getTextStyle('body'),
    lineSpacing: 24
  });
  
  // Bullet points
  const bullets = [
    '€50M+ under management',
    '100+ portfolio companies', 
    '7 industry-focused programs'
  ];
  
  bullets.forEach((bullet, index) => {
    // Bullet dot
    slide.addShape(pres.ShapeType.ellipse, {
      x: 0.5,
      y: 3.8 + (index * 0.3),
      w: 0.1,
      h: 0.1,
      fill: { color: COLORS.primary }
    });
    
    // Bullet text
    slide.addText(bullet, {
      x: 0.75,
      y: 3.75 + (index * 0.3),
      w: 4,
      h: 0.2,
      ...getTextStyle('body')
    });
  });
  
  // Right column - placeholder
  slide.addShape(pres.ShapeType.rect, {
    x: 5.5,
    y: 0.8,
    w: 4,
    h: 3.5,
    fill: { color: COLORS.light },
    line: { width: 0 },
    rectRadius: 0.2
  });
  
  slide.addText('Visual Content', {
    x: 5.5,
    y: 2.3,
    w: 4,
    h: 0.4,
    align: 'center',
    valign: 'middle',
    ...getTextStyle('caption')
  });
}

/**
 * 4. KPI Tiles (3x2 grid)
 */
function addKPISlide(pres) {
  const slide = pres.addSlide();
  
  // Light background
  slide.background = { color: COLORS.light };
  
  // Section heading
  slide.addText('Impact & Results', {
    x: 1,
    y: 0.5,
    w: 8,
    h: 0.6,
    align: 'center',
    ...getTextStyle('section')
  });
  
  // KPI data
  const kpis = [
    { number: '€500M+', label: 'Total Funding Raised' },
    { number: '100+', label: 'Portfolio Companies' },
    { number: '85%', label: 'Survival Rate' },
    { number: '2,500+', label: 'Jobs Created' },
    { number: '7', label: 'Industry Programs' },
    { number: '12', label: 'Years of Impact' }
  ];
  
  // 3x2 grid layout
  const cols = 3;
  const tileWidth = 2.8;
  const tileHeight = 1.3;
  const startX = 0.8;
  const startY = 1.5;
  const gapX = 0.4;
  const gapY = 0.3;
  
  kpis.forEach((kpi, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const x = startX + col * (tileWidth + gapX);
    const y = startY + row * (tileHeight + gapY);
    
    // KPI tile background
    slide.addShape(pres.ShapeType.rect, {
      x: x,
      y: y,
      w: tileWidth,
      h: tileHeight,
      fill: { color: COLORS.white },
      line: { width: 0 },
      rectRadius: 0.2,
      shadow: {
        type: 'outer',
        blur: 10,
        offset: 3,
        angle: 45,
        color: '00000015'
      }
    });
    
    // KPI number
    slide.addText(kpi.number, {
      x: x,
      y: y + 0.2,
      w: tileWidth,
      h: 0.6,
      align: 'center',
      fontSize: 36,
      fontFace: FONTS.primary,
      bold: true,
      color: COLORS.primary
    });
    
    // KPI label
    slide.addText(kpi.label, {
      x: x,
      y: y + 0.8,
      w: tileWidth,
      h: 0.3,
      align: 'center',
      ...getTextStyle('body')
    });
  });
}

/**
 * 5. Startup Cards Grid (2x2)
 */
function addStartupGrid(pres) {
  const slide = pres.addSlide();
  
  slide.addText('Portfolio Highlights', {
    x: 1,
    y: 0.4,
    w: 8,
    h: 0.6,
    align: 'center',
    ...getTextStyle('section')
  });
  
  const startups = [
    { name: 'TechCo', desc: 'AI-powered logistics platform', meta: 'Series B • €25M' },
    { name: 'HealthTech', desc: 'Digital health diagnostics', meta: 'Series A • €12M' },
    { name: 'FinSolutions', desc: 'Next-gen payment infrastructure', meta: 'Series C • €45M' },
    { name: 'GreenEnergy', desc: 'Renewable energy optimization', meta: 'Series A • €18M' }
  ];
  
  const cardWidth = 4;
  const cardHeight = 1.8;
  const startX = 1;
  const startY = 1.3;
  const gapX = 0.5;
  const gapY = 0.4;
  
  startups.forEach((startup, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);
    
    // Card background
    slide.addShape(pres.ShapeType.rect, {
      x: x,
      y: y,
      w: cardWidth,
      h: cardHeight,
      fill: { color: COLORS.white },
      line: { color: COLORS.border, width: 1 },
      rectRadius: 0.2
    });
    
    // Company logo placeholder
    slide.addShape(pres.ShapeType.rect, {
      x: x + 0.2,
      y: y + 0.15,
      w: 0.8,
      h: 0.5,
      fill: { color: COLORS.light },
      line: { width: 0 },
      rectRadius: 0.1
    });
    
    slide.addText('Logo', {
      x: x + 0.2,
      y: y + 0.3,
      w: 0.8,
      h: 0.2,
      align: 'center',
      fontSize: 10,
      color: COLORS.muted
    });
    
    // Company name
    slide.addText(startup.name, {
      x: x + 1.2,
      y: y + 0.15,
      w: 2.6,
      h: 0.4,
      ...getTextStyle('heading'),
      fontSize: 22
    });
    
    // Description
    slide.addText(startup.desc, {
      x: x + 1.2,
      y: y + 0.55,
      w: 2.6,
      h: 0.4,
      ...getTextStyle('body'),
      fontSize: 16
    });
    
    // Meta info
    slide.addText(startup.meta, {
      x: x + 1.2,
      y: y + 1.0,
      w: 2.6,
      h: 0.3,
      fontSize: 14,
      fontFace: FONTS.primary,
      color: COLORS.primary,
      bold: true
    });
  });
}

/**
 * 6. Quote Slide
 */
function addQuoteSlide(pres) {
  const slide = pres.addSlide();
  
  // Dark background
  slide.background = { color: COLORS.dark };
  
  // Large quote mark
  slide.addText('"', {
    x: 1,
    y: 0.5,
    w: 1.5,
    h: 1.5,
    fontSize: 120,
    fontFace: FONTS.primary,
    bold: true,
    color: COLORS.primary + '30'
  });
  
  // Quote text
  slide.addText('StartupLab didn\'t just provide funding – they gave us access to a network that transformed our trajectory. Their hands-on approach and industry expertise were instrumental in our international expansion.', {
    x: 1.5,
    y: 1.5,
    w: 7,
    h: 2.2,
    align: 'center',
    valign: 'middle',
    fontSize: 24,
    fontFace: FONTS.primary,
    color: COLORS.white,
    lineSpacing: 32
  });
  
  // Author name
  slide.addText('Sarah Chen', {
    x: 1.5,
    y: 4,
    w: 7,
    h: 0.3,
    align: 'center',
    fontSize: 18,
    fontFace: FONTS.primary,
    bold: true,
    color: COLORS.primary
  });
  
  // Author title
  slide.addText('CEO & Founder, TechCo', {
    x: 1.5,
    y: 4.4,
    w: 7,
    h: 0.3,
    align: 'center',
    ...getTextStyle('caption'),
    color: COLORS.muted
  });
}

/**
 * 7. Timeline/Roadmap
 */
function addTimelineSlide(pres) {
  const slide = pres.addSlide();
  
  slide.addText('Partnership Journey', {
    x: 1,
    y: 0.4,
    w: 8,
    h: 0.6,
    align: 'center',
    ...getTextStyle('section')
  });
  
  const timeline = [
    { period: 'Q1 2026', desc: 'Initial partnership agreement and onboarding' },
    { period: 'Q2 2026', desc: 'First joint initiatives and startup introductions' },
    { period: 'Q3 2026', desc: 'Pilot programs and co-innovation projects' },
    { period: 'Q4 2026', desc: 'Scale successful initiatives and measure impact' }
  ];
  
  // Central timeline line
  slide.addShape(pres.ShapeType.line, {
    x: 5,
    y: 1.5,
    w: 0,
    h: 3,
    line: { color: COLORS.border, width: 2 }
  });
  
  timeline.forEach((item, index) => {
    const y = 1.5 + index * 0.8;
    const isLeft = index % 2 === 0;
    const textX = isLeft ? 0.5 : 5.5;
    const dotX = 4.9;
    
    // Timeline dot
    slide.addShape(pres.ShapeType.ellipse, {
      x: dotX,
      y: y - 0.08,
      w: 0.16,
      h: 0.16,
      fill: { color: COLORS.white },
      line: { color: COLORS.primary, width: 3 }
    });
    
    // Period
    slide.addText(item.period, {
      x: textX,
      y: y - 0.2,
      w: 4,
      h: 0.3,
      align: isLeft ? 'right' : 'left',
      fontSize: 20,
      fontFace: FONTS.primary,
      bold: true,
      color: COLORS.primary
    });
    
    // Description
    slide.addText(item.desc, {
      x: textX,
      y: y + 0.1,
      w: 4,
      h: 0.4,
      align: isLeft ? 'right' : 'left',
      ...getTextStyle('body'),
      fontSize: 16,
      lineSpacing: 20
    });
  });
}

/**
 * 8. Team Grid
 */
function addTeamSlide(pres) {
  const slide = pres.addSlide();
  
  slide.addText('Leadership Team', {
    x: 1,
    y: 0.4,
    w: 8,
    h: 0.6,
    align: 'center',
    ...getTextStyle('section')
  });
  
  const team = [
    { name: 'Kjetil Holmefjord', role: 'CEO & Managing Partner' },
    { name: 'Christina Wiig', role: 'Head of Corporate Partnerships' },
    { name: 'Name Here', role: 'Partner, Energy & Mobility' },
    { name: 'Name Here', role: 'Partner, FinTech & Data' }
  ];
  
  const memberWidth = 2.2;
  const startX = 0.4;
  const startY = 1.5;
  const gapX = 0.1;
  
  team.forEach((member, index) => {
    const x = startX + index * (memberWidth + gapX);
    
    // Photo placeholder
    slide.addShape(pres.ShapeType.ellipse, {
      x: x + 0.6,
      y: startY,
      w: 1,
      h: 1,
      fill: { color: COLORS.light },
      line: { color: COLORS.white, width: 3 },
      shadow: {
        type: 'outer',
        blur: 8,
        offset: 2,
        angle: 45,
        color: '00000020'
      }
    });
    
    // Name
    slide.addText(member.name, {
      x: x,
      y: startY + 1.2,
      w: memberWidth,
      h: 0.3,
      align: 'center',
      fontSize: 16,
      fontFace: FONTS.primary,
      bold: true,
      color: COLORS.dark
    });
    
    // Role
    slide.addText(member.role, {
      x: x,
      y: startY + 1.5,
      w: memberWidth,
      h: 0.4,
      align: 'center',
      ...getTextStyle('caption'),
      fontSize: 14,
      lineSpacing: 18
    });
  });
}

/**
 * 9. CTA Slide
 */
function addCTASlide(pres) {
  const slide = pres.addSlide();
  
  // Primary red background with gradient
  slide.background = { color: COLORS.primary };
  
  // Main CTA title
  slide.addText('Let\'s Build the Future Together', {
    x: 1,
    y: 1.5,
    w: 8,
    h: 1,
    align: 'center',
    valign: 'middle',
    fontSize: 48,
    fontFace: FONTS.primary,
    bold: true,
    color: COLORS.white
  });
  
  // Subtitle
  slide.addText('Join Norway\'s leading tech ecosystem', {
    x: 1,
    y: 2.5,
    w: 8,
    h: 0.5,
    align: 'center',
    fontSize: 24,
    fontFace: FONTS.primary,
    color: COLORS.white + 'E6' // 90% opacity
  });
  
  // Contact info
  const contacts = ['partnerships@startuplab.no', '+47 123 45 678', 'startuplab.no'];
  contacts.forEach((contact, index) => {
    slide.addText(contact, {
      x: 2.5 + index * 1.8,
      y: 4.5,
      w: 1.8,
      h: 0.3,
      align: 'center',
      fontSize: 14,
      fontFace: FONTS.primary,
      color: COLORS.white + 'E6'
    });
  });
}

/**
 * Generate complete presentation
 */
async function generatePresentation() {
  console.log('🚀 Generating StartupLab presentation template...');
  
  const pres = createPresentation();
  
  // Add all slides
  console.log('📝 Adding title slide...');
  addTitleSlide(pres);
  
  console.log('📝 Adding section divider...');
  addSectionDivider(pres);
  
  console.log('📝 Adding two-column content...');
  addTwoColumnSlide(pres);
  
  console.log('📝 Adding KPI tiles...');
  addKPISlide(pres);
  
  console.log('📝 Adding startup grid...');
  addStartupGrid(pres);
  
  console.log('📝 Adding quote slide...');
  addQuoteSlide(pres);
  
  console.log('📝 Adding timeline...');
  addTimelineSlide(pres);
  
  console.log('📝 Adding team slide...');
  addTeamSlide(pres);
  
  console.log('📝 Adding second section divider...');
  addSectionDivider(pres, '02', 'Next Steps');
  
  console.log('📝 Adding CTA slide...');
  addCTASlide(pres);
  
  // Save presentation
  const filename = 'startuplab-template.pptx';
  console.log(`💾 Saving presentation as ${filename}...`);
  
  try {
    await pres.writeFile({ fileName: filename });
    console.log(`✅ Successfully generated ${filename}`);
    console.log(`📊 Total slides: 10`);
    console.log(`🎨 Brand colors: Primary red (#${COLORS.primary}), Dark (#${COLORS.dark}), Light (#${COLORS.light})`);
    console.log(`📝 Typography: ${FONTS.primary} with ${FONTS.fallback} fallback`);
  } catch (error) {
    console.error('❌ Error generating presentation:', error);
    throw error;
  }
}

// Execute if called directly
if (process.argv[1] === __filename) {
  generatePresentation()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default generatePresentation;