<script setup>
    import { vOnClickOutside } from '@vueuse/components'

    const addresses = ref([]);
    const input = ref(null);
    const empty = ref(true);
    const valid = ref(false);
    const autocomplete = ref(false);
    let timeout = null

    function fnFocusIn() {
        if (valid.value === false) {
            autocomplete.value = true;
        }
    }

    function fnFocusOut() {
        autocomplete.value = false
    }

    async function fnCheck(value) {
        input.value.value = value;
        empty.value = value.length < 1;
        if (empty.value) {
            autocomplete.value = false;
            return;
        }

        valid.value = addresses.value.find((address) => address === value) !== undefined;
        if (valid.value === true) {
            autocomplete.value = false;
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                const { data } = await useFetch('/api/validate?address=' + value);
                addresses.value = data.value;

                empty.value = value.length < 1;
                if (empty.value) {
                    autocomplete.value = false;
                    return;
                }

                valid.value = addresses.value.find((address) => address === value) !== undefined;
                autocomplete.value = ! valid.value;
            }, 500);
        }
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen bg-slate-100">
        <div>
            <div class="relative w-[32rem]" v-on-click-outside="fnFocusOut">
                <div>
                    <input ref="input" @focusin="fnFocusIn()" @input="fnCheck($event.currentTarget.value)" type="text" placeholder="Adresa" :class="empty === true ? 'border-slate-500 focus:border-slate-500' : valid === true ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500'" class="shadow-sm placeholder-slate-400 bg-slate-50 text-slate-800 py-3 px-4 block w-full border-2 rounded-md text-sm focus:ring-0">
                    <div v-if="empty === false" class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                        <Icon v-if="valid" name="material-symbols:check-circle" class="h-6 w-6 text-green-500" />
                        <Icon v-else name="material-symbols:error-rounded" class="h-6 w-6 text-red-500" />
                    </div>
                </div>
                <div v-if="autocomplete === true" class="w-full mt-2 absolute bg-white shadow-md rounded-md overflow-hidden max-h-[12.5rem] overflow-y-auto">
                    <a v-for="address in addresses" @click="fnCheck(address)" class="flex cursor-pointer items-center py-3 px-4 leading-4 text-sm text-slate-800 bg-slate-50 hover:bg-slate-200 focus:ring-0">{{ address }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>