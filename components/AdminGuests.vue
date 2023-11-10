<template>
    <div class="w-full max-w-[800px] mx-auto h-screen xs:px-2 md:px-20 xs:pt-12 md:pt-6 flex flex-col">
        <div class="w-full flex items-center justify-between p-2">
            <h2 class="text-2xl text-pink-dark xs:text-start md:text-center">Lista de Convidados Confirmados</h2>
            <button class="py-2 px-6 rounded bg-pink hover:bg-pink-dark text-white" @click="show = true">Novo</button>
        </div>

        <ul class="flex-1 flex flex-col gap-2 overflow-y-auto py-4 scroll-element px-2">
            <li class="w-full flex items-center p-2 rounded border border-pink-dark" v-for="guest in props.guestList" :key="guest.id">
                <div class="flex flex-col gap-1 flex-1 text-pink-dark">
                    <span>{{ guest.name }}</span>
                </div>
                <div>
                    <button class="flex items-center justify-center gap-2 border border-white rounded p-2" @click="handleDeleteGuest(guest)">
                        <Trash color="#FFAFCC" :size="20"/>
                    </button>
                </div>
            </li>
        </ul>

        <NewGuestModal :show="show" @close="show=false" @add-new-guest="$emit('addNewGuest',$event), show = false" :insert-loading="props.insertLoading"/>
    </div>
</template>

<script setup lang="ts">
import type guest from '~/models/guest';
import {Trash} from 'lucide-vue-next'

const emits = defineEmits(['deleteGuest', 'addNewGuest'])
const show = ref(false)

const props = defineProps<{
    guestList : guest[],
    insertLoading: boolean
}>()

function handleDeleteGuest(guest: guest){
    emits('deleteGuest', guest)
}


</script>
