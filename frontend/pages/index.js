import Image from 'next/image'
import Link from 'next/link'
import { buttonStyle, background, innerDivStyle } from '../styles'

const HomePage = () => {
    return (
        <div style={background}>
            <div>
                <Image src="https://wallpaperaccess.com/full/133885.jpg" alt="Friendship" layout="fill" />
            </div>
            <div style={innerDivStyle(100, 290)}>
                <h1>Welcome to Find a Friend!</h1>
                <h3>A matching platform for students at Penn.</h3>
                <Link href="/login">
                    <a><button style={buttonStyle}>Login</button></a>
                </Link>
                <Link href="/signup">
                    <a><button style={buttonStyle}>Sign Up</button></a>
                </Link>
                <p>
                    Have you ever felt lonely eating at a dining hall? Do you want a study buddy? Need somebody to spend your Friday night with?
                </p>
                <p>
                    With Find a Friend, you can request to get matched with a fellow schoolmate to join you!
                </p>
                <br />
                <p>
                    Matching is based on user discretion: you can choose to share as much, or as little, information as you want.
                </p>
                <p>
                    If you like your match, we offer the ability to quick-share your social media directly on Find a Friend!
                </p>
                <p>
                    Join us and build strong, lasting relationships!
                </p>
            </div>
        </div>
    )
  }
  
  export default HomePage