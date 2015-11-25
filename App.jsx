App =React.createClass({
    /*
    getTasks(){
        return [
            {_id:1,text:"This is taks 1"},
            {_id:2,text:"This is task 2"},
            {_id:3,text:"This is task 3"}
        ];
    },*/
    mixins:[ReactMeteorData],
    getInitialState(){
        return {
            hideCompleted:false
        }
    },
    getMeteorData(){
        let query={};

        if(this.state.hideCompleted){
            query={checked:{$ne:true}};
        }
        return {
            tasks:Tasks.find(query,{sort:{createdAt:-1}}).fetch()
        }
    },
    renderTasks(){
        /*return this.getTasks().map((task)=>{
            return <Task key={task._id} task={task} />;
        });*/
        return this.data.tasks.map((task)=>{
            return <Task key={task._id} task={task} />;
        });
    },
    handleSubmit(event){
        event.preventDefault();
        var text=React.findDOMNode(this.refs.textInput).value.trim();
        Tasks.insert({
            text:text,
            createdAt:new Date()
        });
        React.findDOMNode(this.refs.textInput).value="";
    },
    toggleHideCompleted(){
        this.setState({
            hideCompleted:!this.state.hideCompleted
        });
    },
    render(){
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>

                    <label className="hide-completed">
                        <input type="checkbox"
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted}
                            readOnly={true}/>
                        Hide Completed Tasks
                    </label>

                    <form className="new-task" onSubmit={this.handleSubmit}>
                        <input type="text" ref="textInput" placeholder="Type to add new tasks" />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
});
