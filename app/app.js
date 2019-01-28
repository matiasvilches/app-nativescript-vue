import Vue from "nativescript-vue"
import Mapa from "./components/Mapa.vue"
import RegistrarMedico from "./components/RegistrarMedico.vue"
import IngresarContacto from "./components/IngresarContacto.vue"

import "./app.scss"
import "nativescript-platform-css"
import "./_app-common.scss"

Vue.config.debug = true
Vue.config.silent = false
Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)

new Vue({
    template: `
        <Frame>
            <Mapa />
        </Frame>
    `,
    components: {
        Mapa,
        RegistrarMedico,
        IngresarContacto
    }
}).$start()