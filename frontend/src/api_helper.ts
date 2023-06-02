class api_helper {
    months: Array<string>;

    constructor() {
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"];
    }

    // Convert date to 'Month, YYYY'
    getDate = (d: Date) => {
        const month = this.months[d.getMonth()];
        const year = d.getFullYear();
        return `${month}, ${year}`;
    }

    // Convert date to 'YYYY-MM-DD' format
    convertToInput = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

export default api_helper;
