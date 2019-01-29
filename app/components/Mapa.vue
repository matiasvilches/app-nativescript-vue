<template>
	<Page class="page">
        <!-- Título -->
		<ActionBar title="Google Map en NativeScript Vue" class="action-bar" />

        <AbsoluteLayout class="fa">
            
            <!-- Mapa de Google -->
            <MapView 
                :latitude="currentGeoLocation.latitude" 
                :longitude="currentGeoLocation.longitude" 
                :zoom="zoom" 
                :bearing="bearing" 
                :tilt="tilt" 
                :padding="padding" 
                :minZoom="minZoom" 
                :maxZoom="maxZoom" 
                @mapReady="mapReady"
                @markerSelect="onMarkerSelect"
                width="100%" height="90%" />

            <!-- Botón menú lateral -->
            <StackLayout class="btnMenuLateral">
                <Image src="https://i.imgur.com/2aK7sqg.png" borderRadius="50%" />
            </StackLayout>

            <!-- Botón médicos y clínicas -->
            <StackLayout class="btnMedCli" @tap="medico = !medico">
                <Image src="https://i.imgur.com/U9cAGmK.png" borderRadius="50%" v-if="medico" />
                <Image src="https://i.imgur.com/ohxuf9F.png" borderRadius="50%" v-else />
            </StackLayout>

            <!-- Botón ubicarse en el mapa -->
            <StackLayout class="btnGPS" @tap="showLocation()">
                <Image src="https://i.imgur.com/vjovXy6.png" borderRadius="50%" />
            </StackLayout>

            <!-- Botón registrar médico -->
            <StackLayout class="btnRegistrarMedico" @tap="registrarMedico()" orientation="vertical">
                <Image src="https://i.imgur.com/aIOpJ2n.png" class="imgMedico" />
                <Label text="Registrar" verticalAlignment="center" />
                <Label text="médico" verticalAlignment="center" />
            </StackLayout>

            <!-- Botón necesito ayuda -->
            <StackLayout class="btnNecesitoAyuda btn btn-primary btn-rounded-lg" >
                <Label text="Necesito ayuda" />
            </StackLayout>
            
        </AbsoluteLayout>
	</Page>
</template>

<script>
import { Position, Marker } from "nativescript-google-maps-sdk"
import RegistrarMedico from "./RegistrarMedico"
import IngresarContacto from "./IngresarContacto"
import * as http from "http"
import { Image } from "tns-core-modules/ui/image/image"

const geoLocation = require("nativescript-geolocation")
const { Accuracy } = require("tns-core-modules/ui/enums")

export default {
	data() {
		return {
			//latitude: null,
			//longitude: null,
			zoom: 15,
			minZoom: 0,
			maxZoom: 22,
			bearing: 0,
			tilt: 0,
			padding: [40, 40, 40, 40],
            mapView: null,
            medico: true,
            currentGeoLocation: {
                latitude: null, //-33.416488,
                longitude: null, //-70.600672,
                altitude: null,
                direction: null
            },
            //foo: 'XDD'
		}
	},
	methods: {
		mapReady(args) {
            this.mapView = args.object
            // Descripción del marcador
			this.mapView.infoWindowTemplate = `
				<StackLayout orientation="vertical" width="200">
					<Label text="{{title}}" className="title" />
					<!-- <Label text="{{snippet}}" textWrep="true" class="snippet" /> -->
				</StackLayout>
            `

            /*
            >   Nomenclatura marcadores
            >   U: Ubicación, C: Clínica o Centro médico, M: Médico.
            */

           // Imagenes
           const imgUsuario = 'https://i.imgur.com/MfZJcgY.png'
           const imgClinica = 'https://i.imgur.com/qJxXVMb.png'
           const imgMedico = 'https://i.imgur.com/7ebmvQD.png'

            // Marcador: Ubicación del usuario
            const UUsuario = new Marker()
            // Tobalaba con Apoquindo
            UUsuario.position = Position.positionFromLatLng(this.currentGeoLocation.latitude, this.currentGeoLocation.longitude)
                //(-33.416689, -70.600269)
            UUsuario.title = 'Tú ubicación'
			//UUsuario.snippet = 'Test snippet'
            UUsuario.userData = { test: 'Test user data' }
            //UUsuario.color = 'green'

            http.getImage(imgUsuario)
            .then(result => {
                let icon = new Image()
                icon.imageSource = result
                UUsuario.icon = icon
            }, error => {
                console.log(error)
            })

            this.mapView.addMarker(UUsuario)

            // Marcador: Clínica Vida Integra El Bosque
            const CVidaIntegraElBosque = new Marker()
            CVidaIntegraElBosque.position = Position.positionFromLatLng(-33.416488, -70.600672)
            CVidaIntegraElBosque.title = 'Clínica Vida Integra El Bosque'

            http.getImage(imgClinica)
            .then(result => {
                let icon = new Image()
                icon.imageSource = result
                CVidaIntegraElBosque.icon = icon
            }, error => {
                console.log(error)
            })

            this.mapView.addMarker(CVidaIntegraElBosque)

            // Marcador: Médico Juan Pérez
            const MJuanPerez = new Marker()
            MJuanPerez.position = Position.positionFromLatLng(-33.413892, -70.598350)
            MJuanPerez.title = 'Médico Juan Pérez'

            http.getImage(imgMedico)
            .then(result => {
                let icon = new Image()
                icon.imageSource = result
                MJuanPerez.icon = icon
            }, error => {
                console.log(error)
            })

            this.mapView.addMarker(MJuanPerez)

            // Marcador: Médico Leonardo Rojas
            const MLeonardoRojas = new Marker()
            MLeonardoRojas.position = Position.positionFromLatLng(-33.419675, -70.604420)
            MLeonardoRojas.title = 'Médico Leonardo Rojas'

            http.getImage(imgMedico)
            .then(result => {
                let icon = new Image()
                icon.imageSource = result
                MLeonardoRojas.icon = icon
            }, error => {
                console.log(error)
            })

            this.mapView.addMarker(MLeonardoRojas)

            // Marcador: Clínica (Museo Interactivo Las Condes (MUI))
            const CMuseo = new Marker()
            CMuseo.position = Position.positionFromLatLng(-33.414396, -70.595387)
            CMuseo.title = 'Museo Interactivo Las Condes (MUI)'

            http.getImage(imgClinica)
            .then(result => {
                let icon = new Image()
                icon.imageSource = result
                CMuseo.icon = icon
            }, error => {
                console.log(error)
            })

            this.mapView.addMarker(CMuseo)

		},
		onMarkerSelect(args) {
			console.log(args.marker.title)
        },
        /*
        obtenerUbicacion() {
            geoLocation.getCurrentLocation({
                desiredAccuracy: Accuracy.high,
                maximumAge: 5000,
                timeout: 5000
            }).then(res => {
                this.latitude = res.latitude
                this.longitude = res.longitude

                fetch(
                    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                        res.latitude +
                        "," +
                        res.longitude +
                        "&key=AIzaSyCsPtC7-9Na_bPaAFX3KYLksIkBSVUPSGI"
                ).then(response => response.json())
            }).catch(error => {
                console.log(error)
            })
        },
        getLocation() {
            // Se ejecuta 5 seg después de iniciar la app 
            // por que después de que el usuario acepta la geolocalización
            // no se redirige a su ubicación actual automáticamente.
            setTimeout(() => {
                this.obtenerUbicacion()
            }, 5000)
        },
        gps() {
            console.log('Tap')
            this.obtenerUbicacion()
        },
        */
       enableLocationServices() {
            geoLocation.isEnabled().then(enabled => {
                if (!enabled) {
                    geoLocation
                        .enableLocationRequest()
                        .then(() => this.showLocation())
                } else {
                    this.showLocation()
                }
            })
        },
        showLocation() {
            this.currentGeoLocation.latitude = null
            this.currentGeoLocation.longitude = null

            geoLocation.watchLocation(
                location => {
                    this.currentGeoLocation = location
                },
                error => {
                    alert(error)
                }, {
                    desiredAccuracy: Accuracy.high, //3,
                    updateDistance: 10,
                    minimumUpdateTime: 1000
                }
            )
        },
        registrarMedico() {
            this.$navigateTo(IngresarContacto)
            /*
            this.$navigateTo(IngresarContacto, {
                context: {
                    propsData: {
                        foo: 'TEST'
                    }
                }
            })
            */
        }
    },
    mounted() {
        //geoLocation.enableLocationRequest()
        //this.getLocation()
        
        // GPS
        this.enableLocationServices()
        this.showLocation()
    }
}
</script>

<style scoped>
    /*
    >   CSS para cada plataforma (.android, .ios)
    >   https://www.npmjs.com/package/nativescript-platform-css
    */

    /*
    >   Android
    */

    .android .btnRegistrarMedico {
        border-radius: 50%;
        color: black;
        font-size: 12;
        background-color: #fff;
        width: 180px;
        height: 180px;
        text-align: center;
        margin-left: 78%;
        margin-top: 75%;

        /* No toma la sombra */
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .android .imgMedico {
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        width: 60%; 
        height: 60%;
    }
    
    .android .btnGPS {
        margin-left: 5%;
        margin-top: 80%;
        height: 8%;
        background-color: #fff;
        border-bottom-left-radius: 12.5%;
        border-bottom-right-radius: 12.5%;
    }

    .android .btnMedCli {
        margin-left: 5%;
        margin-top: 71.7%;
        height: 8%;
        background-color: #fff;
        border-top-left-radius: 12.5%;
        border-top-right-radius: 12.5%;
    }

    .android .btnMenuLateral {
        margin-top: 4.5%;
        margin-left: 5%;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        background-color: #fff;

        /* No toma la sombra */
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .android .btnNecesitoAyuda {
        margin-left: 12.5%;
        margin-top: 92%;
        height: 6.5%;
        width: 75%;
    }

    .android .btnNecesitoAyuda Label {
        text-transform: uppercase;
        font-weight: 500;
        text-align: center;
        font-size: 18px;
        margin-top: 20%;
    }

    .android AbsoluteLayout {
        width: 100%;
        height: 100%; 
        background-color: #fff;
    }

    /*
    >  iOS
    */


</style>
