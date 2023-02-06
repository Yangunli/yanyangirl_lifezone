export function currentFilter(arr) {
  const currentExp = arr
    .filter((exhibit) => new Date(exhibit.time.split("-")[1]) > new Date())
    .filter((exhibit) => new Date(exhibit.time.split("-")[0]) < new Date())
    .sort(
      (a, b) => new Date(a.time.split("-")[1]) - new Date(b.time.split("-")[1])
    );
  return currentExp;
}

export function upComingFilter(arr) {
  const upComingExp = arr
    .filter((exhibit) => new Date(exhibit.time.split("-")[1]) > new Date())
    .filter((exhibit) => new Date(exhibit.time.split("-")[0]) > new Date())
    .sort(
      (a, b) => new Date(a.time.split("-")[1]) - new Date(b.time.split("-")[1])
    );
  return upComingExp;
}
