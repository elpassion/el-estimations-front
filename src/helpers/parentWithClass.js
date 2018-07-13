export default function parentWithClass(element, parentClassName) {
  if (element.classList.contains(parentClassName)) {
    return element;
  }

  let elem = element;
  while (elem !== null) {
    if (elem.classList.contains(parentClassName)) {
      return elem;
    }
    elem = elem.parentElement;
  }

  return null;
}
