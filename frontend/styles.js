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

const innerDivStyle = (top, left) => {
    return {
        top: top,
        left: left,
        position: "absolute",
        color: "white",
        fontSize: "20px",
        textAlign: "center"
    }
  }

module.exports = {
    inputStyle,
    buttonStyle,
    background,
    innerDivStyle
}