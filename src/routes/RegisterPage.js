import React, { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import style from './styles.module.css'
import { Link } from 'react-router-dom'

//first_name, last_name, email, password

function RegisterPage() {



    //user name first
    const [userNameFirst, setUserNameFirst] = useState('')
    const [userNameFirstError, setUserNameFirstError] = useState(false)

    //user name last
    const [userNameLast, setUserNameLast] = useState('')
    const [userNameLastError, setUserNameLastError] = useState(false)

    //user email
    const [userEmail, setuserEmail] = useState('')
    const [userEmailError, setuserEmailError] = useState(false)

    //pass
    const [userNewPass, setUserNewPass] = useState('')
    const [userNewPassError, setUserNewPassError] = useState(false)
    //re pass
    const [userReNewPass, setUserReNewPass] = useState('')
    const [userReNewPassError, setUserReNewPassError] = useState(false)
    //btn ;oading
    const [loadingBtn, setLoadingBtn] = useState('contained')

    const handelSubmit = (e) => {
        e.preventDefault();

        //user name
        setUserNameFirstError(false)
        setUserNameLastError(false)

        //user email
        setuserEmailError(false)
        
        //pass
        setUserNewPassError(false)
        setUserReNewPassError(false)

        //set errors if empty
        if (userNameFirst === '') {
            setUserNameFirstError(true)
        }
        if (userNameLast === '') {
            setUserNameLastError(true)
        }

        //user email
        if(userEmail === '') {
            setuserEmailError(true)
        }

        //new pass
        if (userNewPass.length < 8) {
            setUserNewPassError(true)
        }

        if (!(userNewPass === userReNewPass && userReNewPass.length > 7)) {
            setUserReNewPassError(true)
        }

        if (userNameFirst && userNameLast && userEmail && userNewPass === userReNewPass && userReNewPass.length > 7) {
            setLoadingBtn('disabled')

            const first_name = userNameFirst
            const last_name = userNameLast
            const email = userEmail
            const password = userNewPass
            fetch('http://localhost:8000/post/register', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ first_name, last_name, email, password })
            }).then((res) => {
                console.log(res)
                // const {data} = res
                // console.log(data)    
                // window.location.href = 'http://localhost:3000'
                setLoadingBtn('contained')
            }).catch(() => setLoadingBtn('contained'))

        }

    }



    return (
        <>
            <Typography variant='h2' marginTop={5} align='center' color="secondary">
                Register Page
            </Typography>
            <div className={style.fromSize}>
                <form noValidate autoComplete='off' onSubmit={handelSubmit}>

                    <div className={style.inputSectionReg}>
                        <TextField
                            onChange={(e) => setUserNameFirst(e.target.value)}
                            className={style.inputSectionReg}
                            label="First Name"
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            required
                            error={userNameFirstError}
                        />
                    </div>

                    <div className={style.inputSectionReg}>
                        <TextField
                            onChange={(e) => setUserNameLast(e.target.value)}
                            className={style.inputSectionReg}
                            label="Last Name"
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            required
                            error={userNameLastError}
                        />
                    </div>

                    <div className={style.inputSectionReg}>
                        <TextField
                            onChange={(e) => setuserEmail(e.target.value)}
                            className={style.inputSection}
                            label="User Email"
                            type="email"
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            required
                            error={userEmailError}
                        />
                    </div>

                    <div className={style.inputSectionReg}>
                        <TextField
                            onChange={(e) => setUserNewPass(e.target.value)}
                            label="New password"
                            type="password"
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            required
                            error={userNewPassError}
                        />
                    </div>
                    <div className={style.inputSectionReg}>
                        <TextField
                            onChange={(e) => setUserReNewPass(e.target.value)}
                            label="Re enter password"
                            type="password"
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            required
                            error={userReNewPassError}
                        />
                    </div>

                    <div className={style.inputSectionReg}>
                        <Button
                            className={style.btn}
                            type="submit"
                            variant={loadingBtn}
                            color="secondary"
                        >
                            Register
                        </Button>

                    </div>
                </form>
            </div>
            <div className={style.bottomSection}>
            <div>If already registerd</div> <Link to="/login" className={style.Link}>Login</Link> here
            </div>
        </>
    )
}

export default RegisterPage;



