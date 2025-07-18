export const dateFormate = (date) => {

    // Create a Date object from the input date string
    const inputDate = new Date(date);

    // Define the month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Extract day, month, and year from the Date object
    const day = inputDate.getUTCDate();
    const monthIndex = inputDate.getUTCMonth();
    const year = inputDate.getUTCFullYear();

    // Create the formatted date string
    const formattedDateString = `${monthNames[monthIndex]} ${day}, ${year}`;

    // console.log(formattedDateString);
    return formattedDateString;
}