<template>
    <Page class="page">
        <!-- Título -->
        <ActionBar title="Registrar médico" class="action-bar" />

        <GridLayout backgroundColor="#CCCCCC">
            <ScrollView>
                <StackLayout margin="10" verticalAlignment="center">
                    <StackLayout class="form" padding="15" backgroundColor="#FFFFFF">

                        <!-- RUT -->
                        <StackLayout class="input-field">
                            <Label text="RUT" class="label font-weight-bold m-b-5" />
                            <TextField class="input" v-model="medicoForm.txtRut" />
                            <StackLayout class="hr-light" />
                        </StackLayout>

                        <!-- Apellido paterno -->
                        <StackLayout class="input-field">
                            <Label text="Apellido paterno" class="label font-weight-bold m-b-5" />
                            <TextField class="input" v-model="medicoForm.txtAp" />
                            <StackLayout class="hr-light" />
                        </StackLayout>

                        <!-- Apellido materno -->
                        <StackLayout class="input-field">
                            <Label text="Apellido materno" class="label font-weight-bold m-b-5" />
                            <TextField class="input" v-model="medicoForm.txtAm" />
                            <StackLayout class="hr-light" />
                        </StackLayout>

                        <!-- Especialidad -->
                        <StackLayout class="input-field">
                            <Label text="Especialidad" class="label font-weight-bold m-b-5" />
                            <ListPicker :items="medicoForm.especialidad" v-model="medicoForm.especialidadIndex" />
                            <StackLayout class="hr-light" />
                        </StackLayout>
                        
                        <!-- Botón registrar -->
                        <Button class="btn btn-primary w-full" text="Registrar" @tap="onButtonTap()"></Button>
                    </StackLayout>
                </StackLayout>
            </ScrollView>
        </GridLayout>

    </Page>
</template>

<script>

export default {
    data() {
        return {
            medicoForm: {
                txtRut: '',
                txtAp: '',
                txtAm: '',
                especialidad: [
                    'espc1',
                    'espc2',
                    'espc3',
                ],
                especialidadIndex: 0
            },
        }
    },
    methods: {
        onButtonTap() {
            console.log('Tap')
        }
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

    .android .page {
        background-color: #fff;
    }

    .android .container {
        margin-top: 3%;
        margin-bottom: 3%;
        margin-left: 5%;
        margin-right: 5%;
        background-color: pink;
    }

    .android .lblDescripcion {
        font-size: 16px;
    }

    .android .inputFL {
        margin-left: 20%;
        margin-right: 20%;
        width: 60%;
        margin-top: 2%;
        margin-bottom: 2%;
    }

    /*
    >  iOS
    */

    
</style>
