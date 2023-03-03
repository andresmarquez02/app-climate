<script setup>
import moment from 'moment';
import { computed } from 'vue';

const props = defineProps(['weatherForecast'])

// Funcion para sacar un calculo de todas las previsiones que la api trae de los dias y asi obtener
// cuanto va a ser la media de la temperatura del dia 
const foreacastItems = computed(() => {
    // Verificacion de la variable para que no diera error sis esta vacia
    if (props.weatherForecast) {
        // Le paso el dia de hoy para que no de error
        let date = moment(props.weatherForecast.list[0].dt_txt).format("LL");
        // Variables para almacenar la tempratura minima y maxima y las veces que se hace la prevision 
        // Climatica
        let minTemp = 0,
            maxTemp = 0,
            tempExecution = 0;
        let itemsForecast = [];
        // Recorro la vrable para asignarle valores a la variable itemForecast
        props.weatherForecast.list.forEach(item => {
            // Que itemsForecast sea < 3 porque solo quiero la prevision de 3 dias
            if (itemsForecast.length < 3) {
                // Comparo si es diferente para hacer las asignaciones a la variable
                if (moment(item.dt_txt).format("LL") != date) {
                    // Aqui ya tengo una suma de todas las previsiones y lo que hago es dividirlas
                    itemsForecast.push({
                        temp_min: parseFloat((minTemp / tempExecution).toFixed(1)),
                        temp_max: parseFloat((maxTemp / tempExecution).toFixed(1)),
                        date: date,
                    });
                    // Reinicio todas las variables
                    date = moment(item.dt_txt).format("LL");
                    minTemp = 0;
                    maxTemp = 0;
                    tempExecution = 0;
                }
                // Si los valores de estas dos variables son iguales sumo a temperatura minima y maxima y 
                // le sumo 1 a las previsiones por dia
                if (moment(item.dt_txt).format("LL") == date) {
                    minTemp += item.main.temp_min;
                    maxTemp += item.main.temp_max;
                    tempExecution += 1;
                }
            }
        });
        return itemsForecast;
    }
});
</script>
<template>
    <li class="flex justify-between w-full px-4 py-2 rounded-t-lg" v-for="forecast in foreacastItems">
        <div>{{ forecast.date }}</div>
        <div>{{ forecast.temp_min }}° / {{ forecast.temp_max }}°</div>
    </li>
</template>