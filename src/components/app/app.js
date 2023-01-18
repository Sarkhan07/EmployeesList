import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Jonh',
                    salary: 800,
                    increase: false,
                    like: true,
                    id: 1,
                },
                {
                    name: 'Alex',
                    salary: 1800,
                    increase: true,
                    like: false,
                    id: 2,
                },
                {
                    name: 'Max',
                    salary: 2800,
                    increase: false,
                    like: false,
                    id: 3,
                },
            ],
            term: '',
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            // const index = data.findIndex((elem) => elem.id === id);

            // const before = data.slice(0, index); // с 0 до определенного индекса вырезаем
            // const after = data.slice(index + 1); // с элемента после определенного индекса до конца

            // const newArr = [...before, ...after];

            return {
                data: data.filter((item) => item.id !== id), //здесь остаются те элементы которые не совпадали
            };
        });
    };

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: this.maxId++,
        };

        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr,
            };
        });
    };

    onToggleProp = (id, prop) => {
        // this.setState(({ data }) => {
        // const index = data.findIndex((elem) => elem.id === id); more difficult way
        // const old = data[index];
        // const newItem = { ...old, increase: !old.increase };
        // const newArr = [
        //     ...data.slice(0, index),
        //     newItem,
        //     ...data.slice(index + 1),
        // ];
        // return {
        //     data: newArr,
        // };
        // });

        this.setState(({ data }) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        [prop]: !item[prop],
                    };
                }
                return item;
            }),
        }));
    };

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.name.indexOf(term) > -1; // индекс первого элемента или -1 если не находит
        });
    };

    onUpdateSearch = (term) => {
        this.setState({ term });
    };

    // key prop нужен что реакт понял что не надо менять весь элемент
    render() {
        const { data, term } = this.state;
        const employees = data.length;
        const increased = data.filter((item) => item.increase).length;
        const visibleData = this.searchEmp(data, term);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;

// function App() {
//     const data = [
//         { name: 'Jonh', salary: 800, increase: false, id: 1 },
//         { name: 'Alex', salary: 1800, increase: true, id: 2 },
//         { name: 'Max', salary: 2800, increase: false, id: 3 },
//     ];
//     // key prop нужен что реакт понял что не надо менять весь элемент

//     return (
//         <div className="app">
//             <AppInfo />

//             <div className="search-panel">
//                 <SearchPanel />
//                 <AppFilter />
//             </div>

//             <EmployeesList data={data} onDelete={(id) => console.log(id)} />
//             <EmployeesAddForm />
//         </div>
//     );
// }

// export default App;
