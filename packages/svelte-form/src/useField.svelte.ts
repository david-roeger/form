import { useStore } from '@tanstack/svelte-store'
import { FieldApi } from '@tanstack/form-core'
import type { UseFieldOptions, ValueOrGetter } from './types'
import type { DeepKeys, DeepValue, Validator } from '@tanstack/form-core'
import { Snippet } from 'svelte'
import Field from './Field.svelte'
import type { Component } from 'svelte'

interface SvelteFieldApi<
  TParentData,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
> {
  /**
   * A pre-bound and type-safe sub-field component using this field as a root.
   */
  Field: FieldComponent<TParentData, TFormValidator>
}

/**
 * A type representing a hook for using a field in a form with the given form data type.
 *
 * A function that takes an optional object with a `name` property and field options, and returns a `FieldApi` instance for the specified field.
 */
export type UseField<
  TParentData,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
> = <
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
>(
  opts: ValueOrGetter<
    Omit<
      UseFieldOptions<
        TParentData,
        TName,
        TFieldValidator,
        TFormValidator,
        TData
      >,
      'form'
    >
  >,
) => {
  field: FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>
  state: {
    readonly current: FieldApi<
      TParentData,
      TName,
      TFieldValidator,
      TFormValidator,
      TData
    >['state']
  }
}

/**
 * A hook for managing a field in a form.
 * @param opts An object with field options.
 *
 * @returns The `FieldApi` instance for the specified field.
 */
export function useField<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
>(
  optsOrGetter: ValueOrGetter<
    UseFieldOptions<TParentData, TName, TFieldValidator, TFormValidator, TData>
  >,
) {
  const opts =
    typeof optsOrGetter === 'function' ? optsOrGetter() : optsOrGetter

  const fieldApi = (() => {
    const api = new FieldApi({
      ...opts,
      form: opts.form,
      name: opts.name,
    })

    const extendedApi: typeof api &
      SvelteFieldApi<TParentData, TFormValidator> = api as never

    extendedApi.Field = Field as never

    return extendedApi
  })()

  const fieldState = useStore(fieldApi.store, (state) => state)

  $effect(() => {
    const cleanup = fieldApi.mount()
    return () => cleanup()
  })

  $effect(() => {
    const opts =
      typeof optsOrGetter === 'function' ? optsOrGetter() : optsOrGetter
    fieldApi.update({ ...opts, form: opts.form } as never)
  })

  return { field: fieldApi, state: fieldState } as const
}

/**
 * @param children A render function that takes a field API instance and returns a React element.
 */
export type FieldComponentProps<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
> = {
  children: Snippet<
    [
      {
        field: FieldApi<
          TParentData,
          TName,
          TFieldValidator,
          TFormValidator,
          TData
        >
        state: {
          readonly current: FieldApi<
            TParentData,
            TName,
            TFieldValidator,
            TFormValidator,
            TData
          >['state']
        }
      },
    ]
  >
} & UseFieldOptions<TParentData, TName, TFieldValidator, TFormValidator, TData>

/**
 * A type alias representing a field component for a specific form data type.
 */
export type FieldComponent<
  TParentData,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
> = <
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
>() => Component<
  Omit<
    FieldComponentProps<
      TParentData,
      TName,
      TFieldValidator,
      TFormValidator,
      TData
    >,
    'form'
  >
>