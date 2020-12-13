import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const MySwitch = (props: any) => {
    const PrimarySwitch = withStyles({
      switchBase: {
        '&$checked': {
        },
        '&$checked + $track': {
        },
      },
      checked: {},
      track: {},
    })(Switch);

    return (
      <PrimarySwitch
      value={props.value}
      checked={props.checked}
      onChange={props.onValueChange}
      />

    )
}

export default MySwitch;
