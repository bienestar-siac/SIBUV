// Redux
import { setReportForms, setFormProcess } from "../../hooks/viewProcess";

// Fetch
import { getViewDataProcess } from '../../services/process/decryptdata'

// Redux
import { useDispatch } from "react-redux";

// Handlers
export default ({ set }) => {
    const dispatch = useDispatch();
    
    const init = async () => {
            try {
                const response = await getViewDataProcess({ 
                    sheet_name: 'INFOMES GENERADOS'
                })
                const responseForm = await getViewDataProcess({ 
                    sheet_name: 'INFORME'
                })

                if (response?.length < 0) return 
                if (responseForm?.length <= 0) return
                
                dispatch(setReportForms({ reportForms: response}))
                dispatch(setFormProcess({ formProcess: responseForm }))
                
                set(false)
            } catch (e) {
                console.error(e);
                set(true)
            }
    };

    return { init }
}