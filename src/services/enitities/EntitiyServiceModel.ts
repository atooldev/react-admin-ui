export interface EntityModel {
    name: string;
    label: string;
}


export interface FieldModel {
    "name": string,
    "required": boolean,
    "enum"?: string[],
}
