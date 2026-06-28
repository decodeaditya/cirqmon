import React from 'react'
import useSound from 'use-sound';

const Button = ({ btn }) => {

    return (
        <div key={btn.id} className="relative group" onClick={btn.onclick}>
            <button
                className={`relative w-16 h-16 flex items-center justify-center ${btn.color} border-4 border-black rounded-2xl shadow-[0_6px_0_0_#000] transition-all duration-75 ease-out hover:-translate-y-1 hover:shadow-[0_10px_0_0_#000] hover:rotate-6 active:translate-y-1.5 active:shadow-[0_0_0_0_#000] active:rotate-0 cursor-pointer select-none`}
            >
                <span className="absolute top-1.5 left-1.5 w-3 h-1 bg-white/80 rounded-full -rotate-12 pointer-events-none" />
                <span className="text-3xl transform group-hover:scale-110 transition-transform pointer-events-none">
                    {btn.icon}
                </span>
            </button>

            <div className="absolute left-[calc(100%+18px)] top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0_0_#000] font-black text-black text-sm uppercase tracking-wider opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:-rotate-3 transition-all duration-150 ease-out whitespace-nowrap z-20">
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l-4 border-b-4 border-black rotate-45" />
                {btn.text}
            </div>

        </div>
    )
}

export default Button