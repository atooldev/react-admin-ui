// use react-query to fetch entities from the API
// and return them as a list of entities
// --------------------------------------------------------

import { useQueries, useQuery } from "@tanstack/react-query";
import EntityService from "../../services/enitities/EntitiyService";
import React from "react";
import { FieldModel } from "../../services/enitities/EntitiyServiceModel";
import { fi } from "@faker-js/faker";


type returnTypes = {
    data: any,
    isLoading: boolean,
    error: any,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    perPage: number,
    setPerPage: React.Dispatch<React.SetStateAction<number>>
}


export const useFieldList = (modelName: string | undefined) => {

    const fields = useQuery({
        queryKey: ['fields', modelName],
        queryFn: async () => {
            const response = await EntityService.getAllFields({
                modelName: modelName as string,
            });
            return response.data?.data
        }
    });


    return fields

}


export const useGetFormRelationRecords = (field: FieldModel) => {
    const relationsMetadata = field.relationsMetadata

    const fields = useQuery({
        queryKey: ['releationData', relationsMetadata?.model],
        queryFn: async () => {
            const response = await EntityService.getModelRecords({
                modelName: relationsMetadata?.model as string,
                page: 1,
                perPage: 1000,
            });
            return response.data?.data
        }
    });


    return fields

}

