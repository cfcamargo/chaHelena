<template>
    <div class="flex flex-col gap-6 justify-center items-center p-10 w-full">
        <h2 class="font-cursive text-5xl text-pink-dark">Selecione seu nome</h2>

        <div class="flex gap-2 items-center border border-pink rounded w-full">
            <input type="text" name="search" v-model="searchTerm" placeholder="Pesquise seu nome" class="px-2 py-1 text-pink outline-none focus:outline-none flex-1 bg-transparent" @input="filterByTerm">
            <Search :size="25" color="#FFC8DD"/>
        </div>

        <div class="w-full flex justify-center" v-if="loading">
            <Loader2 :size="45" color="#FFC8DD" class="animate-spin"/>
        </div>

        <ul class="flex-1 max-h-[300px] overflow-y-scroll flex flex-col gap-4 w-full scroll-element" v-if="guestList.length > 0">
            <li class="cursor-pointer" :class="guestSelected !== null && guestSelected.name === guest.name ? 'text-blue-dark' : 'text-pink-dark'" v-for="guest in guestList" :key="guest.id" @click="selectedGuest(guest)">
                {{  guest.name }}
            </li>
        </ul>

        <button class="px-6 py-2 bg-pink hover:bg-pink-dark text-white rounded" @click="confirm">
            PRÓXIMO
        </button>
    </div>
</template>

<script setup lang="ts">
import { Search, Loader2 } from 'lucide-vue-next';
import { createClient } from '@supabase/supabase-js'
import { useConfirmedStore } from '@/store/confirmed'

const emits = defineEmits(['next'])

const store = useConfirmedStore()

const supabaseURL = 'https://oipoadlrywzllagxhklq.supabase.co'
const supabaseAPI = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pcG9hZGxyeXd6bGxhZ3hoa2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMTUxMDcsImV4cCI6MjAxNDY5MTEwN30.kuGCUz9dKTGtoI9aVS-NrD2NhwRfPtqIlhfCMPfoaJg'

const supabase = createClient(supabaseURL, supabaseAPI)

const loading = ref(false)

async function listarGuests() {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('guests') // Substitua 'guests' pelo nome correto da sua tabela
      .select('*')    // Seleciona todas as colunas; você pode ajustar isso conforme necessário

    if (error) {
      console.error('Erro ao listar guests:', error.message)
      return
    }

    if(data){
        store.setGuestList(data)
        guestList.value = data
    }

    loading.value = false
  } catch (error) {
    console.error('Erro inesperado:', error)
  }
}


interface guest {
    id: number,
    name : string,
    confirmed: boolean,
    giftId : number | null
}

const searchTerm = ref('')

const guestSelected = ref<guest | null>(null)
const guestList = ref<guest[]>([])

function selectedGuest(guest: guest){
    guestSelected.value = guest
}

function filterByTerm(){
    if(searchTerm.value.length > 2){
        guestList.value = store.guestList.filter(guest => guest.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
    }else{
        guestList.value = store.guestList
    }
}

function confirm(){
    if(guestSelected.value !== null){
        store.setGuestSelected(guestSelected.value)
        emits('next')
    }
}

onMounted(() => {
    listarGuests()
})


</script>
