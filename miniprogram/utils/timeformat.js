export default function timeformat(timestamp) {
  if (!timestamp) return;
  var date = new Date(timestamp + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '/');
};