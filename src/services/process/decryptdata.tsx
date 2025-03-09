import { decryptData } from '../../services/utils/utils'
import { getDataSheet } from './Process'

export const getViewDataProcess = async (data) => {
    const response = await getDataSheet(data)
    return JSON.parse(await decryptData(response?.data) || '{}')
}