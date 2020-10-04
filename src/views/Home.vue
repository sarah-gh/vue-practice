<template>
<div class="home">
    <h1 class="mb-2">{{ title }}</h1>
    <FontAwesomeIcon icon="plus" class=" mr-2" /> Add Appointment
    <hr>
    <div v-for="(item, i ) in appointments" :key="i">
        <h3> {{ appointments[i].petName }}</h3>
        <p> {{ item.aptNotes }}</p>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import axios from "axios";
export default {
    name: "Home",
    data() {
        return {
            title: "Appointment List",
            appointments: []
        }
    },
    components: {
        FontAwesomeIcon,
    },
    mounted() {
        axios.get("./data/appointments.json")
        .then(Response => (this.appointments = Response.data ))
    },
};
</script>
