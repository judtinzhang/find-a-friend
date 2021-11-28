import Image from 'next/image'
import Link from 'next/link'


const center = {
    display: "flex",
    justifyContent: "center",
    color: "#CCD5FF"
}

const color = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#3D5ADA",
}

const buttonStyle = {
    color: "#CCD5FF",
    background: "#7785C9",
    borderRight: "0px",
    borderBottom: "0px",
    margin: "3px",
    fontSize: "15px"
}

const HomePage = () => {
    return (
        <>
            <div style={color}>
                <br />
                <div style={{ position: "absolute", top: 20, right: 20 }}>
                    <Link href="/login">
                        <a><button style={buttonStyle}>Login</button></a>
                    </Link>
                    <br />
                    <Link href="/signup">
                        <a><button style={buttonStyle}>Sign Up</button></a>
                    </Link>
                </div>
                

                <h1 style={center}>Welcome to Find a Friend!</h1>
                <div style={center}>
                        <Image src="https://wallpaperaccess.com/full/133885.jpg" alt="Friendship" width={1250} height={650} />
                </div>
                <p></p>
            </div>
        </>
        
    )
  }
  
  export default HomePage