<template>
    <Page class="page">
        <!-- Título -->
        <ActionBar title="Ingresar contacto" class="action-bar" />

        <GridLayout backgroundColor="#CCCCCC">
            <ScrollView>
                <StackLayout margin="10" verticalAlignment="center">
                    <StackLayout class="form" padding="15" backgroundColor="#FFFFFF">

                        <!-- Su ubicación es -->
                        <StackLayout class="input-field">
                            <Label text="Su ubicación es" class="label font-weight-bold m-b-5" />
                            <Label class="input" v-model="locacion.ubicacion" />
                            <StackLayout class="hr-light" />
                            <StackLayout orientation="horizontal">
                                <Label class="input" v-model="locacion.lat" />
                                <Label class="input" v-model="locacion.lng" />
                            </StackLayout>
                            
                        </StackLayout>

                        <!-- Ud. está en -->
                        <StackLayout class="input-field">
                            <Label text="Usted está en" class="label font-weight-bold m-b-5" />
                            <Label class="input"  text="vida integra..." />
                            <StackLayout class="hr-light" />
                        </StackLayout>

                        <!-- Médico -->
                        <StackLayout class="input-field">
                            <Label text="Seleccione al médico" class="label font-weight-bold m-b-5" />
                            <ListPicker :items="medicoInfo.medicoList" v-model="medicoInfo.medicoIndex" />
                            <StackLayout class="hr-light" />
                        </StackLayout>

                        <!-- Ingresar info -->
                        <StackLayout class="input-field">
                            <Label text="Ingrese información del contacto" class="label font-weight-bold m-b-5" />
                            <StackLayout orientation="horizontal">
                                <Label text="Piso" class="label font-weight-bold m-b-5" />
                                <Label text="Oficina" class="label font-weight-bold m-b-5" marginLeft="45%" />
                            </StackLayout>

                            <StackLayout orientation="horizontal">
                                <!-- Piso -->
                                <TextField class="input"  hint="Piso" width="45%" keyboardType="number"
                                    maxLength="2" />
                                <!-- Oficina -->
                                <TextField class="input"  hint="Oficina" width="50%" keyboardType="number"
                                    maxLength="4" marginLeft="6.8%" />
                            </StackLayout>

                            <StackLayout orientation="horizontal">
                                <StackLayout class="hr-light" width="45%" />
                                <StackLayout class="hr-light" width="50%" marginLeft="5%" />
                            </StackLayout>

                            <Label text="Teléfono" class="label font-weight-bold m-b-5 m-t-5" />
                            <!-- Teléfono -->
                            <TextField class="input"  hint="Teléfono" keyboardType="phone"
                                maxLength="12" />
                            <StackLayout class="hr-light" />
                        </StackLayout>

                        <!-- Botón guardar -->
                        <StackLayout class="btnGuardar btn btn-primary btn-rounded-lg" @tap="btnGuardar()">
                            <Label text="Guardar"  />
                        </StackLayout>

                    </StackLayout>
                </StackLayout>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script>


export default {
    //props: ['foo'],
    data() {
        return {
            medicoInfo: {
                medicoList: [    
                    'Medico 1',
                    'Medico 2',
                    'Medico 3',
                ],
                medicoIndex: 0
            },
            locacion: {
                ubicacion: 'El Bosque....',
                lat: '',
                lng: ''
            }
        }
    },
    methods: {
        btnGuardar() {
            console.log('Tap')
        }
    },
    mounted() {
        fetch(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=-33.525103,-70.759823&key=AIzaSyCsPtC7-9Na_bPaAFX3KYLksIkBSVUPSGI" //+
                //res.latitude + //latitud del componente mapa
                //"," +
                //res.longitude +
                //"&key=AIzaSyCsPtC7-9Na_bPaAFX3KYLksIkBSVUPSGI") 
            )
        .then(response => response.json())
        .then(data => {
            this.locacion.ubicacion = data.results[1].formatted_address
            this.locacion.lat = data.results[2].geometry.location.lat
            //console.log(data.results[2].geometry.location.lat)
            this.locacion.lng = data.results[2].geometry.location.lng
            //console.log(data.results[2].geometry.location.lng)
        })
    }
}
</script>

<style scoped>

.android .btnGuardar {
    width: 75%;
}

.android .btnGuardar Label {
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
    font-size: 16px;
    margin-top: 20%;
}

</style>
