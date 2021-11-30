const inputStyle = {
    marginTop: "2px",
    marginBottom: "3px"
  }

const buttonStyle = {
    color: "#4B63D8",
    margin: "3px",
    fontSize: "16px"
}

const background = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#9DADFD",
}

const innerDivStyle = (x, y) => {
    return {
        position: "fixed",
        color: "white",
        fontSize: "17px",
        textAlign: "center",
        top: "50%",
        left: "50%",
        transform: `translate(-${x}%, -${y}%)`
    }
  }

const requestStyle = {
    position: "fixed",
    color: "white",
    fontSize: "17px",
    textAlign: "left",
    top: "2%",
    left: "2%"
}

const historyStyle = {
    position: "fixed",
    color: "white",
    fontSize: "17px",
    textAlign: "left",
    top: "2%",
    right: "2%"
}

const formsStyle = {
    backgroundColor: "#B99976", 
    color: "black",
    padding: 10,
    border: "3px solid #964B00" 
}

const scrollStyle = {
    overflow: "scroll",
    textAlign: "justify",
    maxWidth: "60vh",
    maxHeight: "80vh"
}

module.exports = {
    inputStyle,
    buttonStyle,
    background,
    innerDivStyle,
    formsStyle,
    requestStyle,
    historyStyle,
    scrollStyle
}