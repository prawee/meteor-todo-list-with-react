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
        const taskClassName=this.props.task.checked ? "checked":"";
        return (
            <li>{this.props.task.text}</li>
        );
    }
});
