<template>
  <div class="image-gallery">
    <h2>Lazy Loaded Image Gallery</h2>

    <div class="gallery-controls">
      <button @click="loadAllImages" :disabled="isLoading || allImagesLoaded">
        {{ allImagesLoaded ? 'All Images Loaded' : 'Load All Images' }}
      </button>
      <div v-if="isLoading" class="loading-indicator">Loading images...</div>
    </div>

    <div class="gallery-grid">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="gallery-item"
        :class="{ loaded: image.loaded }"
      >
        <div v-if="!image.loaded" class="image-placeholder" @click="loadImage(index)">
          <div class="placeholder-icon">+</div>
          <div class="placeholder-text">Click to load</div>
        </div>
        <img
          v-else
          :src="image.src"
          :alt="image.alt"
          :class="image.className"
          @click="expandImage(index)"
        />
        <div class="image-caption">{{ image.caption }}</div>
      </div>
    </div>

    <!-- Modal for expanded image -->
    <div v-if="expandedImageIndex !== null" class="image-modal" @click="closeExpandedImage">
      <div class="modal-content">
        <img :src="images[expandedImageIndex].src" :alt="images[expandedImageIndex].alt" />
        <div class="modal-caption">{{ images[expandedImageIndex].caption }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue';
import { lazyLoadImage } from '@/utils/lazyLoader';

export default defineComponent({
  name: 'LazyImageGallery',

  setup() {
    // Gallery images data
    const images = reactive([
      {
        src: '',
        originalSrc: '/images/gallery/image1.jpg',
        alt: 'Mountain landscape',
        caption: 'Beautiful mountain view',
        className: 'landscape-image',
        loaded: false
      },
      {
        src: '',
        originalSrc: '/images/gallery/image2.jpg',
        alt: 'Ocean sunset',
        caption: 'Sunset over the ocean',
        className: 'landscape-image',
        loaded: false
      },
      {
        src: '',
        originalSrc: '/images/gallery/image3.jpg',
        alt: 'Forest path',
        caption: 'Path through the forest',
        className: 'portrait-image',
        loaded: false
      },
      {
        src: '',
        originalSrc: '/images/gallery/image4.jpg',
        alt: 'City skyline',
        caption: 'Urban skyline at night',
        className: 'landscape-image',
        loaded: false
      },
      {
        src: '',
        originalSrc: '/images/gallery/image5.jpg',
        alt: 'Desert landscape',
        caption: 'Desert sand dunes',
        className: 'landscape-image',
        loaded: false
      },
      {
        src: '',
        originalSrc: '/images/gallery/image6.jpg',
        alt: 'Waterfall',
        caption: 'Majestic waterfall',
        className: 'portrait-image',
        loaded: false
      }
    ]);

    const isLoading = ref(false);
    const expandedImageIndex = ref(null);

    // Load a single image
    const loadImage = async (index) => {
      if (images[index].loaded) return;

      isLoading.value = true;

      try {
        // Use lazyLoadImage utility to load the image
        await lazyLoadImage(images[index].originalSrc, {
          alt: images[index].alt,
          className: images[index].className,
          onLoad: () => {
            console.log(`Image ${index + 1} loaded successfully`);
          },
          onError: (error) => {
            console.error(`Failed to load image ${index + 1}:`, error);
          }
        });

        // Update the image data when loaded
        images[index].src = images[index].originalSrc;
        images[index].loaded = true;
      } catch (error) {
        console.error(`Error loading image ${index + 1}:`, error);
      } finally {
        isLoading.value = false;
      }
    };

    // Load all images in sequence
    const loadAllImages = async () => {
      if (isLoading.value) return;

      isLoading.value = true;

      // Load images one by one
      for (let i = 0; i < images.length; i++) {
        if (!images[i].loaded) {
          try {
            await lazyLoadImage(images[i].originalSrc, {
              alt: images[i].alt,
              className: images[i].className
            });

            images[i].src = images[i].originalSrc;
            images[i].loaded = true;
          } catch (error) {
            console.error(`Error loading image ${i + 1}:`, error);
          }
        }
      }

      isLoading.value = false;
    };

    // Expand image in modal
    const expandImage = (index) => {
      expandedImageIndex.value = index;
    };

    // Close expanded image
    const closeExpandedImage = () => {
      expandedImageIndex.value = null;
    };

    // Check if all images are loaded
    const allImagesLoaded = computed(() => {
      return images.every((image) => image.loaded);
    });

    return {
      images,
      isLoading,
      expandedImageIndex,
      loadImage,
      loadAllImages,
      expandImage,
      closeExpandedImage,
      allImagesLoaded
    };
  }
});
</script>

<style scoped>
.image-gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.gallery-controls {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.gallery-controls button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.gallery-controls button:hover {
  background-color: #2980b9;
}

.gallery-controls button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.loading-indicator {
  margin-left: 15px;
  color: #7f8c8d;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.gallery-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  cursor: pointer;
}

.image-placeholder {
  width: 100%;
  height: 250px;
  background-color: #ecf0f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.placeholder-icon {
  font-size: 40px;
  color: #95a5a6;
}

.placeholder-text {
  margin-top: 10px;
  color: #7f8c8d;
}

.image-caption {
  padding: 10px;
  background-color: #f9f9f9;
  text-align: center;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  position: relative;
}

.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 4px;
}

.modal-caption {
  color: white;
  text-align: center;
  margin-top: 15px;
  font-size: 18px;
}

.landscape-image {
  object-position: center;
}

.portrait-image {
  object-position: top;
}
</style>
