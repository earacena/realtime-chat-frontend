import React, { useState, useContext, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { ThemeContext } from '../../../App';

function ThemeSwitcher() {

  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState<boolean>(theme === 'dark' ? true : false);

  useEffect(() => {
    setTheme(enabled ? 'dark' : 'light');
  }, [enabled, setTheme]);

  console.log(theme, enabled);

  return (
    <div
      className="p-5"
    >
      <Switch.Group>
        <div
          className="flex items-center"
        >
          <Switch.Label className="m-1 dark:text-white">Enable Dark Mode</Switch.Label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={
              `${enabled ? 'bg-slate-700' : 'bg-slate-400'} relative inline-flex h-[30px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`
            }
          >
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
                pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>

        </div>
      </Switch.Group>
    </div>
  );
}

export default ThemeSwitcher;