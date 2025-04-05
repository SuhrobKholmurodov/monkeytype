import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDarkSide } from '~/hooks/useDarkSide';

export const Switcher = () => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === 'light' ? true : false);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    setDarkSide(checked);
  };

  return (
    <div
      className="hover:bg-gray-600 bg-gray-700 dark:bg-gray-400 dark:text-gray-800 dark:hover:bg-gray-100 hover:duration-300 px-3 py-[10px] hover:text-[#e2b714] dark:hover:text-[#e2b714] hover:cursor-pointer items-center"
      onClick={() => toggleDarkMode(!darkSide)}
    >
      <div className="ml-[-1px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: darkSide ? 0 : 1, scale: darkSide ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun size={21} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: darkSide ? 1 : 0, scale: darkSide ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon size={21} />
        </motion.div>
      </div>
      <p className="ml-[26px]">
        {darkSide ? (
          <span className="font-bold">Light mode</span>
        ) : (
          <span className="font-bold">Dark mode</span>
        )}
      </p>
    </div>
  );
};
