# Hayzed Casual Website Design

## Overview
- **Motion Style**: Cinematic Editorial with Fluid Elegance
- **Animation Intensity**: Ultra-Dynamic
- **Technology Stack**: WebGL (Three.js/OGL), GSAP (ScrollTrigger, Flip), Lenis Smooth Scroll, CSS Houdini

## Brand Foundation
- **Colors**: 
  - Primary: #141414 (Black), #757575 (Grey)
  - Secondary: #f2f2f2 (Light Grey), #fff (White), #fafafa (Off White)
  - Accents: #e8d3b8 (Beige), #e0daca (Light Beige), #f6eedd (Cream)
- **Typography**: 
  - Display: "Playfair Display" (Serif)
  - Body: "Inter" (Sans-serif)
- **Core Message**: African Luxury, Modern Heritage, Effortless Confidence
- **Font Family**: Playfair Display (Headings), Inter (Body)

## Global Motion System

### Animation Timing
- **Easing Library**: 
  - Editorial: `cubic-bezier(0.77, 0, 0.175, 1)` (Sharp, snappy)
  - Fluid: `cubic-bezier(0.16, 1, 0.3, 1)` (Expo out for reveals)
- **Duration Scale**: Base 0.8s, Stagger 0.1s
- **Stagger Patterns**: From center-out or top-down depending on scroll direction

### Continuous Effects
- **Micro-Interactions**: Magnetic buttons, text ink-bleed effects on hover
- **Ambient Motion**: Gentle "breathing" scale (1.0 -> 1.02) on static images
- **Texture**: Subtle grain overlay (opacity 0.03) to unify editorial photography

### Scroll Engine
- **Physics**: Smooth dampening (0.1)
- **Parallax**: Multi-layer depth system (Z-index -1 to 5)
- **Velocity**: Skew effect on scroll (max 5deg) for dynamic feel

## Section 1: Navigation Bar

### Layout
**Dynamic "Glass" Header**: A floating, pill-shaped navigation bar that morphs on scroll.
- **Initial State**: Transparent, full width, absolute top.
- **Scrolled State**: Compacts into a floating glass pill (backdrop-filter: blur(10px)) centered at top.

### Content
- **Logo**: Hayzed Casual (SVG)
- **Links**: Home, Collections, About, Contact
- **Actions**: Search, Cart (Icon)

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Navbar | Slide Down | Y: -100% → 0% | 1.0s | 0.2s | Expo Out |
| Links | Fade + Slide | Y: -20px → 0 | 0.8s | 0.4s+ | Back Out |

#### Interaction Effects
- **Links**: "Underline Wipe" - A line draws from left to right on hover.
- **Cart/Search**: Magnetic pull on hover (button follows cursor within 20px radius).
- **Menu Toggle**: "Liquid Morph" - Lines fluidly transform into an 'X'.

## Section 2: Hero Section

### Layout
**Immersive Cinematic Viewport**: Full-screen experience where typography interacts with the depth of the photography.
- **Z-Space Architecture**: 
  - Layer 1 (Back): Hero Image (Scale 1.1)
  - Layer 2 (Middle): "Grain" Overlay
  - Layer 3 (Front): Typography floating with parallax

### Content
- **Headline**: "African Luxury, Modern Style"
- **Subtext**: "Exquisite kaftans for the modern gentleman."
- **CTA**: "Shop Collection"

### Images
**Hero Background**
- **Resolution:** 1920x1080
- **Aspect Ratio:** 16:9
- **Transparent Background:** No
- **Visual Style:** Editorial fashion photography
- **Subject:** Male model in dark brown traditional African kaftan with white geometric embroidery
- **Color Palette:** Earthy browns, beige, white, gold
- **Generation Prompt:** "Cinematic editorial fashion photograph of a Nigerian male model wearing a dark brown traditional kaftan with intricate white geometric embroidery, standing confidently in a minimalist studio setting, soft directional lighting casting gentle shadows, neutral earthy color palette with browns and creams, shot from low angle, shallow depth of field, sharp focus on fabric texture, professional fashion photography, luxurious and sophisticated mood, high-end menswear aesthetic, clean background, editorial style"

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Image | Zoom Out | Scale: 1.4 → 1.1 | 1.8s | 0s | Power3 Out |
| Headline | Split-Char Reveal | Y: 100% → 0% | 1.2s | 0.5s | Expo Out |
| Subtext | Fade Up | Opacity 0 → 1 | 0.8s | 0.8s | Linear |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Hero Image | Parallax Y | Top | Bottom | Y: 0 → 200px |
| Scroll | Headline | Parallax Y | Top | Bottom | Y: 0 → -100px |

#### Advanced Effects
- **WebGL Distortion**: On mouse move, a subtle "liquid displacement" ripple affects the hero image using a noise map.
- **Text Masking**: The headline text is transparent with a stroke, revealing a subtle video texture or gradient behind it (if applicable, otherwise solid white with shadow).

## Section 3: About Section

### Layout
**Asymmetric Broken Grid**: Text and image overlap significantly to create depth.
- **Composition**: Text block floats over the image edge. The image is not contained but "bleeds" off one side.
- **Whitespace**: Heavy use of negative space to isolate the content.

### Content
- **Heading**: "About Hayzed Casual"
- **Body**: "We are a Nigerian fashion brand that specializes in creating high-quality, stylish kaftans for the modern man..."
- **CTA**: "Learn More"

### Images
**About Section Image**
- **Resolution:** 1200x1600
- **Aspect Ratio:** 3:4
- **Transparent Background:** No
- **Visual Style:** Clean product photography
- **Subject:** Two traditional African kaftans hanging side by side
- **Color Palette:** Earthy browns, beiges, creams
- **Generation Prompt:** "Professional product photography of two traditional African men's kaftans hanging side by side on wooden hangers against a seamless creamy beige studio backdrop, left kaftan is solid brown with simple collar, right kaftan is cream with intricate gold and brown embroidered V-neck design, soft even lighting with minimal shadows, centered composition with negative space, earthy color palette of browns and creams, clean minimalist aesthetic, sharp focus on fabric texture, professional e-commerce photography style, neutral background, luxury fashion photography"

### Motion Choreography

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Viewport | Image | Mask Reveal | Top 80% | Top 20% | Clip-path: Inset(0 0 100% 0) → Inset(0) |
| Viewport | Text Block | Parallax Y | Top Bottom | Bottom Top | Y: 100px → -50px |

#### Interaction Effects
- **Image Hover**: "Color Grading Shift" - The image transitions from the original palette to a slightly warmer tone (saturation +10%, contrast +5%).

## Section 4: Featured Collections

### Layout
**Horizontal Velocity Scroll**: Instead of a vertical grid, this section locks the vertical scroll and translates it to horizontal movement.
- **Structure**: A horizontal track containing the product cards.
- **Card Design**: Minimalist cards where the image dominates (90% of card height).

### Content
- **Section Title**: "Featured Collections"
- **Products**: 
  1. Classic Kaftan (₦70,000.00 NGN)
  2. Wedding Kaftan (₦100,000.00 NGN)
  3. Premium Kaftan (₦85,000.00 NGN)

### Images
**Product Images**
- **Resolution:** 800x1000
- **Aspect Ratio:** 4:5
- **Transparent Background:** No
- **Visual Style:** Clean product photography
- **Subject:** Male model wearing traditional African kaftan
- **Color Palette:** Earthy browns, beiges, creams
- **Generation Prompt:** "Professional e-commerce product photography of a male model wearing a traditional African kaftan in earthy brown tones with subtle embroidery, model standing with arms relaxed at sides, neutral facial expression, soft even lighting from front, centered composition showing full garment from shoulders down, seamless light beige studio backdrop, sharp focus on fabric texture and details, natural color palette, clean minimalist aesthetic, professional fashion catalog style"

### Motion Choreography

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Section | Container | Horizontal Scroll | Top Top | Bottom Bottom | X: 0 → -100vw |

#### Interaction Effects
- **Card Hover**: 
  - **Image**: Scales up (1.0 → 1.05).
  - **Cursor**: Custom cursor becomes a "View" circle with magnetic attraction to the card center.
  - **Title**: Slides up from bottom of card frame.

## Section 5: Testimonials

### Layout
**Orbital Masonry**: Testimonial cards are arranged in a loose, organic grid that floats gently.
- **Behavior**: As the user scrolls, the columns move at different speeds (Column 1: 1.0x, Column 2: 1.2x, Column 3: 0.8x) creating a shearing effect.

### Content
- **Heading**: "What Our Clients Say"
- **Testimonials**: 6 cards (Olajide F., Chidi O., Emeka K., etc.)

### Images
**Avatar Images**
- **Resolution:** 200x200
- **Aspect Ratio:** 1:1
- **Transparent Background:** No
- **Visual Style:** Candid lifestyle photography
- **Prompt:** "Candid lifestyle portrait photography of a young Nigerian man in his late 20s with short hair and beard, wearing casual earth-toned clothing, genuine friendly smile, natural relaxed pose, soft natural lighting, blurred outdoor urban background with bokeh effect, warm color tones, shallow depth of field, authentic testimonial photography style, professional portrait quality"

### Motion Choreography
- **Entrance**: Cards do not fade in; they "flip" down from 90deg X-axis (folding into view).
- **Continuous**: Each card has a random "float" animation (sine wave, different phases) to feel alive.

## Section 6: Instagram/Lookbook

### Layout
**Infinite WebGL Ribbon**: A continuous stream of images forming a ribbon that curves in 3D space.
- **Structure**: Images are mapped onto a cylinder geometry that rotates slowly.
- **Interaction**: Drag to spin the carousel.

### Content
- **Heading**: "Follow Us @hayzedcasual"
- **Images**: 5 Instagram-style lifestyle shots.

### Images
**Instagram Images**
- **Resolution:** 600x600
- **Aspect Ratio:** 1:1
- **Transparent Background:** No
- **Visual Style:** Lifestyle editorial photography
- **Generation Prompt:** "Editorial lifestyle fashion photography of a Nigerian man wearing a traditional kaftan, standing confidently on city street, natural lighting during golden hour, urban background with soft bokeh, relaxed pose with hand in pocket, earth-toned clothing, professional street style photography, warm color grading, shallow depth of field, Instagram aesthetic, authentic and aspirational mood"

### Advanced Effects
- **WebGL Distortion**: As the ribbon spins faster (by drag), the images stretch horizontally (RGB shift + vertex displacement).
- **Hover**: Hovering an image pauses the rotation and brings that image forward (Z-axis translation).

## Section 7: Footer

### Layout
**The "Curtain" Reveal**: The footer is fixed at the bottom of the viewport with `z-index: -1`. The previous section (Instagram) has a `margin-bottom` equal to the footer height. As the user scrolls past the Instagram section, the footer is "revealed" from behind.

### Content
- **Newsletter**: "Stay Updated"
- **Links**: Home, Shop, About, etc.
- **Socials**: Icons
- **Copyright**: Hayzed Casual

### Motion Choreography
- **Reveal**: No animation needed for the footer itself; the motion comes from the *uncovering* action.
- **Links**: On hover, the text scrambles (random characters) briefly before settling back to the original text (decoding effect).

## Technical Implementation Notes

### Required Libraries
- **Core**: React / Next.js
- **Animation**: GSAP (ScrollTrigger, Flip Plugin, SplitText)
- **Smooth Scroll**: Lenis (Critical for the "premium" feel)
- **WebGL**: Three.js + React Three Fiber (for Hero & Instagram ribbons)

### Performance Optimizations
- **WebGL**: Use a shared renderer for all WebGL instances (hero, instagram).
- **Scroll**: Debounce resize events. Use `will-change: transform` only on active elements.
- **Images**: Preload hero image. Lazy load everything else with a blur-up placeholder.
- **Mobile**: Disable WebGL ribbons on mobile; fallback to CSS Scroll Snap.

### Browser Support
- **Progressive Enhancement**: If WebGL fails, fallback to standard CSS parallax.
- **Reduced Motion**: If `prefers-reduced-motion` is true, disable smooth scroll and parallax; use simple fades.
