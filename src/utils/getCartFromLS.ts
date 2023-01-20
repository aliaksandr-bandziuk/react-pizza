export const getCartFromLS = () => {
  const data = localStorage.getItem('basket');
  return data ? JSON.parse(data) : [];
}