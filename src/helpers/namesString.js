export default function namesString(collection) {
  return collection.map(item => item.name).join(', ');
}
