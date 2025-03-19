import { fetchPostGeneral } from '../fetch'

export const getDataSheet = (data) => {
    return fetchPostGeneral({
        dataSend: data, 
        urlEndPoint: `/api/v1/sheets/get`
    })
}

export const updateDataProcessTask = (data,sheet='updateProcess') => {
    return fetchPostGeneral({
        dataSend: data, 
        urlEndPoint: `/api/v1/sheets/${sheet}`
    })
}