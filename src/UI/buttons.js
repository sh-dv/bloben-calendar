import React from 'react';
import { NavLink } from "react-router-dom";
import './buttons.css';
import addIcon from '../img/icons/add.svg';

export class Button extends React.Component {
  

  render() {
    const buttonContainer = {
      display: "flex",
      flexDirection: "column",
    }

    const buttonStyle = {
      backgroundColor: this.props.background,
      borderRadius: "12px",
      borderColor: this.props.background,
      marginLeft: "25%",
      marginRight: "25%",
      width: "150px",
      margin: "0 auto",
      padding: "10px",
      boxShadow: "2px 3px 3px 0px rgba(41, 41, 41, .3)",
      cursor: "pointer"
    }

    const buttonText = {
      fontSize: "20px",
      color: this.props.color,
      margin: 0,
      textAlign: "center"
    }

    return (
      <div style={buttonContainer}>
        <div onClick={this.props.onClick} style={buttonStyle}>
        <p style={buttonText}>{this.props.title}</p>
        </div>
      </div>

    )

  }
}

export class Fab extends React.Component {

  render() {

    const fabStyle = {
      display: "flex",
      position: "fixed",
      bottom: "70px",
      right: "25px",
      width: "55px",
      height: "55px",
      borderRadius: "27.5px",
      backgroundColor: "dodgerblue",
      color: "white",
      zIndex: 50,
      justifyContent: "center",
      boxShadow: "0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)",
      cursor: "pointer",
    }

    const fabIcon = {
      color: "mintcream",
      filter: "invert(89%) sepia(7%) saturate(482%) hue-rotate(79deg) brightness(111%) contrast(109%)",
      margin: "auto",
      height: 30,
      width: 30,
    }

    return (
      <div>
      {this.props.route
      ?      <NavLink to={this.props.route}>
      <div style={fabStyle}>
      <img src={addIcon} style={fabIcon} />
      </div>
    </NavLink>
      :  <div style={fabStyle} onClick={this.props.onClick}>
      <img src={addIcon} style={fabIcon} />
      </div>
      }  

      </div>
    )

  }
}

export class FabFunc extends React.Component {

  render() {

    const fabStyle = {
      display: "flex",
      position: "fixed",
      top: "25px",
      right: "25px",
      width: "55px",
      height: "55px",
      borderRadius: "27.5px",
      backgroundColor: this.props.color,
      color: "white",
      zIndex: 50,

      justifyContent: "center",
      boxShadow: "0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)",
      cursor: "pointer",
    }

    const fabIcon = {
      color: "white",
      margin: "auto",
      fontSize: "30px"
    }

    return (
        <div style={fabStyle} onClick={this.props.onClick}>
                  <i style={fabIcon} className="icon ion-md-checkmark" />

        </div>
    )

  }
}

export class ToogleSwitch extends React.Component {
  render() {
    return (
        <label className="switch">
        <input onClick={this.props.changeNotification} name="toogle" type="checkbox" checked={this.props.setNotification} />
        <span className="slider round"></span>
        </label>
    )
  }
}

export class Checkbox extends React.Component {
    render() {
        const checkboxContainer = {
            display: "flex",
            flexDirection: "row"
        }
        const normalText = {
          margin: 0,
          padding: 0,
          color: "white"
        }
        const  markedText = {
          textDecorationLine: 'line-through', textDecorationStyle: 'solid',
          color: "#929390",
          margin: 0,
          padding: 0,
        }

      return (
        <div style={checkboxContainer}>
        <label className="container">
        <NavLink to={{ pathname:"/taskdetail", state: { id:this.props.id, type: "task", text: this.props.text, tag: this.props.tag, isChecked:this.props.isChecked, reminder: this.props.reminder, notes: this.props.notes } }}>
        {this.props.isChecked
        ? <p style={markedText}>{this.props.text}</p>
        : <p style={normalText}>{this.props.text}</p>
        }
        </NavLink>
        <input type="checkbox" checked={this.props.isChecked}  />
        <span onClick={this.props.onClick} className="checkmark"></span>
      </label>
      </div>
      )
    }
  }
  