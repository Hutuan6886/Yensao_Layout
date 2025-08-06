import { useEffect, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import { updateNotionSuccess } from "@/lib/features/productSlice/productSlice"

type NotionState = {
    id: string
    title: string
    content: string
}

const inititalState: NotionState = {
    id: '',
    title: '',
    content: '',
}

type Action =
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_CONTENT'; payload: string }
    | { type: 'RESET' }
    | { type: 'LOAD_FROM_EDIT'; payload: NotionState }

const notionReducer = (state: NotionState, action: Action): NotionState => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload }
        case 'SET_CONTENT':
            return { ...state, content: action.payload }
        case 'RESET':
            return inititalState
        case 'LOAD_FROM_EDIT':
            return { ...state, ...action.payload }
        default:
            return state
    }
}
const useNotionForm = () => {
    const [state, dispatch] = useReducer(notionReducer, inititalState)
    const distpatchState = useDispatch()
    const { editNotion } = useSelector((state: RootState) => state.product)

    useEffect(() => {
        if (editNotion) {
            //todo: update notionData to form (editNotion.index ứng với giá trị notion lúc click)
            dispatch({ type: 'LOAD_FROM_EDIT', payload: editNotion.data as NotionState })
        }
    }, [editNotion])

    const resetEditNotion = () => {
        distpatchState(updateNotionSuccess())
    }

    return { state, dispatch, editNotion, resetEditNotion }
}

export default useNotionForm