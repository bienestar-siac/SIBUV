/**
 * @author: Cristian Machado <cristian.machado@correounivalle.edu.co>
 * @copyright: 2024 
*/

import { uri } from './const'

const methodPut = 'PUT';
const methodPost = 'POST';
const methodGet = 'GET';

/**
 * General Structure HTTP REQUEST POST
 * 
 * @param {*} param0 
 * @returns 
 */
export const fetchPostGeneral = ({ dataSend, urlEndPoint, path="#" }) => {
    return fetchGeneral({
        dataSend,
        urlEndPoint,
        type: methodPost,
        path
    });
}

/**
 * General Structure HTTP REQUEST PUT
 * 
 * @param {*} param0 
 * @returns 
 */
export const fetchPutGeneral = ({ dataSend, urlEndPoint }) => {
    return fetchGeneral({
        dataSend,
        urlEndPoint,
        type: methodPut    
    });
};

/**
 * General Structure HTTP REQUEST GET
 * 
 * @param {*} param0 
 * @returns 
 */
export const fetchGetGeneral = ({ urlEndPoint }) => {
    return fetchGeneral({
        urlEndPoint,
        type: methodGet  
    });
}

/**
 * General Structure HTTP REQUEST
 * 
 * @param {*} param0 
 * @returns 
 */
const fetchGeneral = async ({
    dataSend,
    urlEndPoint,
    type,
    path = '#'
}) => {
    let response = null
    try {
        const options = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (type === methodPost || type === methodPut) {
            options.body = JSON.stringify(dataSend);
        }

        response = await fetch(`${path === '#'? uri.baseUrl : path}${urlEndPoint}`, options);
        return await response.json();
        
    } catch (error) {
        console.log(error);
    }
    return response
}