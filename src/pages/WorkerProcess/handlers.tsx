// Redux
import { setTools, setTaskList } from "../../hooks/viewProcess";

// Fetch
import { getViewDataProcess } from '../../services/process/decryptdata'

// Redux
import { useDispatch } from "react-redux";

// Handlers
export default ({ route, set }) => {
    const dispatch = useDispatch();
    
    const 
        init = async () => {
            try {
                const response = await getViewDataProcess({ 
                    sheet_name: capitalizedText(route)
                })

                if (response?.length <= 0) return 
                
                dispatch(setTools({ tools: response.filter(
                    (item) => item?.tipo_de_actividad  ===  "Herramienta") 
                }))
                
                dispatch(setTaskList({ taskList: response.filter(
                    (item) => item?.tipo_de_actividad  ===  "Tarea") 
                }))
                
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