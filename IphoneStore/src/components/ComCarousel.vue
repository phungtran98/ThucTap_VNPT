<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
      >
      <img slot="img" class="d-block img-fluid w-100 slider-header" width="1024" height="480"
             src="../assets/img/b4.jpg" alt="image slot">
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide >
        <img slot="img" class="d-block img-fluid w-100 slider-header" width="1024" height="480"
             src="../assets/img/b3.png" alt="image slot">
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide >
           <img slot="img" class="d-block img-fluid w-100 slider-header" width="1024" height="480"
             src="../assets/img/products/i1.png" alt="image slot">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>
<style>
.slider-header{
  height: 400px;
}
</style>
<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
       
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }

  
</script>