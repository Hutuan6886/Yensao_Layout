import { toast } from "react-toastify"

const configPut = <T>(data: T): RequestInit => {
    return {
        credentials: 'include',
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
}

export const updateCategory = async <T>(id: string, data: T) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`, configPut<T>(data))
        if (res.ok) {
            toast(res.statusText, { type: 'success' })
            return res.json()
        } else {
            toast(res.statusText, { type: 'error' })
        }
    } catch (error) {
        toast("SERVER_ERROR_[Post category fail!]", { type: 'error' })
        console.log("SERVER_ERROR_[Post category fail!]", error)
    }
}

export const updateMass = async <T>(id: string, data: T) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mass/${id}`, configPut<T>(data))
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