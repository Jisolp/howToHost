//validate name
const isValidName = (customer_name) => {
    return typeof customer_name === 'string' && customer_name.trim() !== ' '; //checks the name is string and not empty 
}
//validate phone number
const isValidPhoneNum = (phone_number) => {
    const cleanPhone = phone_number.replace(/[^0-9]/g, ' '); 
    return /^[0-9]{10}$/.test(cleanPhone);
}

//validate party size 
const isValidParty = (party) =>{
    if (party === undefined || party === null) return false;
    const num = Number(party);
    return Number.isInteger(num) && num > 0;
}

//validate time 
const isValidTime = (time) => {
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/; 
    return timeFormat.test(time);
  };
  
module.exports = {
    isValidName,
    isValidParty,
    isValidPhoneNum,
    isValidTime
};