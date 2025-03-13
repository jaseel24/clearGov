import React, { useState } from "react";

const UserEditForm = ({ user }) => {
    return (
        <div>
            <form>
                <div className=" space-y-3">
                    <h3 className="font-bold text-lg">User Edit Form</h3>
                    <label className="input input-bordered flex items-center gap-2">
                        Username
                        <input type="text" className="grow" placeholder="Daisy" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Email
                        <input type="text" className="grow" placeholder="daisy@site.com" />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default UserEditForm;
