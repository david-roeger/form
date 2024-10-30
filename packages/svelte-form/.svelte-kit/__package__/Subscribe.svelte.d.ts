import { FormState } from '@tanstack/form-core';
import { Snippet } from 'svelte';
declare class __sveltets_Render<TFormData, TSelected = NoInfer<FormState<TFormData>>> {
    props(): {
        selector?: ((state: NoInfer<FormState<TFormData>>) => TSelected) | undefined;
        children: Snippet<[{
            readonly current: TSelected;
        }]>;
    };
    events(): {};
    slots(): {};
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <TFormData, TSelected = NoInfer<FormState<TFormData>>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<TFormData, TSelected>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<TFormData, TSelected>['props']>, ReturnType<__sveltets_Render<TFormData, TSelected>['events']>, ReturnType<__sveltets_Render<TFormData, TSelected>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<TFormData, TSelected>['bindings']>;
    } & ReturnType<__sveltets_Render<TFormData, TSelected>['exports']>;
    <TFormData, TSelected = NoInfer<FormState<TFormData>>>(internal: unknown, props: ReturnType<__sveltets_Render<TFormData, TSelected>['props']> & {}): ReturnType<__sveltets_Render<TFormData, TSelected>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any>['bindings']>;
}
declare const Subscribe: $$IsomorphicComponent;
type Subscribe<TFormData, TSelected = NoInfer<FormState<TFormData>>> = InstanceType<typeof Subscribe<TFormData, TSelected>>;
export default Subscribe;
