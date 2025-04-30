import React from 'react'

interface deal {
    account_id: number; // Assuming 'db.accountsMap' can hold various types of values
    name: string;
    start_date: string; // Assuming ISO 8601 format (YYYY-MM-DD)
    end_date: string;   // Assuming ISO 8601 format (YYYY-MM-DD)
    value: number;
    status: "Negotiation" | "Proposal Sent" | "Closed Won" | "Closed Lost" | string; // Example of possible statuses, adjust as needed
  }

export const DealInfo = (deal: any, num: number) => {
  return (
    <div className="text-[20px] font-bold mx-auto">{num + deal.deal_name + " $" + deal.value}</div>
  )
}
