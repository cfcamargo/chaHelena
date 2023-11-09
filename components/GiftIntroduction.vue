<template>
    <Container>
        <div class="flex flex-col gap-6 justify-center items-center p-10">
            <h2 class="font-cursive text-5xl text-pink-dark">{{ store.getGuestSelected.name }}</h2>

            <p class="text-blue-dark text-center">Ótimo! Você selecionou seu nome com sucesso. Agora, para escolher o seu presente, clique no botão abaixo. Você será redirecionado para a tela da lista de presentes, onde poderá fazer sua escolha especial para mim. Obrigado por participar do meu chá de bebê!</p>

            <button class="px-6 py-2 bg-pink hover:bg-pink-dark text-white rounded" @click="$emit('next')">
                    VER LISTA
            </button>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { useConfirmedStore } from '@/store/confirmed'

const store = useConfirmedStore()

</script>
