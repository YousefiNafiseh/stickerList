export const buildQueryString = (category, sort, page) => {
  let urlBase = `/category/${category}`
  let queryString = ''
  if (!!sort)
    queryString += `${getPrefix(queryString)}sort=${sort}`
  if (!!page)
    queryString += `${getPrefix(queryString)}page=${page}`

  return urlBase + queryString;
}

const getPrefix = (quesryString) => {
  return !quesryString && quesryString.length == 0 ? '/?' : '&';
}

export const getData = async () => {
  const response = await fetch('http://localhost:3000/post.json');
  const data = response.json();
  return data;
}

export const filterData = (data, category, sort, page) => {
  if (!!category && category.length > 0) {
    let key = `${category}`.toLowerCase().replace(/-/g, ' ');
    data = data.filter(x => !!x.product_categories.find(item => item.name.toLowerCase() === key));
  }
  switch (sort) {
    case 'پرفروش-ترین':
      data = data.sort((a, b) => Math.max(...b.product_variants.map(z => z.max_no_of_order)) - Math.max(...a.product_variants.map(z => z.max_no_of_order)));
      break;
    case 'جدیدترین':
      data = data.sort((a, b) => new Date(b['created_at']) - new Date(a['created_at']));
      break;
  }
  const pageNumber = page ?? 1

  return {
    data: [...data.slice(0, pageNumber * 20)],
    totalCount: data.length
  }
}
