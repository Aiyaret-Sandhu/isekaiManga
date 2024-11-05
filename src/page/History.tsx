import { HistoryCard } from "@/components/HistoryCard"
import useReadingHistory from "@/hooks/useReadingHistory"
import isEmpty from "@/utils/isEmpty"
import { Icon } from "@iconify/react"
import { useNavigate } from 'react-router-dom'
import empty from "../assets/empty2.jpg"

export default function History() {
  const navigate = useNavigate()
  const { history, removeHistory } = useReadingHistory()

  return (
    <div className="w-full px-5 min-h-screen">
      <div className="flex items-center gap-3 mb-5 cursor-pointer" onClick={() => navigate(-1)}> <Icon icon="ph:arrow-left-bold" width={24} /><h2 className="text-xl">History</h2></div>

      {isEmpty(history)
        ? <div className="flex flex-1 items-center justify-center w-full h-[70vh] flex-col opacity-50">
          <img src={empty} />
          <p className="text-lg">Reading history is empty</p>
        </div>
        : <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
          {Object.entries(history).map(([mangaId, data], index) => <HistoryCard key={index} id={mangaId} data={data} handleDelete={() => removeHistory(mangaId)} />)}
        </div>}
    </div>
  )
}
