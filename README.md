# Vue 3 Template

A modern Vue 3 template built with Vite, featuring a comprehensive set of tools and best practices for efficient Vue development.

## Features

- **Vue 3** with Composition API and `<script setup>` syntax
- **Vite** for lightning-fast development and optimized builds
- **Pinia** for state management
- **Vue Router** for navigation
- **SCSS** with global variables and mixins
- **ESLint & StyleLint** for code quality
- **Prettier** for consistent code formatting
- **SVG Icon System** for optimized icon usage
- **Responsive Design** utilities with viewport detection
- **Global Popup System** for managing modals and popups
- **Performance Monitoring** tools for development

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd Vue-template-v1

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the development server
npm run start
# or
yarn start
```

This will start the development server at `http://localhost:3000`.

### Building for Production

```bash
# Build for production
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
# Preview the production build
npm run preview
# or
yarn preview
```

## Available Commands

This template includes several npm scripts to help with development, building, and code quality:

### Development Commands

```bash
# Start the development server
npm run start
# or
yarn start
```

This starts the Vite development server with hot module replacement.

### Build Commands

```bash
# Build for production
npm run build
# or
yarn build
```

This builds the application for production, with optimizations for performance.

```bash
# Preview the production build
npm run preview
# or
yarn preview
```

This serves the production build locally for preview.

### Linting and Formatting Commands

```bash
# Run ESLint on JavaScript and Vue files
npm run lint:js
# or
yarn lint:js
```

This checks and fixes JavaScript and Vue files according to the ESLint configuration.

```bash
# Run StyleLint on CSS and SCSS files
npm run lint:styles
# or
yarn lint:styles
```

This checks and fixes CSS and SCSS files according to the StyleLint configuration.

```bash
# Run Prettier on all supported files
npm run lint:prettier
# or
yarn lint:prettier
```

This formats JavaScript, SCSS, and Vue files using Prettier.

```bash
# Run all linters and formatters
npm run lint
# or
yarn lint
```

This runs the `lint.js` script which executes all linting and formatting tools in sequence.

## Project Structure

```
src/
├── assets/          # Static assets like images and icons
├── components/      # Reusable Vue components
│   ├── UI/          # UI components (buttons, popups, etc.)
│   └── Header/      # Header components
├── composables/     # Reusable composition functions
├── icons/           # SVG icons
├── pages/           # Page components
│   ├── Home/        # Home page
│   └── Article/     # Article page
├── stores/          # Pinia stores for state management
├── styles/          # Global styles, variables, and mixins
├── utils/           # Utility functions
├── App.vue          # Root component
├── main.js          # Application entry point
└── TransitionView.vue # Page transition component
```

## Using the Components

### SVG Icons

The template includes an SVG icon system using `vite-plugin-svg-icons`:

```vue
<template>
  <SvgIcon name="icon-name" />
</template>

<script setup>
import SvgIcon from '@/components/UI/SvgIcon.vue';
</script>
```

Place your SVG icons in the `src/assets/icons` directory.

### Global Popup System

The template includes a powerful popup management system:

```vue
<template>
  <!-- Define the popup -->
  <GlobalPopup id="my-popup" title="My Popup">
    <p>This is my popup content</p>
    
    <template #footer>
      <button @click="closePopup">Close</button>
    </template>
  </GlobalPopup>
  
  <!-- Button to open the popup -->
  <button @click="openPopup">Open Popup</button>
</template>

<script setup>
import GlobalPopup from '@/components/UI/GlobalPopup.vue';
import { usePopup } from '@/composables/usePopup';

const myPopup = usePopup('my-popup');

const openPopup = () => {
  myPopup.open({
    // Optional props to pass to the popup
    someData: 'Hello World'
  });
};

const closePopup = () => {
  myPopup.close();
};
</script>
```

### Responsive Design

The template includes viewport detection utilities:

```vue
<script setup>
import { useViewport } from '@/utils/viewportWatcher';

const { width, height, isMobile, isTablet, isDesktop } = useViewport();
</script>

<template>
  <div>
    <div v-if="isMobile">Mobile Content</div>
    <div v-else-if="isTablet">Tablet Content</div>
    <div v-else>Desktop Content</div>
  </div>
</template>
```

## Linting and Formatting

This project includes linting and formatting tools:

### ESLint for JavaScript and Vue
- Configured for Vue 3 with recommended rules
- Run `npm run lint:js` to check and fix JavaScript and Vue files

### StyleLint for CSS/SCSS
- Configured for SCSS with standard rules
- Run `npm run lint:styles` to check and fix style issues

### Prettier
- Run `npm run lint:prettier` to format all files

### Fast Fix Commands
- Run `npm run lint` to run all linters and formatters at once
- For SCSS indentation issues, run `node fix-scss-indentation.js`

### VS Code Integration
- Auto-fixing is enabled on save in VS Code
- Make sure to install the recommended extensions:
  - ESLint
  - Stylelint
  - Prettier
  - Volar (Vue Language Features)

## Setup Linting

If you need to set up linting in a new project, run:

```bash
node setup-linting.js
```

This will install all necessary dependencies and verify the configuration files.

## Performance Optimization

The template includes performance monitoring tools in development mode:

```vue
<template>
  <!-- Add performance monitoring to components -->
  <div v-perf="'my-component'">
    <!-- Component content -->
  </div>
</template>
```

## License

[MIT](LICENSE)
