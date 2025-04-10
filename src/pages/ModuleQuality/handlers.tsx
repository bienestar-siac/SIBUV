// Redux
import { setAccreditation, setActivitys } from "../../hooks/moduleQuality";

// Fetch
import { getViewDataProcess } from '../../services/process/decryptdata'

// Redux
import { useDispatch } from "react-redux";

const SPREADSHEETID ="10Q92SyArYmoBT3iINuM88AVGLk_OXufMMDpfKiHVGc8"

// Handlers
export default ({ set }) => {
    const dispatch = useDispatch();
    
    const 
        init = async () => {
            try {
                const response = await getViewDataProcess({ 
                    sheet_name: 'Factor 9',
                    spreadsheet_id: SPREADSHEETID
                })
                const responseActividades = await getViewDataProcess({ 
                    sheet_name: 'Acreditación Institucional',
                })

                if (response?.length <= 0) return 
                if (responseActividades?.length <= 0) return

                dispatch(setAccreditation({ accreditation: 
                    responseActividades.filter( (item) => {
                        return String(item?.origen) === 'Acreditación Institucional'
                    })
                }))
                
                dispatch(setActivitys({ activitys: response }))

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