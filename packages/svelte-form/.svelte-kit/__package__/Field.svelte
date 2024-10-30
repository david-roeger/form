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
  import { DeepKeys, DeepValue, Validator } from '@tanstack/form-core'
  import { FieldComponentProps, useField } from './useField.svelte'

  const {
    children,
    ...fieldOptions
  }: FieldComponentProps<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
  > = $props()

  const field = useField<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
  >(() => fieldOptions)
</script>

{@render children?.(field)}
