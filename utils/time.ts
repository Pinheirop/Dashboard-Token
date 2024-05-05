export const currentMonthName = ()=>{
    const currMonthName = new Date().toLocaleString('default', { month: 'long' });
    return currMonthName
}