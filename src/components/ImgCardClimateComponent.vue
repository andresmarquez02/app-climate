<script setup>
import { computed } from 'vue';

const props = defineProps(['locationClimate']);

// Compputed para saber cual es la imagen que debe agregar
const imgCard = computed(() => {
    if (props.locationClimate) {
        switch (props.locationClimate.weather[0].main) {
            case "Sun":
                return "sun.png";
            case "Clear":
                return "sun.png";
            case "Clouds":
                return "clouds.png";
            case "Snow":
                return "snow.png";
            case "Wind":
                return "wind.png";
            case "Drizzle":
                return "rain.png";
            case "Rain":
                return "rain.png";
            case "Extreme":
                return "storm.png";
            case "Storm":
                return "storm.png";
            default:
                return "sun.png";
        }
    }
});
</script>
<template>
    <img :src="'src/assets/' + imgCard" class="h-44" alt="" srcset="">
</template>