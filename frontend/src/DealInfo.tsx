import React from 'react'

export const DealInfo = (props) => {
  return (
    // props.num + " " + props.deal.deal_name + " $" + props.deal.value
    <div className="w-3/4 justify-evenly flex flex-row p-1 border text-[20px] font-bold mx-auto">
     <div className=' '>{props.deal.deal_name}</div>
     <div className=' '>{props.deal.status}</div>
     <div className=' '>{"$" + props.deal.value}</div>
    </div>
  )
}
