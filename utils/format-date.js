export default function (date) {
  const originalDate = new Date(date);

  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();

  const hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formattedDate;
}
