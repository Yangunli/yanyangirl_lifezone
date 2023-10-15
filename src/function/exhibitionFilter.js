export function currentFilter(arr) {
  const _now =new Date()
  const _currentDate= `${_now.getFullYear()}/${_now.getMonth()+1}/${_now.getDate()}`
  const currentExp = arr
    .filter((exhibit) => (new Date(exhibit.time.split("-")[1]) > new Date()||exhibit.time.split("-")[1]===_currentDate))
    .filter((exhibit) => new Date(exhibit.time.split("-")[0]) < new Date())
    .sort(
      (a, b) => new Date(a.time.split("-")[1]) - new Date(b.time.split("-")[1])
    );
  return currentExp;
}

export function upComingFilter(arr) {
  const upcomingExp = arr
    .filter((exhibit) => new Date(exhibit.time.split("-")[1]) > new Date())
    .filter((exhibit) => new Date(exhibit.time.split("-")[0]) > new Date())
    .sort(
      (a, b) => new Date(a.time.split("-")[1]) - new Date(b.time.split("-")[1])
    );
  return upcomingExp;
}
