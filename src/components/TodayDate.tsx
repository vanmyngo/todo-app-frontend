export function TodayDate() {
  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const formattedDate = [
    today.toLocaleDateString(undefined, { weekday: "short" }),
    today.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  ].join(" · ");

  return (
    <time className="today-date" dateTime={localDate}>
      {formattedDate}
    </time>
  );
}
