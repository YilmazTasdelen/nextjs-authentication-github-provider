import React from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react"

const account = (props) => {
    // const { data: session } = useSession({ required: true })
    const { data: session } = useSession()
    console.log(props)
    if (session) {
        return (
            <>
                Signed in as acc {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }

    return (
        <>
            Not signed in acc <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )

}



export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session){
        context.res.statusCode = 302
        context.res.setHeader('Location', `/login`) // Replace <link> with your url link
        return {props: {}}
    }
  return {
    props:{session}
  }
}

export default account