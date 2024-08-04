import { useState, useEffect } from "react";
import { format } from "date-fns";

export const useDate = (formatStyle: string) => {

  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const d = formatDate(formatStyle);
    setDate(d);
  }, []);

  const formatDate = (formatStyle: string) => {
    const newDate = getDate();
    const formattedDate = format(newDate, formatStyle);
    return formattedDate;
  };

  const getDate = () => {
    const newDate = new Date();
    return newDate;
  };

  return { date };
};
