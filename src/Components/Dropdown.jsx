import React from 'react';

const Dropdown = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
    return (
        <div className='dropdown'>
            <div className='dropdown-div'>
                <label htmlFor="sorting">Grouping </label>
                <select id="grouping" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                </select>
            </div>
            <div className='dropdown-div'>
                <label htmlFor="sorting">Ordering </label>
                <select id="sorting" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </div>
    );
};

export default Dropdown;
