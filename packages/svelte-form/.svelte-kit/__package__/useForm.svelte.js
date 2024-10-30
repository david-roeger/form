import { FormApi } from '@tanstack/form-core';
import { useStore } from '@tanstack/svelte-store';
import { useField } from './useField.svelte';
import { setContext } from 'svelte';
import Subscribe from './Subscribe.svelte';
import FieldWithoutForm from './FieldWithoutForm.svelte';
/**
 * A custom Svelte Hook that returns an extended instance of the `FormApi` class.
 *
 * This API encapsulates all the necessary functionalities related to the form. It allows you to manage form state, handle submissions, and interact with form fields
 */
export function useForm(optsOrGetter) {
    const opts = typeof optsOrGetter === 'function' ? optsOrGetter() : optsOrGetter;
    const formApi = (() => {
        const api = new FormApi(opts);
        const extendedApi = api;
        extendedApi.Field = FieldWithoutForm;
        extendedApi.useField = (propsOrGetter) => {
            const opts = () => {
                const props = typeof propsOrGetter === 'function' ? propsOrGetter() : propsOrGetter;
                return {
                    ...props,
                    form: api,
                };
            };
            return useField(opts);
        };
        extendedApi.useStore = (selector) => {
            return useStore(api.store, selector);
        };
        extendedApi.Subscribe = Subscribe;
        return extendedApi;
    })();
    formApi.useStore((state) => state.isSubmitting);
    $effect(() => {
        formApi.mount();
    });
    $effect(() => {
        const opts = typeof optsOrGetter === 'function' ? optsOrGetter() : optsOrGetter;
        formApi.update(opts);
    });
    setContext('formApi', formApi);
    return formApi;
}
