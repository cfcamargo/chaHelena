<template>
    <Container>
        <div class="flex flex-col gap-6 justify-center items-center p-10">
            <div class="w-[60%] mx-auto">
                <Animation name="/baby.json"/>
            </div>
            <h2 class="font-cursive text-5xl text-pink-dark">Olá Pessoal</h2>

            <p class="text-blue-dark text-center">Eu sou a Helena e o meu chá de bebê está chegando, e estou ansiosa para compartilhar esse momento especial com cada um de vocês. Muito obrigada por fazerem parte deste capítulo incrível da minha vida. Mal posso esperar para ver os presentes maravilhosos que vocês escolheram para mim. Nos vemos em breve!</p>

            <button class="px-6 py-2 bg-pink hover:bg-pink-dark text-white rounded" @click="$emit('next')">
                PRÓXIMO
            </button>
        </div>
    </Container>
</template>

<script setup lang="ts">

</script>
