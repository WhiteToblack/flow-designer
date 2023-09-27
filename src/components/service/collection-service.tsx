import axios from "axios";
import FlowNode from '../../../internal-lib/flow-designer-entity/entity/flow-node';

export default class CollectionService {
    GetCollection = async (collectionName: String): Promise<FlowNode[]> => {
        let result: FlowNode[] = await axios.get('http://127.0.0.1:3000/find?Collection=' + collectionName)
        return result;
    }

    Save = (params: FlowNode[]) => {
        axios.post('http://127.0.0.1:3000/saveCollection', params)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });

    }
}