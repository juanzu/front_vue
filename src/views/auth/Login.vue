<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Empresa x</div>
                        <span class="text-600 font-medium">Ingresa para continuar</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="credenciales.email" type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Clave</label>
                        <Password id="password1" v-model="credenciales.password" placeholder="Clave" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="credenciales.checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Recuardame</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Olvido su contraseña?</a>
                        </div>
                        <Button label="INGRESAR" @click="login()" class="w-full p-3 text-xl"></button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Buffer } from "buffer" //clase para cifrar
import * as authService from "@/service/AuthService.js";
export default {
    
    setup(){
        const router = useRouter()
        const store = useStore()
        const credenciales = ref({email: '', password: ''});
        const login = async () => {
            /*
            authService.loginConLaravel(credenciales.value).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
            */
           try {
               const res = await authService.loginConLaravel(credenciales.value)
               console.log(res)
               store.dispatch("loginVuex", res.data)
               const base64Token = Buffer.from(res.data.access_token).toString('base64'); //se encrita el token
               localStorage.setItem("token", base64Token)
               router.push({name: 'Perfil'}) // se dieciona a la ruta perfil
           } catch (error) {
                console.log("***************", error)
           }
        }
        return {
            credenciales,
            login
        }
    }
}
</script>