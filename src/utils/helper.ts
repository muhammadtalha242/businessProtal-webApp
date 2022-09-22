export const incrementNumber = (currentNumber: number) => () => (currentNumber = currentNumber + 1);

export const getRandom = (name: string) => {
  return (chars: string, len: number) => {
    return () => {
      return `${name}_` + [...Array(len)].map((i) => chars[Math.floor(Math.random() * chars.length)]).join('');
    };
  };
};


export const normalize_data = (x: number, mini: number, maxi: number) => {
  return (x - mini) / (maxi - mini);
};

export const ToProperCase = function (str: String) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const matchPath = (url: string, target: string): boolean => {
  const urls = url.split('/');
  const targets = target.split('/');
  const isSameLen = urls.length === targets.length;
  if (isSameLen) {
    for (let index = 0; index < urls.length; index++) {
      if (targets[index][0] !== ':') if (urls[index] !== targets[index]) return false;
    }
    return true;
  }
  return false;
};
