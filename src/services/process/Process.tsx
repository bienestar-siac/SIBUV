import { fetchPostGeneral, fetchPutGeneral } from '../fetch'

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

export const generateDoc = (data) => {
    return fetchPostGeneral({
        dataSend: data, 
        urlEndPoint: `/execute`,
        path: 'https://sibuvv.shop/server-pdf'
    })
}

export const createAgreements = (data) => {
    return fetchPostGeneral({
        dataSend: data, 
        urlEndPoint: `/api/v1/sheets/create-agreements`,
    })
}

export const updateAgreements = (data) => {
    return fetchPutGeneral({
        dataSend: data, 
        urlEndPoint: `/api/v1/sheets/create-agreements`,
    })
}

export const generatePrompIA = (data, header) => {
    return fetchPostGeneral({
        dataSend: data, 
        urlEndPoint: `/v1/chat/completions`,
        path: 'https://api.deepseek.com',
        header: header,
    })
}

export const updatePrompt = (data) => {
    return fetchPostGeneral({
        dataSend: data, 
        urlEndPoint: `/api/v1/sheets/update-insert-prompt`,
    })
}

export const createNewVar = (data) => {
    return fetchPostGeneral({
        dataSend: data,
        urlEndPoint: `/api/v1/sheets/created-new-var-document`
    })
}

export const createScannerNew = (data) => {
    return fetchPostGeneral({
        dataSend: data,
        urlEndPoint: `/api/v1/sheets/create-scanner-new`
    })
}