# Global Popup System

This directory contains components for a global popup management system using Pinia for state management.

## Components

- `Popup.vue`: The base popup component that uses v-model for local state management
- `GlobalPopup.vue`: An enhanced popup component that works with the global Pinia store

## How to Use

### 1. Using the Global Popup System

The global popup system allows you to control popups from anywhere in your application without prop drilling.

#### Step 1: Define your popups in a component

```vue
<template>
  <div>
    <!-- Your component content -->
    
    <!-- Define global popups -->
    <GlobalPopup id="my-popup" title="My Popup">
      <p>This is my popup content</p>
      
      <template #footer>
        <button @click="closeMyPopup">Close</button>
      </template>
    </GlobalPopup>
  </div>
</template>

<script setup>
import GlobalPopup from '@/components/UI/GlobalPopup.vue';
import { usePopup } from '@/composables/usePopup';

// Get popup controls
const myPopup = usePopup('my-popup');

// Function to close the popup
const closeMyPopup = () => {
  myPopup.close();
};
</script>
```

#### Step 2: Control the popup from anywhere

You can open, close, or update the popup from any component:

```vue
<template>
  <button @click="openPopup">Open Popup</button>
</template>

<script setup>
import { usePopup } from '@/composables/usePopup';

// Get the same popup by ID
const myPopup = usePopup('my-popup');

const openPopup = () => {
  // You can pass props when opening
  myPopup.open({
    someData: 'This data will be available in the popup'
  });
};
</script>
```

### 2. Using the Popup Manager

You can also manage multiple popups at once:

```vue
<script setup>
import { usePopupManager } from '@/composables/usePopup';

const popupManager = usePopupManager();

// Close all open popups
const closeAllPopups = () => {
  popupManager.closeAll();
};

// Check if any popup is open
const isAnyPopupOpen = computed(() => popupManager.isAnyOpen.value);
</script>
```

### 3. Accessing Popup Props

When you open a popup with props, you can access them inside the popup:

```vue
<template>
  <GlobalPopup id="data-popup" title="Data Popup">
    <p>The data is: {{ popupProps.someData }}</p>
  </GlobalPopup>
</template>

<script setup>
import GlobalPopup from '@/components/UI/GlobalPopup.vue';
import { usePopup } from '@/composables/usePopup';

const dataPopup = usePopup('data-popup');
const { popupProps } = dataPopup;
</script>
```

## API Reference

### usePopup(popupId)

Returns an object with the following properties and methods:

- `isOpen`: Computed boolean indicating if the popup is open
- `popupProps`: Computed object containing props passed to the popup
- `open(props)`: Opens the popup with optional props
- `close()`: Closes the popup
- `updateProps(props)`: Updates the popup props

### usePopupManager()

Returns an object with the following properties and methods:

- `closeAll()`: Closes all open popups
- `isAnyOpen`: Computed boolean indicating if any popup is open

## Example

See `src/examples/PopupExample.vue` for a complete example of how to use the global popup system.

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