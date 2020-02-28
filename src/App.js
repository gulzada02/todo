import React, {Component} from 'react';
import axios from 'axios';
import ListItem from './List-item'


class App extends Component {

  state={
    todos:[],
    newTodo:'',
    editing: false,
    notifictaion: null
  };

  apiUrl='https://5e572e214c695f001432fa60.mockapi.io';
  async componentDidMount(){
    const response=await axios.get(`${this.apiUrl}/todos`);
    this.setState({todos:response.data})
  }

  handleChange(event){
    this.setState({newTodo: event.target.value})
  }

  async addTodo(){
    const  response= await axios.post(`${this.apiUrl}/todos`, {
      name:this.state.newTodo
    });

    const oldTodos=this.state.todos;
    oldTodos.push(response.data);
    this.setState({
      todos:oldTodos,
      newTodo: '',
    });
    this.alert('Added successfully');
  }

  async deleteTodo(index){
    const todos=this.state.todos; //разные переменные, но одинаковые названия
    const todo=todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
    delete todos[index];
    this.setState({todos}) //если одинаковые названия, то пишем один раз
    this.alert('Deleted successfully');
  }

  updateTodo(index){
    const todoUpdate=this.state.todos[index];
    this.setState({
      newTodo: todoUpdate.name,
      editing: true,
      editingIndex: index
    })
  }

  async editTodo(){
    const todo=this.state.todos[this.state.editingIndex];
    await axios.put(`${this.apiUrl}/todos/${todo.id}`,{
      name: this.state.newTodo
    });
    todo.name=this.state.newTodo;
    const todos=this.state.todos;
    todos[this.state.editingIndex]=todo;
    this.setState({
      todos: todos,
      editing:false,
      newTodo:''}) 
  }

  alert (notification){
    this.setState({notification});
    setTimeout(()=>{this.setState({notification:null})
  }, 3000);
}

  render(){
    return (
      <div>
        <div className="container">
          <h2 className="text-center p-4">Todo react app</h2>
            <input 
              type="text"
              className="form-control mb-4"
              onChange={this.handleChange.bind(this)}
              value={this.state.newTodo}
            />
            {this.state.notifictaion &&
            <div class="alert alert-success mt-3">
  <p className='text-center mb-0'>
    {this.state.notifictaion}
  </p>
            </div>
            }
              <button
                className="btn-info form-control mb-4"
                onClick={this.state.editing ? this.editTodo.bind(this) : this.addTodo.bind(this)}
                disabled={this.state.newTodo.length<5}
                >
                  {this.state.editing ? 'Update todo' : 'Add todo'}
              </button>

              {!this.state.editing && 
          <ul className="list-group">
            {
              this.state.todos.map((item, index)=>(
                <ListItem
                item={item}
                updateTodo={()=>this.updateTodo(index)}
                deleteTodo={()=>this.deleteTodo(index)}
                />
              ))
            }
          </ul>
  }
        </div>
      </div>
    );
  }
}

export default App;

