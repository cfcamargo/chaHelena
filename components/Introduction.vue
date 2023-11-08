<template>
    <div class="flex flex-col gap-6 justify-center items-center p-10">
        <p class="text-blue text-center">Que emocionante! Para confirmar sua presença no meu chá de bebê, clique no botão abaixo. Você será redirecionado para a tela de seleção de nome, onde poderá encontrar seu nome na lista de convidados e confirmar sua participação. Sua presença é muito importante para mim, e estou ansiosa para compartilhar este momento especial com você. Obrigada por fazer parte desta celebração!</p>

        <button type="" class="px-6 py-2 bg-pink hover:bg-pink-dark text-white rounded" @click="$emit('next')">
            PRÓXIMO
        </button>
    </div>
</template>

<script setup lang="ts">

</script>
