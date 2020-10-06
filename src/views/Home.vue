<template>
<div class="home container">
    <div class=" row justify-content-center">
        <add-appointment @add="addItem" />
        <AppointmentsList :appointments="appointments" @remove="removeItem" @edit="editItem" />
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import AppointmentsList from "../components/AppointmentsList";
import AddAppointment from "../components/AddAppointment";

import _ from "lodash";
import axios from "axios";
export default {
    name: "Home",
    data() {
        return {
            title: "Appointment List",
            appointments: [],
            aptIndex: 0,
        }
    },
    components: {
        AppointmentsList,
        AddAppointment
    },
    mounted() {
        axios.get("./data/appointments.json")
            .then(Response => (this.appointments = Response.data.map(item => {
                item.aptId = this.aptIndex;
                this.aptIndex++;
                return item
            })));
    },
    methods: {
        addItem(apt) {
            apt.aptId = this.aptIndex;
            this.aptIndex++;
            this.appointments.push(apt);
        },
        removeItem(apt) {
            this.appointments = _.without(this.appointments, apt)
        },
        editItem(id, field, text) {
            const aptIndex = _.findIndex(this.appointments, {
                aptId: id
            });
            this.appointments[aptIndex][field] = text;
        }
    }
};
</script>
