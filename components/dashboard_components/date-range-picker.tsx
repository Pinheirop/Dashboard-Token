"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { dateTimeSlider } from "@/shared/temp_vars"

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(currentYear, currentMonth, currentDay),
    to: new Date(currentYear, currentMonth, currentDay),
  })

  React.useEffect(()=>{
    dateTimeSlider.from = `${date?.from?.getFullYear()}-${date?.from?.getMonth()!+1}-${date?.from?.getDate()}`
    dateTimeSlider.to = `${date?.to?.getFullYear()}-${date?.to?.getMonth()!+1}-${date?.to?.getDate()}`
  },[date])



  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}