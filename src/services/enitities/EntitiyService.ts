import ApiList from "../ApiList"
import { BaseApiPaginationResponse, BaseApiResponse } from "../ApiModel"
import { EntityModel, FieldModel } from "./EntitiyServiceModel"




class EntityService {
    static getAllModels(): Promise<BaseApiPaginationResponse<EntityModel>> {
        return ApiList.entities.getAllModels()
    };
    static getModelRecords(params: {
        modelName: string;
        page: number;
        perPage: number;
        filter?: string;
    }): Promise<BaseApiPaginationResponse<any>> {
        return ApiList.entities.getModelRecords(params)
    }
    static getSingleRecord(req: {
        modelName: string;
        id: string;
    }): Promise<BaseApiResponse<any>> {
        return ApiList.entities.getSingleRecord(req)
    }
    static getAllFields(req: {
        modelName: string;
    }): Promise<BaseApiPaginationResponse<FieldModel>> {
        return ApiList.entities.getAllFields(req)
    }
    static createRecord(req: {
        modelName: string;
        data: any;
    }): Promise<BaseApiResponse<any>> {
        return ApiList.entities.createRecord(req)
    }
    static updateRecord(req : {
        modelName: string;
        id: string;
        data: any;
    }): Promise<BaseApiResponse<any>> {
        return ApiList.entities.updateRecord(req)
    }
    static deleteRecord(req: {
        modelName: string;
        id: string;
    }): Promise<BaseApiResponse<any>> {
        return ApiList.entities.deleteRecord(req)
    }

}

export default EntityService