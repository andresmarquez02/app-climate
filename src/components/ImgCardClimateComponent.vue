<script setup>
import { computed } from 'vue';

const props = defineProps(['locationClimate']);

// Compputed para saber cual es la imagen que debe agregar
const imgCard = computed(() => {
    if (props.locationClimate) {
        return props.locationClimate.weather[0].main;
    }
});
</script>
<template>
    <template v-if="imgCard == 'Sun' || imgCard == 'Clear'">
        <img src="../assets/img/sun.png" class="h-44" alt="" srcset="">
    </template>
    <template v-else-if="imgCard == 'Clouds'">
        <img src="../assets/img/clouds.png" class="h-44" alt="" srcset="">
    </template>
    <template v-else-if="imgCard == 'Snow'">
        <img src="../assets/img/snow.png" class="h-44" alt="" srcset="">
    </template>
    <template v-else-if="imgCard == 'Wind'">
        <img src="../assets/img/wind.png" class="h-44" alt="" srcset="">
    </template>
    <template v-else-if="imgCard == 'Drizzle' || imgCard == 'Rain'">
        <img src="../assets/img/rain.png" class="h-44" alt="" srcset="">
    </template>
    <template v-else-if="imgCard == 'Extreme' || imgCard == 'Storm'">
        <img src="../assets/img/storm.png" class="h-44" alt="" srcset="">
    </template>
    <template v-else>
        <img src="../assets/img/sun.png" class="h-44" alt="" srcset="">
    </template>
</template>