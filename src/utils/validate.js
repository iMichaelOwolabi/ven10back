const isEmpty = (name, description, price, category, image, color) => {
  name = name.trim();
  description = description.trim();
  category = category.trim();
  image = image.trim()
  color = color.trim()

  if (!name || !description || !price || !category || !image || !color) {
    return true;
  }
}

const validateInput = {
  isEmpty,
}

module.exports = validateInput;
