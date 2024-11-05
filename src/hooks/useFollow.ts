import useLocalStorage from "./useLocalStorage";

export type followEntry = {
    mangaTitle: string,
    cover: string,
}

export default function useFollow() {
    const [follow, setFollow] = useLocalStorage<Record<string, followEntry>>('followedManga', {})

    const addFollow = (mangaId: string, data: followEntry) => {
        setFollow((value) => ({ [mangaId]: data, ...value, }))
    }

    const removeFollow = (mangaId: string) => {
        setFollow((value) => {
            delete value[mangaId]
            return { ...value }
        })
    }

    return { follow, setFollow, addFollow, removeFollow }
}