export async function loadJson(fileName) {
  const response = await fetch(`/data/${fileName}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${fileName}`);
  }
  return response.json();
}