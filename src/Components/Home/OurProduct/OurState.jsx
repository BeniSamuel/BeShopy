import React from 'react'

const tabs = [
  { id: 'sale', label: 'Sale' },
  { id: 'hot', label: 'Hot' },
  { id: 'arrivals', label: 'New Arrivals' },
  { id: 'accessories', label: 'Accessories' },
]

const OurState = ({ setTab, tab }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-2">
      {tabs.map((item) => {
        const isActive = tab === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`px-4 py-2 rounded-full text-sm md:text-base font-poppins border transition-all ${
              isActive
                ? 'bg-[#224F34] text-white border-[#224F34] shadow-md'
                : 'bg-white text-[#224F34] border-[#C5F5D6] hover:bg-[#C5F5D6]'
            }`}
          >
            {item.label.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}

export default OurState