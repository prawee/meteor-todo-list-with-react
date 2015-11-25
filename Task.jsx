Task=React.createClass({
    propTypes:{
        task:React.PropTypes.object.isRequired,
        showPrivateButton:React.PropTypes.bool.isRequired
    },
    toggleChecked(){
        /*Tasks.update(this.props.task._id,{
            $set:{checked:!this.props.task.checked}
        });*/
        Meteor.call("setChecked",this.props.task._id,!this.props.task.checked);
    },
    deleteThisTask(){
        /*Tasks.remove(this.probs.task._id);*/
        Meteor.call("removeTask",this.props.task._id);
    },
    render(){
        const taskClassName=this.props.task.checked ? "checked":"";
        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask}>
                    &times;
                </button>

                <input type="checkbox"
                    readOnly={true}
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked} />
                <span className="text">
                    <strong>{this.props.task.username}</strong> :
                    {this.props.task.text}
                </span>
            </li>
        );
    }
});
