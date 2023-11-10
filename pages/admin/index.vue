<template>
    <div class="w-full h-screen flex">
        <aside class="xs:hidden md:flex h-screen w-1/3 max-w-[400px] flex-col justify-between bg-pink px-2 py-4">
            <div class="flex-1">
                <div class="text-2xl">
                    <h2 class="font-bold text-center text-white">Area Administrativa</h2>
                </div>
                <div class="flex flex-col  gap-6 mt-6">
                    <button class="flex items-center w-full justify-center gap-4 border p-3 rounded border-white" :class="componentIs === 'confirmed' ? 'bg-blue' : ''" @click="componentIs = 'confirmed'">
                        <CalendarCheck color="white" :size="25"/>
                        <span class="text-white">
                            Confirmados
                        </span>
                    </button>
                    <button class="flex items-center w-full justify-center gap-4 border p-3 rounded border-white" :class="componentIs === 'guests' ? 'bg-blue' : ''"  @click="componentIs = 'guests'">
                        <Users color="white" :size="25"/>
                        <span class="text-white">
                            Convidados
                        </span>
                    </button>
                    <button class="flex items-center w-full justify-center gap-4 border p-3 rounded border-white" :class="componentIs === 'gifts' ? 'bg-blue' : ''" @click="componentIs = 'gifts'">
                        <Gift color="white" :size="25"/>
                        <span class="text-white">
                            Presentes
                        </span>
                    </button>
                </div>
            </div>

            <div>
                <button class="flex items-center w-full justify-center gap-4 border p-3 rounded border-white" @click="signOut" type="button">
                    <LogOut color="white" :size="25"/>
                    <span class="text-white">
                        Sair
                    </span>
                </button>
            </div>
        </aside>

        <div class="w-full xs:flex md:hidden justify-end px-2 py-2 fixed top-2 right-2 z-40">
            <button type="button" @click="toogleMenu">
                <Menu :size="30" color="#FFAFCC"/>
            </button>
        </div>

        <nav class="xs:flex md:hidden h-screen w-full flex-col justify-between bg-pink px-2 py-4 fixed top-0 bottom-0 left-0 z-50" v-if="hamburguer_show">
            <div class="flex-1">
                <div class="text-xl flex justify-between pl-1 pr-2">
                    <h2 class="font-bold text-center text-white">Area Administrativa</h2>
                    <button @click="toogleMenu">
                        <X :size="30" color="white"/>
                    </button>
                </div>
                <div class="flex flex-col  gap-6 mt-6">
                    <button class="flex items-center w-full justify-center gap-4 border p-3 rounded border-white" :class="componentIs === 'confirmed' ? 'bg-blue' : ''" @click="hamburguer_show = false, componentIs = 'confirmed'">
                        <CalendarCheck color="white" :size="25"/>
                        <span class="text-white">
                            Confirmados
                        </span>
                    </button>
                    <button class="flex items-center w-full justify-center gap-4 border p-3 rounded border-white" :class="componentIs === 'guests' ? 'bg-blue' : ''"  @click="hamburguer_show = false, componentIs = 'guests'">
                        <Users color="white" :size="25"/>
                        <span class="text-white">
                            Convidados
                        </span>
                    </button>
                    <button class="flex items-center w-full justify-center gap-4 border p-3 rounded border-white" :class="componentIs === 'gifts' ? 'bg-blue' : ''" @click="hamburguer_show = false, componentIs = 'gifts'">
                        <Gift color="white" :size="25"/>
                        <span class="text-white">
                            Presentes
                        </span>
                    </button>
                </div>
            </div>

            <div>
                <button class="flex items-center w-full justify-center gap-4 border p-3 rounded border-white" @click="signOut" type="button">
                    <LogOut color="white" :size="25"/>
                    <span class="text-white">
                        Sair
                    </span>
                </button>
            </div>
        </nav>

        <div class="flex-1 h-screen flex justify-center py-10" v-if="loading">
            <div class="w-full max-w-[300px]">
                <Animation name="/load.json"/>
            </div>
        </div>
        <div class="flex-1 h-screen relative" v-else>
            <div v-if="form_status.message !== '' && form_status.status !== null " class="w-full flex items-center justify-between max-w-[800px] mx-auto px-20 py-4 bg-white absolute bottom-0 left-0 right-0">
                <span :class="form_status.status === 'success' ? 'text-green-400' : 'text-red-400'">
                    {{  form_status.message }}
                </span>
                <button type="button" @click="form_status.message = '', form_status.status = null">
                    <XCircle :size="24"  color="#FFAFCC"/>
                </button>
            </div>
            <div v-if="componentIs == 'confirmed'">
                <AdminConfirmed :gift-list="giftList" :guest-list="guestList" @delete-confirmed-guest="deleteConfirmedGuest($event)"/>
            </div>

            <div v-if="componentIs == 'gifts'">
                <AdminGifts :gift-list="giftList" @addNewGift="addNewGift($event)" :insertLoading="insertLoading" @delete-gift="deleteGift($event)"/>
            </div>

            <div v-if="componentIs == 'guests'">
                <AdminGuests :guest-list="guestList" @addNewGuest="addNewGuest($event)" :insertLoading="insertLoading" @delete-guest="deleteGuest($event)"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CalendarCheck, Users, Gift, LogOut, XCircle, Menu, X  } from 'lucide-vue-next';
import { useConfirmedStore } from '@/store/confirmed'
import type guest from '~/models/guest';
import type gift from '~/models/gift';
import { compileScript } from 'vue/compiler-sfc';

const hamburguer_show = ref(false)

const store = useConfirmedStore()
const supabase = useSupabaseClient()

const componentIs = ref<'confirmed' | 'gifts' | 'guests'>('confirmed')
const giftList = ref<gift[]>([])
const guestList = ref<guest[]>([])

const loading = ref(false)
const insertLoading = ref(false)

const form_status = ref<{
    status : 'success' | 'error' | null,
    message : string
}>({
    status: null,
    message: ''
})

function toogleMenu(){
    console.log('toogle')

    hamburguer_show.value = !hamburguer_show.value

}


async function listGifts() {
    loading.value = true
    try {
        const { data, error } = await supabase
        .from('gifts') // Substitua 'guests' pelo nome correto da sua tabela
        .select('*')    // Seleciona todas as colunas; você pode ajustar isso conforme necessário

        if (error) {
        console.error('Erro ao listar guests:', error.message)
        return
        }

        if(data){
            if(store.getGiftList.length === 0){
                store.setGiftList(data)
            }
            giftList.value = data
        }
    } catch (error) {
        console.error('Erro inesperado:', error)
    } finally {
        loading.value = false
    }
}

async function listGuests() {
    try {
        const { data, error } = await supabase
        .from('guests') // Substitua 'guests' pelo nome correto da sua tabela
        .select('*')   // Seleciona todas as colunas; você pode ajustar isso conforme necessário

        if (error) {
        console.error('Erro ao listar guests:', error.message)
        return
        }

        if(data){
            if(store.getGuestList.length === 0){
                store.setGuestList(data)
            }
            guestList.value = data
        }

    } catch (error) {
        console.error('Erro inesperado:', error)
    } finally {
        loading.value = false
    }
}

async function addNewGuest(name:string) {
    insertLoading.value = true
    try {
        const { data, error } = await supabase
        .from('guests')
        .insert([{ name }])

        if (error) {
            throw error
        }

        form_status.value = {
            status: 'success',
            message: 'Convidado Adicionado com sucesso'
        }

        listGuests()

    } catch (error: any) {
        form_status.value = {
            status: 'error',
            message: 'Houve um erro ao adicionar o convidado, atualize a página e tente novamente'
        }
    } finally {
        insertLoading.value = false
    }
}

async function addNewGift(description : string){
    insertLoading.value = true
    try {
        const { data, error } = await supabase
        .from('gifts')
        .insert([{ description }])

        if (error) {
            throw error
        }

        form_status.value = {
            status: 'success',
            message: 'Presente Adicionado com sucesso'
        }

        listGifts()

    } catch (error: any) {
        form_status.value = {
            status: 'error',
            message: 'Houve um erro ao adicionar o presente, atualize a página e tente novamente'
        }
    } finally {
        insertLoading.value = false
    }

}

async function deleteGuest(guest : guest){
    try {
        const { data, error } = await supabase
        .from('guests')
        .delete()
        .match({ id: guest.id })


        if (error) {
            throw error
        }

        form_status.value = {
            status: 'success',
            message: 'Convidado Deletado com sucesso'
        }

        listGuests()

    } catch (error: any) {
        form_status.value = {
            status: 'error',
            message: 'Houve um erro ao deletar o convidado, atualize a página e tente novamente'
        }
    } finally {
        insertLoading.value = false
    }
}

async function deleteGift(gift : gift){
    try {
        const { data, error } = await supabase
        .from('gifts')
        .delete()
        .match({ id: gift.id })


        if (error) {
            throw error
        }

        form_status.value = {
            status: 'success',
            message: 'Presente Deletado com sucesso'
        }

        listGifts()

    } catch (error: any) {
        form_status.value = {
            status: 'error',
            message: 'Houve um erro ao deletar o presente, atualize a página e tente novamente'
        }
    }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if(!error){
      navigateTo('/auth')
  }
}

async function deleteConfirmedGuest(guest : guest){
    try {

        // Atualiza o convidado como não confirmado na tabela 'guests'.
        const { data: guestData, error: guestError } = await supabase
            .from('guests')
            .update({ confirmed: false, giftId : null }) // Define o convidado como não confirmado
            .match({ id: guest.id }) // Identifica o convidado pelo ID
            .single() // Assume que deseja atualizar um único registro

        if (guestError) {
            throw guestError
        }

        // Se o convidado tinha selecionado um presente, atualize a tabela 'gifts'.

        const { error: giftError } = await supabase
            .from('gifts')
            .update({ selected: false }) // Marca o presente como não selecionado
            .match({ id: guest.giftId }) // Encontra o presente pelo ID

        if (giftError) {
            throw giftError
        }

        form_status.value = {
            status: 'success',
            message: 'Confirmação cancelada com sucesso'
        }
    } catch (error) {
        form_status.value = {
            status: 'error',
            message: 'Houve um erro ao cancelar a confirmação, atualize a página e tente novamente'
        }
    }
    listGuests()
    listGifts()


}


definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Chá da Helena - Área Administrativa',
})


onMounted(() => {
    listGifts()
    listGuests()
})

</script>