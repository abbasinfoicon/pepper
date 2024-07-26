import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className="main-header">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="logo">
                            <Link href="https://www.bepperbalance.com/" target='_blank'><img src="/img/logo.png" alt="logo" className="img-fluid" /></Link>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="inline-button flex items-center justify-end">
                            <button className="btn-download"><img src="/img/download.svg" alt="download" className="img-fluid" /> Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header