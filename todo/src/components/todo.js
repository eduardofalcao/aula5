import React, {Component} from "react";

const Lista = (props) => (
    <ul>
        {
            props.tasks.map(e => {
                return <li key={e.id} 
                style = {{textDecoration: e.done ? "line-through" : "none" }}
                onClick = {() => props.toogle(e)}>
                {e.text}</li>
            })
        }
    </ul>
)

class Todo extends Component {

        constructor(props){
            super(props)
            this.state = {
                text: '',
                tasks: []
            }
        }

    handleChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    handleClick() {
        let { text, tasks} = this.state
        tasks = tasks.concat([
            {
                id: new Date(),
                text: text
            }
        ])
        this.setState({
            tasks: tasks,
            text: ''
        })
    }

    toogle(task){
        this.setState(prev => ({
            tasks: prev.tasks.map(t => {
                if (t.id === task.id){
                    return {
                        ...t,
                        done: !t.done
                    }
                }
                return t
            })

        }))
    }

    render() {
        return <div>
              <h1>Todo App</h1>
              <input value={this.state.text} 
                     onChange= {(e) => this.handleChange(e) } ></input>
              <button onClick={(e) => this.handleClick(e) } >Add</button>
              <h3>a fazer</h3>
              <Lista tasks={this.state.tasks.filter(e => !e.done)} toogle={this.toogle.bind(this)} />
              <h3>concluídas</h3>
              <Lista tasks={this.state.tasks.filter(e => e.done)} toogle={this.toogle.bind(this)} />
              <div>{JSON.stringify(this.state)}</div>
            </div>
    }

}

export default Todo;