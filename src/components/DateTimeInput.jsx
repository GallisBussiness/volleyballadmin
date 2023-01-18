import { DatePicker, TimeInput } from "@mantine/dates"
import { parseISO } from "date-fns"
import { useState } from "react"


function DateTimeInput({value,onChange,label}) {
    const [time,setTime] = useState(value)
    const [date,setDate] = useState(value)
   const handleOnChangeDate = (v) => {
    setDate(v)
    const d = parseISO(new Date(v))
    console.log(v)
    onChange(d)
   }

   const handleOnChangeTime = (v) => {
    setTime(v)
    console.log(v)
    const d = parseISO(new Date(v))
    onChange(d)
   }

  return (
    <>
    <DatePicker value={date} onChange={handleOnChangeDate} label={label} withAsterisk/>
    <TimeInput value={time} onChange={handleOnChangeTime} />
    </>
  )
}

export default DateTimeInput