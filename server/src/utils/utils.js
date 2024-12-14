export const GetFirstAndLastDate = (year, month) => 
{
    var firstDayOfMonth = new Date(year, month-1, 2);
    var lastDayOfMonth = new Date(year, month, 1);

    return [firstDayOfMonth.toISOString().substring(0, 10), lastDayOfMonth.toISOString().substring(0, 10)]; 
}

