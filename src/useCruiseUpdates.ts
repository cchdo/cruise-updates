import { useEffect, useState } from "react";

const DATA_URL = "/cruise_updates.json";

interface CruiseUpdate {
  date_updated: string;
  sect_id: string;
  year: number;
  expocode: string;
  update_type: string;
}

interface GroupedUpdates {
  [monthYear: string]: CruiseUpdate[];
}

export function useCruiseUpdates() {
  const [updates, setUpdates] = useState<GroupedUpdates>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const response = await fetch(DATA_URL);
        const data: CruiseUpdate[] = await response.json();

        // Group by month & year
        const grouped: GroupedUpdates = data.reduce((acc, update) => {
          const date = new Date(update.date_updated);
          const key = date.toLocaleString("en-US", { month: "long", year: "numeric" });

          if (!acc[key]) acc[key] = [];
          acc[key].push(update);

          return acc;
        }, {} as GroupedUpdates);

        // Sort months in descending order
        const sortedEntries = Object.entries(grouped).sort((a, b) =>
          new Date(b[0]).getTime() - new Date(a[0]).getTime()
        );

        setUpdates(Object.fromEntries(sortedEntries));
      } catch (error) {
        console.error("Error fetching cruise updates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUpdates();
  }, []);

  return { updates, loading };
}
