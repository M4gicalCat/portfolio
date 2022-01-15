module.exports.getDate = () => {
    let d = new Date(),
        month = `${(d.getMonth() + 1)}`,
        day = `${d.getDate()}`,
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return `${day}-${month}-${year}`
}

module.exports.getAge = () => {
    let today = new Date();
    let birthDate = new Date(`04-14-2003`);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;

}