
import { useEffect, useState } from 'react';
import './App.css';
import Display from './assets/icons_FEtask/Display.svg';
import Down from './assets/icons_FEtask/down.svg'

import Dashboard from './Components/Dashboard';
import Dropdown from './Components/Dropdown';
import axios from 'axios';
import Loading from './Components/Loading';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // Default group by status
  const [sortBy, setSortBy] = useState('priority'); // Default sort by priority
  const [loading, setLoading] = useState(true);

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



  // Helper function to convert priority number to string label
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

  // Sorting function
  const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority); // Descending priority
    } else if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title)); // Ascending title
    }
    return tickets;
  };

  // Grouping functions
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
    // Initialize the grouped object with empty arrays for all 5 statuses
    const grouped = {
      'Backlog': [],
      'Todo': [],
      'In progress': [],
      'Done': [],
      'Cancelled': []
    };

    // Group the tickets by their status
    tickets.forEach((ticket) => {
      const { status } = ticket;
      if (grouped[status]) {
        grouped[status].push(ticket);
      }
    });

    // Return the grouped object as an array of key-value pairs (status and sorted tickets)
    return Object.entries(grouped).map(([key, tickets]) => ({
      key,
      tickets: sortTickets(tickets), // Sort tickets if required
    }));
  };

  const groupByUser = (tickets) => {
    const grouped = tickets.reduce((groups, ticket) => {
      const { userId } = ticket;

      // Find the corresponding user name from the users array based on userId
      const user = users.find((u) => u.id === userId);
      const userName = user ? user.name : 'Unknown User'; // Use 'Unknown User' if user not found

      if (!groups[userName]) {
        groups[userName] = [];
      }

      groups[userName].push(ticket);
      return groups;
    }, {});

    // Convert grouped object into an array of key-value pairs with sorted tickets
    return Object.entries(grouped).map(([key, tickets]) => ({
      key,
      tickets: sortTickets(tickets), // Sort tickets if needed
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
      key, tickets: sortTickets(tickets),
    }));
  };

  const getUserByUserIdOrName = (identifier) => {
    const user = users.find((user) => user.id === identifier || user.name === identifier);
    return user ? user : null;
  };

  if (loading) return (
    <div className='App loading'>
      <Loading />
    </div>
  );


  return (
    <div className="App">
      <button className='displayButton' onClick={() => setIsOpen(prev => !prev)}>
        <img src={Display} alt='Display_img' />
        Display
        <img src={Down} alt='Down_img' />
      </button>
      {isOpen &&
        <Dropdown
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />}
      <Dashboard
        groupedTickets={groupTickets(tickets)}
        getPriorityLabel={getPriorityLabel}
        groupBy={groupBy}
        userName={getUserByUserIdOrName}
      />
    </div>
  );
}

export default App;
