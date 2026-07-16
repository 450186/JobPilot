export default function formatRelativeDate(date: string) {
    const today = new Date();
    const target = new Date(date);

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const difference =
        Math.ceil((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    if(difference < 0) {
        return "In the future";
    }
    if (difference === 0) {
        return "Today";
    }

    if (difference === 1) {
        return "Yesterday";
    }

    return `${difference} days ago`;
}