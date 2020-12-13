import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

  



export const LoadingScreen = props => {
    const wrapper = {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999999,
      position: "absolute",
      top: 0, 
      bottom: 0,
      backgroundColor: props.colors.modal,
    }

    const text = {
      fontSize: 18,
      color: props.colors.gray,

    }

    return (
      <div style={wrapper}>
      <CircularProgress style={{color: props.colors.primary}} />
      <p style={text}>Loading</p>
      </div>
     
      );
    }
  



