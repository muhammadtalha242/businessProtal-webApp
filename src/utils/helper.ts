export const incrementNumber = (currentNumber: number) => () => (currentNumber = currentNumber + 1);

export const getRandom = (name: string) => {
  return (chars: string, len: number) => {
    return () => {
      return `${name}_` + [...Array(len)].map((i) => chars[Math.floor(Math.random() * chars.length)]).join('');
    };
  };
};
