Task=React.createClass({
    propTypes:{
        task:React.PropTypes.object.isRequired
    },
    toggleChecked(){
        Tasks.update(this.props.task._id,{
            $set:{checked:!this.props.task.checked}
        });
    },
    deleteThisTask(){
        Tasks.remove(this.probs.task._id);
    },
    render(){
        return (
            <li>{this.props.task.text}</li>
        );
    }
});
