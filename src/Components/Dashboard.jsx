
import ColumnComponent from './ColumnComponent';

const Dashboard = ({ groupedTickets, getPriorityLabel, groupBy, userName }) => {

    return (
        <div className="dashboard">
            {groupedTickets.map((group) => (
                <ColumnComponent
                    group={group}
                    priority={getPriorityLabel}
                    key={group.key}
                    groupBy={groupBy}
                    userName={userName}
                />
            ))}


        </div>
    );
};

export default Dashboard;
