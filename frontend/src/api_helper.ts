
class api_helper {
    months: Array<string>;

    constructor() {
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"];
    }

    getDate = (d: Date) => {
        return "" + this.months[d.getMonth()] + ", " + d.getFullYear();
    }
}

export default api_helper;
