import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDescriptionsuccess } from "@/lib/features/productSlice/productSlice";
import { RootState } from "@/lib/store";

type DescriptionState = {
    id: string;
    title: string;
    imgUrl: string | null;
    content: string;
};

const inititalState: DescriptionState = {
    id: '',
    title: '',
    imgUrl: null,
    content: '',
}

type Action =
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_CONTENT'; payload: string }
    | { type: 'SET_IMG_URL'; payload: string }
    | { type: 'RESET' }
    | { type: 'LOAD_FROM_EDIT'; payload: DescriptionState }

const DescriptionReducer = (state: DescriptionState, action: Action): DescriptionState => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload }
        case 'SET_CONTENT':
            return { ...state, content: action.payload }
        case 'SET_IMG_URL':
            return { ...state, imgUrl: action.payload }
        case 'RESET':
            return inititalState
        case 'LOAD_FROM_EDIT':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const useDescriptionForm = () => {
    const dispatchState = useDispatch()
    const { editDescription } = useSelector((state: RootState) => state.product)
    const [state, dispatch] = useReducer(DescriptionReducer, inititalState)

    useEffect(() => {
        if (editDescription) {
            //todo: update notionData to form (editNotion.index ứng với giá trị notion lúc click)
            dispatch({ type: 'LOAD_FROM_EDIT', payload: editDescription.data as DescriptionState })
        }
    }, [editDescription])

    const setTitle = (value: string) => dispatch({ type: 'SET_TITLE', payload: value })
    const setContent = (value: string) => dispatch({ type: 'SET_CONTENT', payload: value })
    const setImgUrl = (value: string) => dispatch({ type: 'SET_IMG_URL', payload: value })
    const reset = () => dispatch({ type: 'RESET' })

    const resetEditDescription = () => dispatchState(updateDescriptionsuccess())

    return { state, setTitle, setImgUrl, setContent, reset, editDescription, resetEditDescription }

}

export default useDescriptionForm;