export default function (date) {
  const originalDate = new Date(date);

  const day = originalDate.getDate();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const year = originalDate.getFullYear();

  const hours = originalDate.getHours().toString().padStart(2, '0');
  const minutes = originalDate.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formattedDate;
}
