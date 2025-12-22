export const format = (date: Date) => {
    return new Date(date).toLocaleDateString("en", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}