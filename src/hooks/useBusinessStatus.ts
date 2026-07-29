import { useEffect, useMemo, useState } from "react";

const weekdayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

interface BusinessStatusOptions {
  openHour: number;
  closeHour: number;
  timezone: string;
  serviceDays?: string;
}

const getTimeParts = (date: Date, timezone: string) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );

  return {
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    weekday: weekdayMap[parts.weekday] ?? 0,
  };
};

export const useBusinessStatus = ({
  openHour,
  closeHour,
  timezone,
  serviceDays = "",
}: BusinessStatusOptions) => {
  const [now, setNow] = useState(() => new Date());

  const configuredDays = useMemo(
    () =>
      serviceDays
        .split(",")
        .map((day) => Number.parseInt(day.trim(), 10))
        .filter((day) => day >= 0 && day <= 6),
    [serviceDays],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    try {
      const { minutes, weekday } = getTimeParts(now, timezone);
      const openMinutes = openHour * 60;
      const closeMinutes = closeHour * 60;
      const isServiceDay =
        configuredDays.length === 0 || configuredDays.includes(weekday);
      const isOpen =
        isServiceDay && minutes >= openMinutes && minutes < closeMinutes;

      return {
        isOpen,
        daysConfigured: configuredDays.length > 0,
      };
    } catch {
      return {
        isOpen: false,
        daysConfigured: configuredDays.length > 0,
      };
    }
  }, [closeHour, configuredDays, now, openHour, timezone]);
};
