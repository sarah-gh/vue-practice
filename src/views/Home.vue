<template>
<div class="home container justify-content-center align-items-xl-center">
    <div class="button-block flex justify-content-center align-items-xl-center">
        <button v-if="!$auth.isAuthenticated" @click="login" class="button is-xl is-dark hide align-self-center justify-content-center">Sign Up to Browse Events</button>
        <h3 v-if="$auth.isAuthenticated" class="is-size-3 welcome">Welcome, {{ $auth.user.name }}!</h3>
    </div>
    <div class="row justify-content-center align-items-xl-center">
        <add-appointment @add="addItem" />
        <search-appointment @searchRecords="SearchAppointment" :myKey="filterKay" :myDir="filterDir" @requestkey="changeKey" @requestDir="changeDir" />
        <AppointmentsList :appointments="filteredApts" @remove="removeItem" @edit="editItem" />
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import AppointmentsList from "../components/AppointmentsList";
import AddAppointment from "../components/AddAppointment";
import SearchAppointment from '@/components/SearchAppointment'
import _ from "lodash";
import axios from "axios";
export default {
    name: "Home",
    data() {
        return {
            title: "Appointment List",
            appointments: [],
            filterKay: "petName",
            filterDir: "asc",
            searchTerms: "",
            aptIndex: 0,
        }
    },
    components: {
        AppointmentsList,
        AddAppointment,
        SearchAppointment
    },
    computed: {
        searchedApts() {
            return this.appointments.filter(item => {
                return (
                    item.petName.toLowerCase().match(this.searchTerms.toLowerCase()) ||
                    item.petOwner.toLowerCase().match(this.searchTerms.toLowerCase()) ||
                    item.aptNotes.toLowerCase().match(this.searchTerms.toLowerCase())
                );
            });
        },
        filteredApts() {
            return _.orderBy(
                this.searchedApts,
                item => {
                    return item[this.filterKay].toLowerCase();
                }, this.filterDir
            );
        }
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
        changeKey(value) {
            this.filterKay = value;
        },
        changeDir(value) {
            this.filterDir = value;
        },
        SearchAppointment(terms) {
            this.searchTerms = terms;
        },
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
        },
        login() {
            this.$auth.loginWithRedirect();
        }
    }
};
</script>

<style scoped>
.button-block {
    display: flex;
}
</style>
