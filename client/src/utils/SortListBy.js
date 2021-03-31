/**
 * We don't want to mutate original array, so we make duplicate of it
 */
const copyArray = array => {
  if (!array) {
    return [];
  }

  return [...array];
};

/**
 * Sort title field in Ascending order A -> Z
 * @param {Array.<{title: String, visitDate: String}>} list - Log Entries
 */
const sortByNameAscending = list => copyArray(list).sort((a, b) =>
  a.title.localeCompare(b.title));

/**
 * Sort title field in Descending order Z -> A
 * @param {Array.<{title: String, visitDate: String}>} list - Log Entries
   */
const sortByNameDescending = list => sortByNameAscending(list).reverse();

/**
 * Sort visitDate field in order newest -> oldest
 * @param {Array.<{title: String, visitDate: String}>} list - Log Entries
 */
const sortByDateNewest = list => copyArray(list).sort((a, b) =>
  new Date(b.visitDate) - new Date(a.visitDate));

/**
 * Sort visitDate field in order oldest -> newest
 * @param {Array.<{title: String, visitDate: String}>} list - Log Entries
 */
const sortByDateOldest = list => sortByDateNewest(list).reverse();

// All sorting options
export const SORT_VALUES = [
  {
    name: 'Title Ascending',
    sortFunction: sortByNameAscending,
  },
  {
    name:  'Title Descending',
    sortFunction: sortByNameDescending,
  },
  {
    name: 'Newest to Oldest Date',
    sortFunction: sortByDateNewest,
    default: true,
  },
  {
    name: 'Oldest to Newest Date',
    sortFunction: sortByDateOldest,
  },
];

/**
 * Returns sorter list by sorting option
 * @param {Array} list - Log Entries list
 * @param {String} value - sorting type (see SORT_VALUES)
 */
const sortListBy = (list, value) => {
  if (!list) { return list; }

  // Find corresponding sorting function
  const { sortFunction } = SORT_VALUES.filter(sort => sort.name === value)[0];

  if (!sortFunction) { return list; }

  return sortFunction(list);
};

export default sortListBy;
