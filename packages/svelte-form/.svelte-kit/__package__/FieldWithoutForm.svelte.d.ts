/// <reference types="svelte" />
import { DeepKeys, DeepValue, Validator } from '@tanstack/form-core';
import { FieldComponentProps } from './useField.svelte';
declare class __sveltets_Render<TParentData, TName extends DeepKeys<TParentData>, TFieldValidator extends Validator<DeepValue<TParentData, TName>, unknown> | undefined = undefined, TFormValidator extends Validator<TParentData, unknown> | undefined = undefined, TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>> {
    props(): Omit<FieldComponentProps<TParentData, TName, TFieldValidator, TFormValidator, TData>, "form">;
    events(): {};
    slots(): {};
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <TParentData, TName extends DeepKeys<TParentData>, TFieldValidator extends Validator<DeepValue<TParentData, TName>, unknown> | undefined = undefined, TFormValidator extends Validator<TParentData, unknown> | undefined = undefined, TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<TParentData, TName, TFieldValidator, TFormValidator, TData>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<TParentData, TName, TFieldValidator, TFormValidator, TData>['props']>, ReturnType<__sveltets_Render<TParentData, TName, TFieldValidator, TFormValidator, TData>['events']>, ReturnType<__sveltets_Render<TParentData, TName, TFieldValidator, TFormValidator, TData>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<TParentData, TName, TFieldValidator, TFormValidator, TData>['bindings']>;
    } & ReturnType<__sveltets_Render<TParentData, TName, TFieldValidator, TFormValidator, TData>['exports']>;
    <TParentData, TName extends DeepKeys<TParentData>, TFieldValidator extends Validator<DeepValue<TParentData, TName>, unknown> | undefined = undefined, TFormValidator extends Validator<TParentData, unknown> | undefined = undefined, TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>>(internal: unknown, props: ReturnType<__sveltets_Render<TParentData, TName, TFieldValidator, TFormValidator, TData>['props']> & {}): ReturnType<__sveltets_Render<TParentData, TName, TFieldValidator, TFormValidator, TData>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any, any, any, any>['bindings']>;
}
declare const FieldWithoutForm: $$IsomorphicComponent;
type FieldWithoutForm<TParentData, TName extends DeepKeys<TParentData>, TFieldValidator extends Validator<DeepValue<TParentData, TName>, unknown> | undefined = undefined, TFormValidator extends Validator<TParentData, unknown> | undefined = undefined, TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>> = InstanceType<typeof FieldWithoutForm<TParentData, TName, TFieldValidator, TFormValidator, TData>>;
export default FieldWithoutForm;
