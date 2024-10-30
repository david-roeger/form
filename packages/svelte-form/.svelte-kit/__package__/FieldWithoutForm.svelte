<script
  lang="ts"
  generics="TParentData,
TName extends DeepKeys<TParentData>,
TFieldValidator extends
  | Validator<DeepValue<TParentData, TName>, unknown>
  | undefined = undefined,
TFormValidator extends
  | Validator<TParentData, unknown>
  | undefined = undefined,
TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,"
>
  import { DeepKeys, DeepValue, FormApi, Validator } from '@tanstack/form-core'
  import { FieldComponentProps, useField } from './useField.svelte'
  import { getContext } from 'svelte'
  import { SvelteFormApi } from './useForm.svelte'
  import Field from './Field.svelte'

  const {
    children,
    ...fieldOptions
  }: Omit<
    FieldComponentProps<
      TParentData,
      TName,
      TFieldValidator,
      TFormValidator,
      TData
    >,
    'form'
  > = $props()

  const form = getContext('formApi') as FormApi<TParentData, TFormValidator> &
    SvelteFormApi<TParentData, TFormValidator>

  const options = $derived({
    ...fieldOptions,
    form,
    children,
  }) as FieldComponentProps<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
  >
</script>

<Field {...options} />
