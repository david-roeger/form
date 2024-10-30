import { FormApi } from '@tanstack/form-core'
import { useStore } from '@tanstack/svelte-store'
import { useField } from './useField.svelte'
import type { FieldComponent, UseField } from './useField.svelte'
import type { NoInfer } from '@tanstack/svelte-store'
import type { FormOptions, FormState, Validator } from '@tanstack/form-core'
import { Component, setContext, Snippet } from 'svelte'
import { ValueOrGetter } from './types'
import Subscribe from './Subscribe.svelte'
import FieldWithoutForm from './FieldWithoutForm.svelte'

/**
 * Fields that are added onto the `FormAPI` from `@tanstack/form-core` and returned from `useForm`
 */
export interface SvelteFormApi<
  TFormData,
  TFormValidator extends Validator<TFormData, unknown> | undefined = undefined,
> {
  /**
   * A Svelte component to render form fields. With this, you can render and manage individual form fields.
   */
  Field: FieldComponent<TFormData, TFormValidator>
  /**
   * A custom Svelte hook that provides functionalities related to individual form fields. It gives you access to field values, errors, and allows you to set or update field values.
   */
  useField: UseField<TFormData, TFormValidator>
  /**
   * A `useStore` hook that connects to the internal store of the form. It can be used to access the form's current state or any other related state information. You can optionally pass in a selector function to cherry-pick specific parts of the state
   */
  useStore: <TSelected = NoInfer<FormState<TFormData>>>(
    selector?: (state: NoInfer<FormState<TFormData>>) => TSelected,
  ) => TSelected
  /**
   * A `Subscribe` function that allows you to listen and react to changes in the form's state. It's especially useful when you need to execute side effects or render specific components in response to state updates.
   */
  Subscribe: <TSelected = NoInfer<FormState<TFormData>>>() => Component<{
    selector?: (state: NoInfer<FormState<TFormData>>) => TSelected
    children: Snippet<[{ readonly current: TSelected }]>
  }>
}

/**
 * A custom Svelte Hook that returns an extended instance of the `FormApi` class.
 *
 * This API encapsulates all the necessary functionalities related to the form. It allows you to manage form state, handle submissions, and interact with form fields
 */
export function useForm<
  TFormData,
  TFormValidator extends Validator<TFormData, unknown> | undefined = undefined,
>(optsOrGetter?: ValueOrGetter<FormOptions<TFormData, TFormValidator>>) {
  const opts =
    typeof optsOrGetter === 'function' ? optsOrGetter() : optsOrGetter

  const formApi = (() => {
    const api = new FormApi<TFormData, TFormValidator>(opts)

    const extendedApi: typeof api & SvelteFormApi<TFormData, TFormValidator> =
      api as never
    extendedApi.Field = FieldWithoutForm as never
    extendedApi.useField = (propsOrGetter) => {
      const opts = () => {
        const props =
          typeof propsOrGetter === 'function' ? propsOrGetter() : propsOrGetter

        return {
          ...props,
          form: api,
        }
      }
      return useField(opts as never)
    }

    extendedApi.useStore = (selector) => {
      return useStore(api.store as never, selector as never) as never
    }
    extendedApi.Subscribe = Subscribe as never

    return extendedApi
  })()

  formApi.useStore((state) => state.isSubmitting)

  $effect(() => {
    formApi.mount()
  })

  $effect(() => {
    const opts =
      typeof optsOrGetter === 'function' ? optsOrGetter() : optsOrGetter
    formApi.update(opts)
  })

  setContext('formApi', formApi)

  return formApi
}
