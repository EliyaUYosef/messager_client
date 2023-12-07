
export function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    // If str is not a string or an empty string, return an empty string.
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatTime(inputDate) {
  const date = new Date(inputDate);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Add leading zero if needed
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

export function formatDateAndTime(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Add leading zero if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedDay??'0'}/${formattedMonth??'0'} ${formattedHours??'00'}:${formattedMinutes??'00'}`;
}

export async function getUserProfile(token) {
  try {
      const response = await fetch(
        `https://messager-api-c2cd41880be6.herokuapp.com/api/auth/profile`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
            Authorization: authToken
          }
        }
      );

      const data = await response.json();
      if (data.message === "User profile data.") {
          console.log("RESPONSE", data);
        setGlobalData({...globalData, user : data.data})
        router.push('/');
        return "0";
      }
      return "0";
    } catch (error) {
      console.error("Error during login:", error);
      return "0";
    }
}