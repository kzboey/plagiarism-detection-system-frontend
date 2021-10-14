export const formatDate =(date) => {
    let patt1 = /[TZ]/g; 
    let dateValue = date.toISOString().split(patt1)[0];
    let timeValue = date.toISOString().split(patt1)[1].slice(0,8);
    return dateValue + " " + timeValue;
}