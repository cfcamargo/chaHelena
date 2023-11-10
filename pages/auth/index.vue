<template>
    <div class="w-full h-screen flex justify-center items-center bg-nuvens">
        <div class="w-full max-w-[500px] bg-white flex flex-col justify-center items-center p-8 rounded-xl shadow-md">
            <div class="w-[40%]" mx-auto>
                <Animation name="/baby.json"/>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
                <h2 class="font-cursive text-6xl text-pink-dark">Chá da Helena</h2>
                <p class="text-xs text-blue -mt-1">Para acessar a area administrativa, utilize seu email e senha</p>
                <p v-if="errorMessage !== ''" class="text-center text-red-400 mt-2 font-medium">
                    {{  errorMessage }}
                </p>
            </div>

            <form class="w-full mt-8" @submit.prevent="login">
                <div class="w-full border rounded border-pink-dark flex items-center p-2">
                    <Mail color="#FFAFCC"/>
                    <input type="email" name="email" v-model="email" class="flex-1 bg-transparent outline-none focus:outline-none text-pink-dark px-2" placeholder="Digite seu email">
                </div>

                <div class="w-full border rounded border-pink-dark flex items-center p-2 mt-2">
                    <LockKeyhole color="#FFAFCC"/>
                    <input type="password" name="password" v-model="password" class="flex-1 bg-transparent outline-none focus:outline-none text-pink-dark px-2" placeholder="Digite sua senha">
                </div>

                <button class="w-full bg-pink hover:bg-pink-dark text-white p-2 flex items-center justify-center mt-2 rounded">
                    <span v-if="loading" class="w-full flex justify-center items-center">
                        <Loader2 :size="24" color="white" class="animate-spin"/>
                    </span>

                    <span class="text-white font-bold" v-else>
                        ENTRAR
                    </span>
                </button>

            </form>

            <NuxtLink to="/" class="text-pink-dark underline mt-4">
                Voltar
            </NuxtLink>

        </div>
    </div>
</template>

<script setup lang="ts">
import { LogIn } from 'lucide-vue-next';
import { Mail, LockKeyhole, Loader2 } from 'lucide-vue-next';

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRouter()

const email = ref('')
const password = ref('')

const errorMessage = ref('')

const loading = ref(false)


async function login(){
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })


    if (error) {
        errorMessage.value = error.message
        loading.value = false
        return
    }

    if(data){
        route.push('/admin')
    }

}

</script>
