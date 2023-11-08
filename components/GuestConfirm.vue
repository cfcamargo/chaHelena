<template>
    <div class="flex flex-col gap-6 justify-center items-center p-10">
        <h2 class="font-cursive text-5xl text-pink-dark">{{ store.getGuestSelected.name }}</h2>

        <p class="text-blue text-center">Obrigado por escolher seu nome! Agora sei quem você é. Que tal confirmar e irmos  para a próxima etapa da diversão? Vamos escolher seu presente!</p>


        <p class="text-xs text-pink text-center">Caso tenha escolhido o nome errado, clique em corrigir, e vamos selecionar o correto.</p>

        <div class="flex flex-col gap-2">
            <button class="px-6 py-2 bg-blue hover:bg-blue-dark text-white rounded" @click="$emit('prev')">
                CORRIGIR
            </button>

            <button class="px-6 py-2 bg-pink hover:bg-pink-dark text-white rounded" @click="$emit('next')">
                PRÓXIMO
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useConfirmedStore } from '@/store/confirmed'

const store = useConfirmedStore()

</script>
