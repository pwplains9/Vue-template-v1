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
- **SEO Optimization** with meta tag management

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

# Generate Script

This script helps you quickly create components and pages with the proper structure.

## Usage

### Generate a component

```bash
npm run generate:component MyComponent
```

This will create:
- `src/components/MyComponent/`
- `src/components/MyComponent/MyComponent.vue`
- `src/components/MyComponent/index.scss`

### Generate a page

```bash
npm run generate:page PageName
```

This will create:
- `src/pages/PageName/`
- `src/pages/PageName/PageName.vue`
- `src/pages/PageName/index.scss`

### Generic generate command

```bash
npm run generate <type> <name>
```

Where:
- `<type>` is either "component" or "page"
- `<name>` is the name of your component or page 

## Project Structure

```
src/
├── assets/          # Static assets like images and icons
├── components/      # Reusable Vue components
│   ├── UI/          # UI components (buttons, popups, SvgIcon, etc.)
│   └── Header/      # Header components
├── composables/     # Reusable composition functions
│   └── usePopup.js  # Popup management composable
├── icons/           # SVG icons
├── layouts/         # Layout components
├── pages/           # Page components
│   ├── Home/        # Home page
│   └── Article/     # Article page
├── services/        # API services and external integrations
├── stores/          # Pinia stores for state management
├── styles/          # Global styles, variables, and mixins
├── utils/           # Utility functions
│   ├── helpers.js           # General helper functions
│   ├── lazyLoader.js        # Lazy loading utilities
│   ├── performanceMonitor.js # Performance monitoring tools
│   ├── vhFix.js             # Viewport height fix for mobile
│   └── viewportWatcher.js   # Responsive design utilities
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

Place your SVG icons in the `src/icons` directory.

#### Detailed SVG Icon Usage

The `SvgIcon` component provides a simple way to use SVG icons throughout your application.

##### Component Props

| Prop   | Type   | Default | Required | Description                             |
|--------|--------|---------|----------|-----------------------------------------|
| name   | String | -       | Yes      | The name of the icon (without prefix)   |
| prefix | String | 'icon'  | No       | The prefix used in the icon ID          |
| color  | String | '#333'  | No       | The fill color of the icon              |

##### Adding New Icons

1. Place your SVG files in the `src/icons` directory
2. The filename will be used as the icon name (e.g., `menu.svg` would be used as `<SvgIcon name="menu" />`)
3. Icons are automatically registered at build time

##### Examples

Basic usage:
```vue
<SvgIcon name="menu" />
```

With custom color:
```vue
<SvgIcon name="arrow-down" color="#FF5500" />
```

With custom prefix:
```vue
<SvgIcon name="close" prefix="my-icon" />
```

##### Styling SVG Icons

You can style the SVG icon using CSS:

```vue
<template>
  <SvgIcon name="menu" class="my-icon" />
</template>

<style scoped>
.my-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.my-icon:hover {
  transform: scale(1.2);
}
</style>
```

### Global Popup System

The template includes a powerful popup management system:

```vue
<template>
  <!-- Define the popup -->
  <BasePopup id="my-popup" title="My Popup">
    <p>This is my popup content</p>
    
    <template #footer>
      <button @click="closePopup">Close</button>
    </template>
  </BasePopup>
  
  <!-- Button to open the popup -->
  <button @click="openPopup">Open Popup</button>
</template>

<script setup>
import BasePopup from '@/components/UI/Popup.vue';
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

For managing multiple popups, you can use the `usePopupManager`:

```js
import { usePopupManager } from '@/composables/usePopup';

const popupManager = usePopupManager();

// Close all open popups
popupManager.closeAll();

// Check if any popup is open
const hasOpenPopups = popupManager.isAnyOpen;
```

### Responsive Design

The template includes viewport detection utilities:

```vue
<script setup>
import { useViewport } from '@/utils/viewportWatcher';

// Default debounce time is 250ms
const { width, height, isMobile, isTablet, isDesktop } = useViewport();

// Or with custom options
const viewport = useViewport({
  debounceTime: 200
});
</script>

<template>
  <div>
    <div v-if="isMobile">Mobile Content</div>
    <div v-else-if="isTablet">Tablet Content</div>
    <div v-else>Desktop Content</div>
  </div>
</template>
```

The viewport watcher uses the following breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px


# UI Components

## ResponsiveImage

The `ResponsiveImage` component provides an easy way to display responsive images with proper srcset support for different screen sizes and pixel densities.

### Features:
- Automatic handling of desktop (1024px) and mobile image variants
- Support for 2x pixel density (retina displays)
- Lazy loading by default
- Customizable width and height
- Accessibility-friendly with required alt text

### Image Naming Convention

For this component to work properly, your images should follow this naming convention:

- Base image: `image.jpg`
- Desktop image: `image-1024.jpg`
- Desktop retina: `image-1024@2x.jpg`
- Mobile image: `image-mobile.jpg`
- Mobile retina: `image-mobile@2x.jpg`

### Usage Example

```vue
<template>
  <div>
    <h1>Product Display</h1>
    
    <!-- Basic usage with required props -->
    <ResponsiveImage 
      src="/images/product.jpg"
      alt="Product description"
    />
    
    <!-- Advanced usage with all props -->
    <ResponsiveImage 
      src="/images/product.jpg"
      alt="Product description"
      :width="600"
      :height="400"
      :lazy="true"
      imgClass="product-image rounded"
    />
  </div>
</template>

<script setup>
import ResponsiveImage from '@/components/UI/ResponsiveImage.vue';
</script>
```

### Props

| Prop      | Type             | Default | Required | Description                                       |
|-----------|------------------|---------|----------|---------------------------------------------------|
| src       | String           | -       | Yes      | Base image source URL                             |
| alt       | String           | -       | Yes      | Alternative text for accessibility                |
| width     | Number or String | 'auto'  | No       | Image width (number for px, string for CSS value) |
| height    | Number or String | 'auto'  | No       | Image height (number for px, string for CSS value)|
| lazy      | Boolean          | true    | No       | Whether to use lazy loading                       |
| imgClass  | String           | ''      | No       | Optional CSS class to apply to img element        |

## Performance Monitoring

The template includes performance monitoring tools in development mode:

```vue
<template>
  <!-- Add performance monitoring to components -->
  <div v-perf="'my-component'">
    <!-- Component content -->
  </div>
</template>
```

The performance monitor provides:
- Resource loading tracking
- Memory usage monitoring
- Navigation performance metrics
- Component render time tracking

These tools are automatically enabled in development mode and can be accessed in the browser console.

## SEO Optimization

The template includes SEO optimization with meta tag management:

```js
// In route configuration
{
  path: '/article/',
  name: 'Article',
  component: Article,
  meta: {
    title: 'Article Title',
    description: 'Article Description',
    keyWords: 'article, keywords'
  }
}
```

The router automatically updates the document title and meta tags based on the route meta information.

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

## License

[MIT](LICENSE)
