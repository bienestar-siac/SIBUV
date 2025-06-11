// Redux
import { setAgreements } from "../../hooks/agreements";

// Fetch
import { getViewDataProcess } from '../../services/process/decryptdata'

// Redux
import { useDispatch } from "react-redux";

const SPREADSHEETID = "1J3XdOOjb2H6viSDyTQD6RPz1H2oLkgBBbn03MfndheA"

// Handlers
export default ({ set }) => {
    const dispatch = useDispatch();
    
    const 
        init = async () => {
            try {

                // const response = await getViewDataProcess({ 
                //     sheet_name: 'CONSOLIDADO',
                //     spreadsheet_id: SPREADSHEETID
                // })

                // if (response?.length < 0) return
                
                // dispatch(setAgreements({ agreements: response?.map((item, index) => {
                //     return {
                //         ...item,
                //         row_number: index + 1,
                //     }
                // })}))
                set(false)
            } catch (e) {
                console.error(e);
                set(true)
            }
        },
        capitalizedText = (text: string) => {
            return text
            ?.split("-")
            ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
            ?.join(" ");
        }

    return { init, capitalizedText }
}