export default function getDeadlineClass(deadline: string) {
    const today = new Date();
    const target = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const difference =
        Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (difference < 0) return "deadline-expired";
    if (difference <= 2) return "deadline-urgent";
    if (difference <= 7) return "deadline-soon";
    return "deadline-default";
}