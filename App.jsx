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
            tasks:Tasks.find(query,{sort:{createdAt:-1}}).fetch(),
            inCompleteCount:Tasks.find({checked:{$ne:true}}).count(),
            currentUser:Meteor.user()
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
        /*Tasks.insert({
            text:text,
            createdAt:new Date(),
            owner:Meteor.userId(),
            username:Meteor.user().username
        });*/
        Meteor.call("addTask",text);
        React.findDOMNode(this.refs.textInput).value="";
    },
    toggleHideCompleted(){
        /*this.setState({
            hideCompleted:!this.state.hideCompleted
        });*/
        Meteor.call("setChecked",this.props.task._id,!this.props.task.checked);
    },
    render(){
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.data.inCompleteCount})</h1>

                    <label className="hide-completed">
                        <input type="checkbox"
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted}
                            readOnly={true}/>
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    {this.data.currentUser?
                        <form className="new-task" onSubmit={this.handleSubmit}>
                            <input type="text" ref="textInput" placeholder="Type to add new tasks" />
                        </form>
                            :
                            ''
                    }
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
});
