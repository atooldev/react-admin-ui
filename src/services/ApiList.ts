import Gateway from "../configs/gateway/Gateway"
import { BaseApiPaginationResponse, BaseApiResponse } from "./ApiModel"
import { EntityModel, FieldModel } from "./enitities/EntitiyServiceModel"

export default {
    // entity
    entities: {
        // get
        getAllModels: (): Promise<BaseApiPaginationResponse<EntityModel>> => {
            const url = "/entities"
            return Gateway.get(url, {})
        },
        getModelRecords: (req: {
            modelName: string;
            page: number;
            perPage: number;
            filter?: string;
        }): Promise<BaseApiPaginationResponse<any>> => {

            const url = `/entities/${req.modelName}`
            return Gateway.get(url, {
                params: {
                    page: req.page,
                    perPage: req.perPage,
                    ...(req.filter && { filter: req.filter })
                }
            },)
        },
        getSingleRecord: (req: {
            modelName: string;
            id: string;
        }): Promise<BaseApiResponse<any>> => {
            const url = `/entities/${req.modelName}/${req.id}`
            return Gateway.get(url, {})
        },
        getAllFields: (req: {
            modelName: string;
        }): Promise<BaseApiPaginationResponse<FieldModel>> => {
            const url = `/entities/${req.modelName}/fields`
            return Gateway.get(url, {})
        },
        // post
        createRecord: (req: {
            modelName: string;
            data: any;
        }): Promise<BaseApiResponse<any>> => {
            const url = `/entities/${req.modelName}`
            return Gateway.post(url, req.data)
        },
        // put
        updateRecord: (req: {
            modelName: string;
            id: string;
            data: any;
        }): Promise<BaseApiResponse<any>> => {
            const url = `/entities/${req.modelName}/${req.id}`
            return Gateway.put(url, req.data)
        },
        // delete
        deleteRecord: (req :{
            modelName: string;
            id: string;
        }): Promise<any> => {
            const url = `/entities/${req.modelName}/${req.id}`
            return Gateway.delete(url, {})
        },
    }
}
