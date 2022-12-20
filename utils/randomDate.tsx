export const randomDate = () => {
  const start = new Date(2022, 0, 1);
  const end = new Date(2023, 12, 1);

  const generateDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  ).toISOString();

  return new Date(generateDate).toLocaleString();
};
