import React from 'react';


const Profile = ({ name }) => {
   
    const getInitials = (name) => {
        const nameArray = name.split(' ');
        const initials = nameArray.map((word) => word.charAt(0).toUpperCase()).join('');
        return initials;
    };

    const initials = getInitials(name);
    
    return <div className='container'>{initials}</div>;
};

export default Profile;
