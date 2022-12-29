import React, { useEffect , useState } from "react";


const UserProfile = (props) => {
	
    const { user } = props;
    const userIn = JSON.parse(localStorage.getItem(`userInfo-${user}`));
    console.log("ola", userIn);

    return (
    <div>
        Dashboard
    </div>
    );
};

export default UserProfile;