function formatDate(date: string | null):string {
    if(!date) return '-';

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export default formatDate