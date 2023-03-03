<script setup>

import { onMounted, ref } from 'vue';

// Importacion de los componentes
import LisWeatherForecastComponent from './ListWeatherForecastComponent.vue'
import AlertProcessClimate from './AlertProcessClimate.vue'
import ImgCardClimateComponent from './ImgCardClimateComponent.vue'
import DivColorCardComponent from './DivColorCardComponent.vue'
import SkeletonClimateComponent from './SkeletonClimateComponent.vue'

// Variable que controla la ubicacion que viene por el input
const location = ref("");
// Variable en la que obtengo la informacion del clima de la ciudad
const locationClimate = ref("");
// Variable para obeteener toda la informacion de la prevision climatica de los dias sguientes
const weatherForecast = ref("");
// Variable para obtener las coordenadas del usuario
const coords = ref({});
// Variable de procesos
const process = ref("searching");

// Funcion para obtencion del clima
const getClimate = async (e, type = "weather") => {
    process.value = 'searching';
    // Existe un type para asi saber cuando hacer una consulta  a la api de una ciudad y despoues saber 
    // la prevision del clima durante los siguientes dias
    const peticion = await fetch(`${import.meta.env.VITE_OPENWEATHER_URL_BASE}/${type}?q=${location.value}&lat=${coords.value.lat}&lon=${coords.value.long}&units=metric&APPID=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
    const response = await peticion.json();

    if (type == "weather") {
        locationClimate.value = response;
        getClimate("", "forecast");
    } else {
        weatherForecast.value = response;
        location.value = "";
        coords.value = {
            lat: "",
            long: "",
        };
        process.value = '';
    }
}
// Obtencion y asignacion de las coordenadas a las variables
const showPosition = (position) => {
    coords.value = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
    };
    getClimate();
}

// Si no hay acceso de la ubicacion entonces le asignamos una ciudad para que lo busque
const errors = (err) => {
    location.value = "Caracas";
    getClimate();
}

// Funcion para disparar la ubicacion y despues asignarla a varables
const getLocation = () => {
    navigator.geolocation.getCurrentPosition(showPosition, errors);
}

onMounted(() => {
    getLocation();
})

</script>
<template>
    <div class="flex items-center justify-center min-h-screen bg-slate-200">
        <div>
            <div class="mb-5">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span class="w-5 h-5 text-gray-500 dark:text-gray-400">
                            <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                    </div>

                    <input type="text" id="email-address-icon"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:shadow-md focus-visible:outline-none block w-full pl-10 p-2.5"
                        placeholder="Search..." required v-model="location" @keyup.enter="getClimate">
                </div>
                <p class="mt-1 text-sm text-gray-400">Press Enter for search</p>
            </div>
            <DivColorCardComponent :locationClimate="locationClimate">
                <template v-if="locationClimate !== '' && process == ''">
                    <div class="flex justify-between">
                        <h5 class="mb-2 text-base font-semibold tracking-tight text-white dark:text-white"
                            @click="getLocation">
                            <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </h5>
                        <h5 class="mb-2 text-base font-semibold tracking-tight text-white dark:text-white">{{
                            locationClimate.name }}</h5>
                        <a href="https://andresmarquez02.github.io/"
                            class="mb-2 text-base font-semibold tracking-tight text-white dark:text-white">
                            <font-awesome-icon icon="fa-brands fa-github" />
                        </a>
                    </div>
                    <div class="flex justify-center my-5">
                        <ImgCardClimateComponent :locationClimate="locationClimate" />
                    </div>
                    <div class="flex justify-center my-5">
                        <h1 class="inline ml-3 text-3xl font-bold text-white">{{ locationClimate.main.temp }}°</h1>
                        <span class="flex self-end ml-2 text-sm text-white align-bottom"
                            v-for="weather in locationClimate.weather">{{ weather.main
                            }}</span>
                    </div>
                    <ul class="w-full text-sm font-medium text-white rounded-lg">
                        <LisWeatherForecastComponent :weatherForecast="weatherForecast" />
                    </ul>
                    <div class="flex justify-end mt-3">
                        <a href="https://andresmarquez02.github.io/"
                            class="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 shadow">
                            <font-awesome-icon icon="fa-brands fa-github" />
                            Github
                        </a>
                    </div>
                </template>
                <div v-if="process == 'searching'">
                    <SkeletonClimateComponent/>
                </div>
            </DivColorCardComponent>
            <AlertProcessClimate :process="process" />
    </div>
</div></template>