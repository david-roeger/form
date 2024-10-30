import { useStore } from '@tanstack/svelte-store';
import { FieldApi } from '@tanstack/form-core';
import Field from './Field.svelte';
/**
 * A hook for managing a field in a form.
 * @param opts An object with field options.
 *
 * @returns The `FieldApi` instance for the specified field.
 */
export function useField(optsOrGetter) {
    const opts = typeof optsOrGetter === 'function' ? optsOrGetter() : optsOrGetter;
    const fieldApi = (() => {
        const api = new FieldApi({
            ...opts,
            form: opts.form,
            name: opts.name,
        });
        const extendedApi = api;
        extendedApi.Field = Field;
        return extendedApi;
    })();
    const fieldState = useStore(fieldApi.store, (state) => state);
    $effect(() => {
        const cleanup = fieldApi.mount();
        return () => cleanup();
    });
    $effect(() => {
        const opts = typeof optsOrGetter === 'function' ? optsOrGetter() : optsOrGetter;
        fieldApi.update({ ...opts, form: opts.form });
    });
    return { field: fieldApi, state: fieldState };
}
