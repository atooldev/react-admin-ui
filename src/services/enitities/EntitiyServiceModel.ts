export interface EntityModel {
    tableName: string,
    columns: string[],
    primaryKeys: string[],
    relations: string[],
    name: string
}
// {
//     "data": {
//         "forms": [
//             {
//                 "propertyName": "id",
//                 "isNullable": false,
//                 "isPrimary": true
//             },
//             {
//                 "propertyName": "createdAt",
//                 "type": "timestamp",
//                 "isNullable": false,
//                 "isPrimary": false
//             },
//             {
//                 "propertyName": "updatedAt",
//                 "type": "timestamp",
//                 "isNullable": false,
//                 "isPrimary": false
//             },
//             {
//                 "propertyName": "username",
//                 "isNullable": false,
//                 "isPrimary": false
//             },
//             {
//                 "propertyName": "email",
//                 "isNullable": false,
//                 "isPrimary": false
//             },
//             {
//                 "propertyName": "profile",
//                 "isNullable": true,
//                 "isPrimary": false,
//                 "relationsMetadata": {
//                     "propertyName": "profile",
//                     "model": "UserProfile",
//                     "relatedTableName": "user_profile"
//                 }
//             }
//         ],
//         "relations": [
//             "posts",
//             "roles",
//             "profile"
//         ],
//         "columns": [
//             "id",
//             "createdAt",
//             "updatedAt",
//             "username",
//             "email",
//             "profile"
//         ],
//         "primaryKeys": [
//             "id"
//         ]
//     }
// }

export interface FieldModel {
    propertyName: string,
    type?: string,
    isNullable: boolean,
    isPrimary: boolean,
    isGenerated?: boolean,
    isBaseDate?: boolean,
    relationsMetadata?: RelationMetadata
    enums?: string[]

}

export interface RelationMetadata {
    propertyName: string,
    model: string,
    relatedTableName: string
}

export interface FieldResponse {
    forms: FieldModel[],
    relations: string[],
    columns: string[],
    primaryKeys: string[]

}

