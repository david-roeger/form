<script
  lang="ts"
  generics="TFormData,TSelected = NoInfer<FormState<TFormData>>"
>
  import { FormApi, FormState } from '@tanstack/form-core'
  import { useStore } from '@tanstack/svelte-store'

  import { getContext, Snippet } from 'svelte'
  import { SvelteFormApi } from './useForm.svelte'

  const {
    selector: selectorProp,
    children,
  }: {
    selector?: (state: NoInfer<FormState<TFormData>>) => TSelected
    children: Snippet<[{ readonly current: TSelected }]>
  } = $props()

  const api = getContext('formApi') as FormApi<TFormData> &
    SvelteFormApi<TFormData>
  const selector = $derived(selectorProp ?? ((state: never) => state))
  const data = $derived(
    useStore(api.store as never, selector as never) as {
      readonly current: TSelected
    },
  )
</script>

{@render children(data)}
