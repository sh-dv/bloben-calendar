import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const themeLight = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#3F51B5',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: 'rgba(0, 0, 0, 0.87)',
      },
      daySelected: {
        backgroundColor: '#3F51B5',
      },
      dayDisabled: {
        color: lightBlue['100'],
      },
      current: {
        color: lightBlue['900'],
      },
    },
    MuiPickersModal: {
      backgroundColor: 'white',
      zIndex: 9999,
      dialogAction: {
        backgroundColor: 'white',
        color: lightBlue['400'],
      },
      MuiDialogActions: {
        backgroundColor: 'white',
      },
    },
    MuiDialogActions: {
      backgroundColor: 'white',
    },
  },
});

const themeDark = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#3F51B5',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: lightBlue.A700,
      },
      daySelected: {
        backgroundColor: '#3F51B5',
      },
      dayDisabled: {
        color: lightBlue['100'],
      },
      current: {
        color: lightBlue['900'],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: lightBlue['400'],
      },
    },
    MiuiDialogActions: {
      backgroundColor: 'white',
    },
  },
});
const CustomDateTimePicker = (props) => {
  return (
    <div style={{ visibility: 'hidden', fontSize: 16 }}>
      <ThemeProvider theme={props.darkTheme ? themeDark : themeLight}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            open={props.open}
            onChange={props.onChange}
            value={props.value}
            onAccept={props.onClose}
            onClose={props.onClose}
            ampm={false}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
};

export default CustomDateTimePicker;
