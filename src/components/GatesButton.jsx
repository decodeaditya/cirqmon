import React from 'react'
import { useDraggable } from '@dnd-kit/react';

const GatesButton = ({ g, handleDragStart, gateClicked }) => {

    const { ref, listeners, attributes } = useDraggable({
        id: g.id,
    });

    return (
        <div
            key={g.id}
            onClick={(e) => gateClicked(e, g.id)}
            ref={ref} {...listeners} {...attributes}
            className={`
              group/gate relative shrink-0
              w-12 h-12 sm:w-14 sm:h-14
              ${g.bg} ${g.text} 
              border-2 sm:border-3 border-black rounded-xl sm:rounded-2xl 
              shadow-[2px_2px_0px_0px_#000] 
              hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] hover:rotate-3
              active:translate-x-0.5 active:translate-y-0.5 active:shadow-none active:rotate-0
              transition-all duration-100 
              flex flex-col items-center justify-center 
              cursor-grab active:cursor-grabbing
            `}
        >
            <span className="font-black text-xl sm:text-2xl leading-none pointer-events-none">{g.name}</span>

        </div>
    )
}

export default GatesButton