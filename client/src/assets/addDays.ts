export default function addDays(date: any, days: number) {
    const dates = new Date(date);
    dates.setDate(dates.getDate() + days);
   // const array = dates.toLocaleDateString().toString().split('/');
    
    return(JSON.stringify(dates).slice(1,11))
    
    // let day: string ='';
    // let month: string ='';
    // array[1].length < 2 ? day = '0' + array[1] : day = array[1];
    // array[0].length < 2 ? month = '0' + array[0] : month = array[0];

    // const formatedDate = array[2] + '-' + month + '-' + day;
    // return formatedDate.toString();
}