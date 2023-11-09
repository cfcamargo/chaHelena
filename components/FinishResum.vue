<template>
    <Container>
        <div class="flex flex-col gap-6 justify-center items-center p-10">
            <h2 class="font-cursive text-5xl text-pink-dark">{{ store.getGuestSelected.name }}</h2>

            <p class="text-blue-dark text-center">Muito obrigada por confirmar sua presença! Sua participação no meu chá de bebê é muito importante para mim. Mal posso esperar para compartilhar este momento especial com você. Sua amizade é um presente precioso. Até lá!</p>

            <div class="flex flex-col items-center">
                <span class="font-bolt text-blue-dark text-center text-xl mt-8">Lembre-se de adicionar a sua agenda</span>

                <div class="flex flex-col font-bold text-pink-dark items-center mt-4">
                    <span>Data: 09/12/23</span>
                    <span>Local: <a href="https://maps.app.goo.gl/eVVw5KZANUKZCpLk9?g_st=ic" target="_blank">Rua Prof Marly Cavalheiro Rojas - Q06 Lt 15</a></span>
                    <span>Hs: 17:30hs</span>
                </div>
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { useConfirmedStore } from '@/store/confirmed'

const store = useConfirmedStore()

</script>
