import { useEffect, useRef, useState } from 'react';
import './App.css';
import Display from './assets/icons_FEtask/Display.svg';
import Down from './assets/icons_FEtask/down.svg';

import Dashboard from './Components/Dashboard';
import Dropdown from './Components/Dropdown';
import axios from 'axios';
import Loading from './Components/Loading';

function App() {

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const loadFromLocalStorage = (key) => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : null;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(() => loadFromLocalStorage('kanban-grouping') || 'status');
  const [sortBy, setSortBy] = useState(() => loadFromLocalStorage('kanban-sorting') || 'priority');
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);



  useEffect(() => {
    saveToLocalStorage('kanban-grouping', groupBy);
    saveToLocalStorage('kanban-sorting', sortBy);
  }, [groupBy, sortBy]);

  useEffect(() => {
    const savedGrouping = loadFromLocalStorage('kanban-grouping');
    const savedSorting = loadFromLocalStorage('kanban-sorting');

    if (savedGrouping) {
      setGroupBy(savedGrouping);
    }
    if (savedSorting) {
      setSortBy(savedSorting);
    }
  }, []);

  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch(error => {
        console.error("Error fetching tickets", error);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }, []);


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleInsideClick = (event) => {
    event.stopPropagation();
  };


  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      case 0:
        return 'No Priority';
      default:
        return 'Unknown Priority';
    }
  };

  const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupTickets = (tickets) => {
    switch (groupBy) {
      case 'status':
        return groupByStatus(tickets);
      case 'user':
        return groupByUser(tickets);
      case 'priority':
        return groupByPriority(tickets);
      default:
        return tickets;
    }
  };

  const groupByStatus = (tickets) => {
    const grouped = {
      'Backlog': [],
      'Todo': [],
      'In progress': [],
      'Done': [],
      'Cancelled': []
    };

    tickets.forEach((ticket) => {
      const { status } = ticket;
      if (grouped[status]) {
        grouped[status].push(ticket);
      }
    });

    return Object.entries(grouped).map(([key, tickets]) => ({
      key,
      tickets: sortTickets(tickets),
    }));
  };

  const groupByUser = (tickets) => {
    const grouped = tickets.reduce((groups, ticket) => {
      const { userId } = ticket;
      const user = users.find((u) => u.id === userId);
      const userName = user ? user.name : 'Unknown User';

      if (!groups[userName]) {
        groups[userName] = [];
      }

      groups[userName].push(ticket);
      return groups;
    }, {});

    return Object.entries(grouped).map(([key, tickets]) => ({
      key,
      tickets: sortTickets(tickets),
    }));
  };

  const groupByPriority = (tickets) => {
    const grouped = tickets.reduce((groups, ticket) => {
      const { priority } = ticket;
      const priorityLabel = getPriorityLabel(priority);
      if (!groups[priorityLabel]) {
        groups[priorityLabel] = [];
      }
      groups[priorityLabel].push(ticket);
      return groups;
    }, {});

    return Object.entries(grouped).map(([key, tickets]) => ({
      key,
      tickets: sortTickets(tickets),
    }));
  };

  const getUserByUserIdOrName = (identifier) => {
    const user = users.find((user) => user.id === identifier || user.name === identifier);
    return user ? user : null;
  };

  return (
    <div className="App">
      <button className='displayButton' onClick={() => setIsOpen(prev => !prev)} ref={dropdownRef}>
        <img src={Display} alt='Display_img' />
        Display
        <img src={Down} alt='Down_img' />
      </button>
      {isOpen &&
        <div onClick={handleInsideClick} ref={dropdownRef}>
          <Dropdown
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      }
      {loading ? (
        <Loading />

      ) : (
        <Dashboard
          groupedTickets={groupTickets(tickets)}
          getPriorityLabel={getPriorityLabel}
          groupBy={groupBy}
          userName={getUserByUserIdOrName}
        />
      )}
    </div>
  );
}

export default App;
