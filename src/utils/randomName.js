const names = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eva",
  "Frank",
  "Grace",
  "Henry",
  "Ivy",
  "Jack",
];

// Function to generate a random name
export function generateRandomName() {
  const randomIndex = Math.floor(Math.random() * names.length);
  const randomName = names[randomIndex];
  return randomName;
}

export function fixedRandomName(index) {
  return names[index % names.length];
}
