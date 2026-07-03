export default function getDeadlineText(deadline: string) {
    const today = new Date();
    const target = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const difference =
        Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (difference < 0) {
        return "Expired";
    } else if (difference === 0) {
        return "Expires today";
    } else if (difference === 1) {
        return "Expires tomorrow";
    } else {
        return `Expires in ${difference} days`;
    }
}