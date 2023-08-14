// use react-query to fetch entities from the API
// and return them as a list of entities
// --------------------------------------------------------

import { useQuery } from "@tanstack/react-query";
import EntityService from "../../services/enitities/EntitiyService";




export const useEntitiesList = () => {

    return useQuery({
        queryKey: ['entities'],
        queryFn: async () => {
            const response = await EntityService.getAllModels();
            return response.data.data
        }
    });

}






export default useEntitiesList;