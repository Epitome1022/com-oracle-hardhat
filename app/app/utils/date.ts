
export const convertTimeStamp = (timestamp: any)=> {

    // Convert Unix timestamp to milliseconds
    const milliseconds = timestamp;

    // Create a new Date object
    const date = new Date(milliseconds);

    // Get the different components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date as desired
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}