import { lightTheme, darkTheme } from '../config/colors.js';
import { changeStatusbarColor } from '../functions.js';

export const triggerTheme = (themeValue: string, setContext: any) => {
  return new Promise(async (resolve) => {
    setContext('DARK_THEME', themeValue === 'dark' ? true : false);
    setContext('THEME_SETTINGS', themeValue === 'dark' ? 'Dark' : 'Light');
    setContext('COLORS', themeValue === 'dark' ? darkTheme : lightTheme);
    changeStatusbarColor(
      themeValue === 'dark' ? lightTheme.header : lightTheme.header
    );
    resolve();
  });
};
export const changeTheme = async (changedToDark: boolean, setContext: any) => {
  setContext('DARK_THEME', changedToDark);
  setContext('THEME_SETTINGS', changedToDark ? 'Dark' : 'Light');
  setContext('COLORS', changedToDark ? darkTheme : lightTheme);
  changeStatusbarColor(changedToDark ? lightTheme.header : lightTheme.header);

  return;
};

export const setThemeDefault = (setContext: any) => {
  return new Promise(async (resolve) => {
    setContext('THEME_SETTINGS', 'light');
    setContext('DARK_THEME', false);
    setContext('COLORS', lightTheme);
    changeStatusbarColor(lightTheme.header);
    resolve();
  });
};

export const setTheme = async (setContext: any) => {
  return new Promise(async (resolve) => {
      await setThemeDefault(setContext);
    resolve();
  });
};
