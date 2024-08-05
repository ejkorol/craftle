import { useTheme as useNextTheme } from "next-themes";
import { useState, useEffect } from "react";

export const useTheme = (theme = 'dark') => {

  const { setTheme } = useNextTheme();
  const [ desiredTheme, setDesiredTheme ] = useState(theme);

  useEffect(() => {
    setTheme(desiredTheme);
  }, [desiredTheme]);

  const changeTheme = () => {
    if (desiredTheme === 'dark') {
      setDesiredTheme('light');
    } else if (desiredTheme === 'light') {
      setDesiredTheme('dark');
    }
  };

  return { desiredTheme, setDesiredTheme, changeTheme };

}
