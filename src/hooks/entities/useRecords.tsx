// use react-query to fetch entities from the API
// and return them as a list of entities
// --------------------------------------------------------

import { useMutation, useQuery } from "@tanstack/react-query";
import EntityService from "../../services/enitities/EntitiyService";
import React from "react";
import { fi } from "@faker-js/faker";





export const useRecordList = (modelName: string | undefined) => {

    const [page, setPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(500);



    const { data, isLoading, error } = useQuery({
        queryKey: ['records', modelName],
        queryFn: async () => {
            const response = await EntityService.getModelRecords({
                modelName: modelName as string,
                page: page,
                perPage: perPage

            });
            return response.data
        }
    });
    return { data, isLoading, error, page, setPage, perPage, setPerPage }

}

export const useSingleRecord = (modelName: string | undefined, recordId: string | undefined) => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['record', modelName, recordId],
        queryFn: async () => {
            const response = await EntityService.getSingleRecord({
                modelName: modelName as string,
                id: recordId as string
            });
            return response.data
        }
    });

    const deleteRecord = useMutation(async (record: any) => {
        const response = await EntityService.deleteRecord({
            modelName: modelName as string,
            id: recordId as string,
        }
        );
        return response.data
    }, {
        onSuccess: () => {
            // Invalidate and refetch
        }
    });
    return { data, isLoading, error }


}

export const useAddRecordMutation = (modelName: string | undefined) => {
    const mutation = useMutation(async (record: any) => {
        const response = await EntityService.createRecord({
            modelName: modelName as string,
            data: record
        }
        );
        return response.data
    }, {
        onSuccess: () => {
            // Invalidate and refetch
        }
    });
    return mutation
}


export const useUpdateRecordMutation = (modelName: string | undefined, recordId: string | undefined) => {

    const mutation = useMutation(async (record: any) => {
        const response = await EntityService.updateRecord({
            modelName: modelName as string,
            id: recordId as string,
            data: record
        }
        );
        return response.data
    }, {
        onSuccess: () => {
            // Invalidate and refetch
        }
    });
    return mutation
}

export const useDeleteRecordMutation = (modelName: string | undefined, recordId: string | undefined) => {

    const mutation = useMutation(async (record: any) => {
        const response = await EntityService.deleteRecord({
            modelName: modelName as string,
            id: recordId as string,
        }
        );
        return response.data
    }, {
        onSuccess: () => {
            // Invalidate and refetch
        }
    });
    return mutation
}




export const useSearchRecords = (modelName: string | undefined) => {

    return useQuery({
        queryKey: ['search', modelName],
        queryFn: async () => {
            const response = await EntityService.getModelRecords({
                modelName: modelName as string,
                page: 1,
                perPage: 1000
            });
            return response.data
        }
    });
}
