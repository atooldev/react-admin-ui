// use react-query to fetch entities from the API
// and return them as a list of entities
// --------------------------------------------------------

import { useQuery } from "@tanstack/react-query";
import EntityService from "../../services/enitities/EntitiyService";
import React from "react";


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




    return useQuery({
        queryKey: ['fields', modelName],
        queryFn: async () => {
            const response = await EntityService.getAllFields({
                modelName: modelName as string,
            });
            return response.data
        }
    });

}


