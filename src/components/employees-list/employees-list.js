import EmployeesListItem from '../employees-list-item/employees-list-item';

import './employees-list.css';

const EmployeesList = ({ data }) => {
    const elements = data.map((item) => {
        const { id, ...itemProps } = item;

        return <EmployeesListItem key={id} {...itemProps} />;
    });

    return <ul className="app-list list-group">{elements}</ul>;
};

export default EmployeesList;

// <EmployeesListItem name="Jonh" salary={800} />
// const elements = data.map((item) => {
//     return <EmployeesListItem name={item.name} salary={item.salary} />;
// });

// if id didn't come from server
// const EmployeesList = ({ data }) => {
//     const elements = data.map((item, i) => {
//         const { id, ...itemProps } = item;

//         return <EmployeesListItem key={i} {...itemProps} />;
//     });

//     return <ul className="app-list list-group">{elements}</ul>;
// };
