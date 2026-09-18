import ReactCalendar from "react-calendar";

export function Calendar() {
    const date = new Date();
    return (
        <ReactCalendar value={date} />
    );
}