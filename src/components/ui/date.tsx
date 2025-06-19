import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "./button";

export default function Date({date, setDate} : {date: Date, setDate: (date: Date) => void}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar required mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
