import hp from '../assets/icons_FEtask/Img - High Priority.svg';
import lp from '../assets/icons_FEtask/Img - Low Priority.svg';
import mp from '../assets/icons_FEtask/Img - Medium Priority.svg';
import np from '../assets/icons_FEtask/No-priority.svg'
import up from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg'
import upg from '../assets/icons_FEtask/SVG - Urgent Priority grey.svg'
import todo from '../assets/icons_FEtask/To-do.svg'
import progress from '../assets/icons_FEtask/in-progress.svg';
import backlog from '../assets/icons_FEtask/Backlog.svg';
import done from '../assets/icons_FEtask/Done.svg'
import cancelled from '../assets/icons_FEtask/Cancelled.svg';
import Profile from './Profile';

const Card = ({ id, title, tag, priority, groupBy, status, userName,index }) => {

  const priorityImage = () => {
    switch (priority) {
      case "High":
        return hp;
      case 'Low':
        return lp;
      case 'Medium':
        return mp;
      case 'No Priority':
        return np;
      case 'Urgent':
        return upg;

    }
  }
  const keyImage = () => {
    switch (status) {
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
  const available = userName.available;
  let bgColor = 'grey';
  if (available) bgColor = 'orange';


  return (
    <div className="card" style={{ animationDelay: `${index * 0.25}s` }}>
      <div className='text-card'>
          <p className='id'>{id}</p>
          <p className='title'>
            {groupBy != 'status' && (
              <img src={keyImage()} alt='image' />
            )}
            {title}
          </p>
        <div className='feature'>
          {groupBy !== 'priority' && (
            <img className='img' src={priorityImage()} />
          )}
          <div className='tag-img'>
            <div className='circle' />
            <p className='tag'>{tag}</p>
          </div>
        </div>
      </div>
      <div className='profile-card'>
        {groupBy != 'user' && (
          <div className='profile'>
            <Profile name={userName.name} className='circle' />
            <div className='circle center' style={{ backgroundColor: bgColor }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Card