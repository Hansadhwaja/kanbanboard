import React from 'react'
import Card from './Card'
import add from '../assets/icons_FEtask/add.svg'
import dot from '../assets/icons_FEtask/3 dot menu.svg'
import todo from '../assets/icons_FEtask/To-do.svg'
import progress from '../assets/icons_FEtask/in-progress.svg';
import backlog from '../assets/icons_FEtask/Backlog.svg';
import done from '../assets/icons_FEtask/Done.svg'
import cancelled from '../assets/icons_FEtask/Cancelled.svg';
import hp from '../assets/icons_FEtask/Img - High Priority.svg';
import lp from '../assets/icons_FEtask/Img - Low Priority.svg';
import mp from '../assets/icons_FEtask/Img - Medium Priority.svg';
import np from '../assets/icons_FEtask/No-priority.svg'
import up from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg'
import upg from '../assets/icons_FEtask/SVG - Urgent Priority grey.svg'
import Profile from './Profile'

const ColumnComponent = ({ group, priority, groupBy, userName }) => {

    const keyImage = () => {
        switch (group.key) {
            case 'Todo':
                return todo;
            case 'In progress':
                return progress;
            case 'Backlog':
                return backlog;
            case 'Done':
                return done;
            case 'Cancelled':
                return cancelled;

        }
    }
    const priorityImage = () => {
        switch (group.key) {
            case "High":
                return hp;
            case 'Low':
                return lp;
            case 'Medium':
                return mp;
            case 'No Priority':
                return np;
            case 'Urgent':
                return up;

        }
    }
    let bgColor = 'grey';
    if (groupBy === 'user') {
        const userFound = userName(group.key);
        const available = userFound.available;
        if (available) bgColor = 'orange';
    }

    return (
        <div className="dashboard-column">
            <div className='group-header'>
                <div className='group-class'>
                    {groupBy === 'status' && (
                        <img src={keyImage()} alt='image' />
                    )}
                    {groupBy === 'user' && (
                        <div className='profile'>
                            <Profile name={group.key} className='circle' />
                            <div className='circle center' style={{ backgroundColor: bgColor }} />
                        </div>

                    )}
                    {groupBy === 'priority' && (
                        <img src={priorityImage()} alt='image' />
                    )}

                    <h3>{group.key}</h3>
                    <p className='number'>{group.tickets.length}</p>
                </div>
                <div className='add-dot'>
                    <img src={add} />
                    <img src={dot} />
                </div>
            </div>

            {group.tickets.map((ticket,index) => (
                <Card
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    tag={ticket.tag[0]}
                    priority={priority(ticket.priority)}
                    groupBy={groupBy}
                    status={ticket.status}
                    userName={userName(ticket.userId)}
                    index={index}
                />
            ))}
        </div>
    )
}

export default ColumnComponent