import React from 'react';
import './stylesNA.css';
function NeedAuthentication(){
    return (
        <div className="naBdy text-center ">
            <div className="container-flex">
                <div className="row">
                    <div className="col-12 text-center" id="na">
                        <label className="text-danger fs-1">You are not authenticated!!</label><br/>
                        <button type="button" class="btn btn-primary" onClick={() => window.open('/Login', '_blank')}>Log in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NeedAuthentication;