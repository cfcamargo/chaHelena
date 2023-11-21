<template>
    <div class="w-full max-w-[800px] mx-auto h-screen xs:px-2 md:px-20 xs:pt-16 md:pt-6 flex flex-col">
        <h2 class="text-2xl text-pink-dark text-center">Lista de Convidados Confirmados</h2>

        <div v-if="confirmedGuests.length === 0">
            <div class="w-full max-w-[500px] flex flex-col justify-center items-center gap-2 mx-auto">
                <Animation name="/empty.json"/>
                <p class="text-pink text-center">Nenhum convidado confirmou presença ainda</p>
            </div>
        </div>

        <ul class="flex-1 flex flex-col gap-2 overflow-y-auto py-4 scroll-element px-2" v-else>
            <li class="w-full flex items-center p-4 rounded bg-pink" v-for="guest in confirmedGuests" :key="guest.id">
                <div class="flex flex-col gap-1 flex-1 text-white">
                    <span>Convidado: {{ guest.name }}</span>
                    <span v-if="guest.giftId">Presente: {{  getGiftById(guest.giftId) }}</span>
                </div>
                <div>
                    <button class="flex items-center justify-center gap-2 border border-white rounded p-2" @click="handleDeleteConfirmedGuest(guest)">
                        <Trash color="white" :size="20"/>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    guestList : guest[],
    giftList : gift[]
}>()

const emits = defineEmits(['deleteConfirmedGuest'])

import {Trash} from 'lucide-vue-next'
import type gift from '~/models/gift';
import type guest from '~/models/guest';

const confirmedGuests = computed(() => {
    return props.guestList.filter(guest => guest.confirmed)
})

function getGiftById(id: number){
    let gift = props.giftList.find(gift => gift.id === id)?.description
    return gift
}

function handleDeleteConfirmedGuest(guest: guest){
    emits('deleteConfirmedGuest', guest)
}




</script>
