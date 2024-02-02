import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export default function Dashbord() {
    const { user } = useContext(UserContext)
    return (
        <>
            <h1>Dashbord</h1>
            {!!user && (<h2>Hi. {user.name}!</h2>)}
        </>
    )
}
