# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built with React 19, TypeScript, Emotion for styling, TanStack React Query for data fetching, and Zustand for state management. The app appears to be a voting and guide system with features for school-related votes and guides.

## Development Commands

### Running the Development Server

```bash
npm run dev
```

Uses Next.js with Turbopack for faster development builds. Development server runs on http://localhost:3000.

### Building for Production

```bash
npm run build
```

Creates an optimized production build with Turbopack.

### Starting Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

Runs ESLint with Next.js and TypeScript configurations.

### Code Formatting

```bash
npm run format
```

Formats code using Prettier.

### SVG Processing Script

```bash
node scripts/extract-and-convert-svg-images.js
```

Processes large SVG files containing embedded PNG data URIs, extracts the PNGs to `public/svg/images/`, and converts SVGs to TSX components. Used for handling complex SVG assets.

## Architecture & Project Structure

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
  - Main routes: `/` (home), `/vote`, `/guide`, `/revote`, `/moreGuide/[id]`
  - Search routes: `/vote/search`, `/guide/search`
- `src/components/` - Reusable React components organized by feature
  - `button/` - Button components
  - `common/` - Shared components (header, navigation bar)
  - `guide/` - Guide-specific components including vote charts and revote functionality
  - `modal/` - Modal components (AccentModal, IconTwoOptionModal, LoadingModal, TwoOptionModal)
- `src/packages/design-system/src/` - Internal design system package
- `public/svg/` - SVG assets as TSX components
- `scripts/` - Build and utility scripts

### Design System

Located in `src/packages/design-system/src/`, this internal package provides:

**Colors** (`color.ts`):

- Primary: `#FF9F1C` (orange)
- Secondary: `#58CCFF` (blue)
- Accent: `#E71D36` (red)
- Grayscale from gray50 to gray700
- White: `#FDFFFC`, Black: `#011627`

**Typography** (`font.ts`):

- Uses Pretendard font family (loaded via Google Fonts CDN in global styles)
- Display styles: D1 (700/22px), D2 (700/20px), D3 (700/15px)
- Heading styles: H1 (600/14px), H2 (600/13px), H3 (600/12px)
- Body: content (400/15px with 24px line-height)
- Caption: (400/10px)
- All fonts use the `fontGenerator` helper from `@emotion/react`

**Global Styles** (`global.tsx`):

- Box-sizing, margin/padding resets
- Custom checkbox/radio accent colors using primary color
- Input/textarea/button reset styles
- Hidden scrollbars (webkit and standard)
- Primary accent color for form controls

### Styling Approach

This project uses **Emotion** (CSS-in-JS) for all styling:

- Use `styled` from `@emotion/styled` to create styled components
- Import design tokens from `@/packages/design-system/src/color` and `@/packages/design-system/src/font`
- All pages use `'use client'` directive since Emotion requires client-side rendering
- Example pattern:
  ```tsx
  const StyledDiv = styled.div`
    color: ${color.primary};
    ${font.H1}
  `;
  ```

### SVG Asset Management

SVG icons are stored in `public/svg/` as TSX components with a consistent interface:

- Props: `{ width: string; height: string; onClick?: () => void }`
- Grouped exports in `public/svg/svg.tsx`
- Some SVGs contain embedded PNG images extracted to `public/svg/images/`
- Use the extraction script when adding new large SVGs with embedded images

### Path Aliases

TypeScript is configured with path alias `@/*` mapping to `./src/*`:

```tsx
import Component from "@/components/common/header";
import color from "@/packages/design-system/src/color";
```

### Webpack Configuration

Next.js config (`next.config.ts`) includes custom webpack setup:

- SVGR loader configured to import SVG files as React components
- Handles `.svg` files in `.jsx` and `.tsx` files

### Layout System

The app uses a max-width constraint pattern:

- Navigation bar: `max-width: 600px` centered layout
- Background color: `#fafafaff` set in root layout
- Fixed bottom navigation bar at 50px height

## Key Dependencies

- **Next.js 15.5.4** with App Router and Turbopack
- **React 19.1.0**
- **Emotion** for CSS-in-JS styling (`@emotion/react`, `@emotion/styled`)
- **TanStack React Query 5** for server state management (with devtools)
- **Zustand 5** for client state management
- **@svgr/webpack** for SVG-to-component transformation
- **TypeScript 5** with strict mode enabled
