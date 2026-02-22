<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const isModalOpen = ref(false);

const searchQuery = ref('');

const searchModal = ref<HTMLDialogElement | null>(null);

const inputModal = ref<HTMLInputElement | null>(null);

const openSearch = () => {
    isModalOpen.value = true;
    searchModal.value?.showModal();

    // Increase delay to ensure the browser has finished the dialog opening process
    setTimeout(() => {
        inputModal.value?.focus();
    }, 200);
}

const closeSearch = () => {
    isModalOpen.value = false;
    searchModal.value?.close();
}

const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
    <div class="grow">
        <!-- Trigger Input as a Label for DaisyUI floating-label compatibility -->
        <label 
            :class="[
                'input',
                'floating-label',
                'border-0',
                'outline-0',
                'shadow-lg',
                'ring-0',
                'cursor-pointer',
                'w-full'
            ]" 
            @click.prevent="openSearch"
        >
            <span class="rounded-full py-1 px-2 bg-primary-content shadow-md text-primary">Pesquisar</span>
            <input 
                type="text" 
                placeholder="Pesquisar" 
                readonly 
                tabindex="-1" 
                class="cursor-pointer"
            />
            <kbd class="kbd kbd-md">⌘ K</kbd>
        </label>
    </div>

    <!-- Search Modal -->
    <dialog ref="searchModal" class="modal">
        <div
        :class="[
            'modal-box',
            'max-w-2xl',
            'p-0',
            'overflow-hidden',
            'shadow-2xl',
            'transition-all',
            'transform',
            isModalOpen ? 'duration-0 delay-0' : 'duration-500'
        ]">
            <!-- Modal Header: Input -->
            <div class="flex items-center bg-base-200/10 gap-4 p-4 border-b border-base-content/5">
                <Icon icon="hugeicons:search-01" class="text-2xl" />

                <input 
                    ref="inputModal"
                    v-model="searchQuery" 
                    type="text"
                    placeholder="Pesquisar no blog..." 
                    autofocus
                    :class="[
                        'w-full',
                        'input',
                        'outline-0',
                        'border-0',
                        'ring-1',
                        'ring-base-300',
                        'transition-all',
                        'duration-300',
                        'focus:ring-2',
                        'focus:shadow-lg',
                        'focus:ring-primary/50',
                    ]"
                />
                <button class="btn btn-ghost btn-sm btn-circle" @click="closeSearch">
                    <Icon icon="hugeicons:cancel-01" class="text-2xl" />
                </button>
            </div>

            <!-- Modal Body: Results (Skeletons) -->
            <div class="p-4 max-h-[60vh] overflow-y-auto">
                <div class="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-4 px-2">
                    Resultados Sugeridos
                </div>

                <ul class="flex flex-col gap-2">
                    <li v-for="i in 3" :key="i" class="p-3 rounded-xl flex items-center gap-4">
                        <div class="skeleton h-12 w-12 shrink-0 rounded-lg"></div>
                        <div class="flex flex-col gap-2 w-full">
                            <div class="skeleton h-4 w-3/4"></div>
                            <div class="skeleton h-3 w-1/2 opacity-50"></div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Modal Footer -->
            <div class="p-3 bg-base-200/50 flex justify-between items-center text-sm">
                <div class="flex gap-4 px-2">
                    <span class="flex flex-row gap-1.5 items-center font-light">
                        <kbd class="kbd kbd-sm">ENTER</kbd>
                        Selecionar
                    </span>
                    <span class="flex flex-row gap-1.5 items-center font-light">
                        <kbd class="kbd kbd-sm">↑↓</kbd>
                        Navegar
                    </span>
                    <span class="flex flex-row gap-1.5 items-center font-light">
                        <kbd class="kbd kbd-sm">ESC</kbd>
                        Fechar
                    </span>
                </div>
            </div>
        </div>

        <form v-if="isModalOpen" method="dialog" class="modal-backdrop backdrop-blur-sm delay-0! duration-0!">
            <button @click="closeSearch">close</button>
        </form>
    </dialog>
</template>

<style scoped>
/* .modal-box {
    animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-pop {
    0% {
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
} */
</style>