import React from 'react'
import {View, Text, TextInput} from "react-native";

export const TextHSPC = (props) => {
    return (
        <Text  {...props} style={[{fontFamily: 'HarmoniaSansProCyr-Regular'}, props.style]}/>
    )
};

export const TextRoboto = (props) => {
    return (
        <Text  {...props} style={[{fontFamily: 'Roboto'}, props.style]}/>
    )
};

export const TextOS = (props) => {
    return (
        <Text  {...props} style={[{fontFamily: 'OpenSans-Regular.ttf'}, props.style]}/>
    )
};

export const TextHelvetica = (props) => {
    return (
        <Text  {...props} style={[{fontFamily:props.style&&props.style.fontWeight==='bold'?'Helvetica-Bold': 'Helvetica'}, props.style]}/>
    )
};


export const TextInputHSPC = (props) => {
    return (
        <TextInput ref={props.myRef}  {...props} style={[{fontFamily: 'Roboto'}, props.style]}/>
    )
};
