/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtendChapter } from '@/api/extend'
import './Dropdown.scss'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

type DropdownType = {
  title?: string,
  data?: any[],
  isOpen: boolean
  state?: any,
  setState: React.Dispatch<React.SetStateAction<any>>
  chapters?: Record<string, ExtendChapter[]>
}

export default function Dropdown({ title, data = undefined, isOpen, state, setState, chapters = undefined }: DropdownType) {
  return (
    <div className='w-full h-full bg-gray-200 grow rounded-md relative transition-all flex items-center justify-between'>
      <div>
        <span className='block text-sm ml-3'>{title}</span>
        <span className='block ml-3'>{state}</span>
      </div>
      <Icon icon='ep:arrow-down-bold' className={`mr-3 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200 ease-in-out`} />
      <div className={`absolute top-full w-full max-h-[400px] overflow-auto rounded-md dropdown z-50 bg-gray-200 p-1 select-none ${isOpen ? 'active' : ''}`}>
        {data?.map((data, index) =>
          <div key={index} className={`w-full text-lg py-1 pl-2 flex items-center hover:bg-primary hover:text-white mb-1 rounded-md ${state == data ? 'bg-primary text-white' : ''} cursor-pointer`} onClick={() => setState(data)}>
            {data}
          </div>)}

        {chapters && Object.entries(chapters).reverse().map(([key, value], idx) =>
          <fieldset className="border-t-2 border-solid border-gray-300 pt-1" key={idx}>
            <legend className='text-center px-3 text-sm'>Volume {key}</legend>
            {value.map((data, index) => <Link to={`/chapter/${data.id}`} key={index} className={`w-full text-lg py-1 pl-2 flex items-center hover:bg-primary hover:text-white mb-1 rounded-md ${state == data.attributes.chapter ? 'bg-primary text-white' : ''} cursor-pointer`} onClick={() => setState(data)}>
              {data.attributes.chapter}
            </Link>)}
          </fieldset>
        )}
      </div>
    </div>
  )
}
