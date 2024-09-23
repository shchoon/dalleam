export default function UniteSaved(userId: number) {
  const saved = localStorage.getItem('saved');

  if (!saved) {
    return;
  }

  const savedList = JSON.parse(saved);

  if (!savedList[0]) {
    return;
  }

  const newSavedList = { [userId]: savedList[0] };
  localStorage.setItem('saved', JSON.stringify(newSavedList));
}
