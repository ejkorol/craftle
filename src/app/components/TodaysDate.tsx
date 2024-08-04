"use client";
import { useDate } from "@/utils/hooks/useDate";

const TodaysDate = () => {

  const { date } = useDate("MMMM do, yyyy");

  return (
    <p className="font-medium text-sm tracking-wide">
      {date}
    </p>
  );
}

export default TodaysDate
