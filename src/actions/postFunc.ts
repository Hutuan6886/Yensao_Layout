import { toast } from "react-toastify"

const configPost = <T>(data: T): RequestInit => {
    return {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
}

export const postNewCategory = async <T>(data: T) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, configPost<T>(data))
        if (res.ok) {
            toast(res.statusText, { type: 'success' })
            return res.json()
        } else {
            toast(res.statusText, { type: 'error' })
        }
    } catch (error) {
        toast("SERVER_ERROR_[Post category fail!]", { type: 'error' })
        console.log("SERVER_ERROR_[Delete category fail!]", error);
    }
}

export const postNewMass = async <T>(data: T) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL} / api / mass`, configPost<T>(data))
        if (res.ok) {
            toast(res.statusText, { type: 'success' })
            return res.json()
        }

        toast(res.statusText, { type: 'error' })
    } catch (error) {
        toast("SERVER_ERROR_[Post mass fail!]", { type: 'error' })
        console.log("SERVER_ERROR_[Delete category fail!]", error);
    }
}
