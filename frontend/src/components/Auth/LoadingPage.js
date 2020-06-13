import React, { Fragment } from 'react'
import UserBar from '../UserBar/UserBar'
import NavBar from "../Welcome/NavBar";
import Footer from '../Welcome/Footer'
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

export default function LoadingPage({ name, setName, setLoggedIn }) {

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: none;
 
      `;

    const style = { position: "fixed", top: "35%", left: "50%" };

    return (
        <div>
            {name == null ?
                <div className="bg">
                    <NavBar setLoggedIn={setLoggedIn} />

                    <div style={style}>
                        <BeatLoader
                            css={override}
                            size={20}
                            color={"white"}
                        />
                    </div>

                    <Footer />
                </div>
                :
                <Fragment>
                    <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
                    {/* <div style={style}>
                        <BeatLoader
                            css={override}
                            size={15}
                            color={"#9013FE"} />
                    </div> */}
                </Fragment>}


            />

        </div>
    )
}
