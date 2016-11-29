
const  { 
 grey300,grey500, green800,green500,greenA400,greenA100,
  white, darkBlack, fullBlack} = require('material-ui/styles/colors');
const getMuiTheme = require('material-ui/styles').getMuiTheme;
const MuiThemeProvider = require('material-ui/styles').MuiThemeProvider;
const fade = require('material-ui/utils/colorManipulator').fade;


export const customTheme = getMuiTheme({
  palette: {
     primary1Color: green500,
    primary2Color: green800,
    primary3Color: greenA100,
    accent1Color: greenA400,
    accent2Color: grey300,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.8),
    pickerHeaderColor: green500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
});


export const dialogStyles = {
  firstField:{
    marginTop:20
  },
  selectFieldWidth: {
    width: 100,
  },
  addButtonMargin:{
    marginLeft:10,
    marginTop:20
  },
  extraMarginTop:{
    marginTop:20
  },
  toogleStyle:{
    marginBottom:10,
  },
  dialogHeader: {
      backgroundColor: customTheme.palette.primary1Color
  }
};