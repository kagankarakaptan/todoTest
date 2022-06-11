
export default function Header(props) {
    return (
        <div className="header">
            <img
                src="https://iconarchive.com/download/i43462/fasticon/easter-rabbits/pink-rabbit.ico"
                width="50"
            ></img>
            <span>{props.type}</span>
        </div>
    )
}
