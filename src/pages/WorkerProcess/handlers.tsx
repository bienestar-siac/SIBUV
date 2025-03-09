// Redux
import { setDataProcess, setPermanentProcess } from "../../hooks/process";

// Fetchs
import { getDataProcessModule } from '../../services/accounts/decryptdata'

// Handlers
export default ({ dispatch }) => {

    const 
        init = async () => {
            try {
                const response = await getDataProcessModule()
                if (response?.length <= 0) return
                    dispatch(setDataProcess({ data: response }))
                    dispatch(setPermanentProcess({ permanent: response }))
            } catch (e) {
                console.error(e);
            }
        },
        filterProcess = (filter) => {
            dispatch(setDataProcess({ data: filter }));
        }

    return { init, filterProcess }
}