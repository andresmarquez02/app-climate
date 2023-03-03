<script setup>

import { computed } from 'vue';

const props = defineProps(["locationClimate", "process"]);

// Computed para saber que color va a asignar a la card
const colorCard = computed(() => {
    if (props.locationClimate) {
        switch (props.locationClimate.weather[0].main) {
            case "Sun":
                return "from-yellow-300 to-yellow-400";
            case "Clear":
                return "from-sky-300 to-blue-400";
            case "Clouds":
                return "from-orange-300 to-orange-400";
            case "Snow":
                return "from-indigo-300 to-indigo-400";
            case "Wind":
                return "from-green-300 to-green-400";
            case "Extreme":
                return "from-violet-600 to-violet-800";
            case "Rain":
                return "from-indigo-400 to-indigo-500";
            case "Storm":
                return "from-purple-400 to-purple-600";
            case "Drizzle":
                return "from-sky-300 to-blue-400";
            default:
                return "from-sky-300 to-blue-400";
        }
    } else {
        return "from-sky-300 to-blue-400";
    }
});

</script>
<template>
    <div class="max-w-sm px-6 pt-6 pb-3 transition-all duration-300 ease-in-out rounded-lg shadow-xl w-80 shadow-slate-200 bg-gradient-to-b hover:shadow-slate-300"
        :class="colorCard">
        <slot></slot>
    </div>
</template>