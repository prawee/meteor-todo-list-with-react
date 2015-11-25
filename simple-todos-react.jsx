Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

    Accounts.ui.config({
        passwordSignupFields:'USERNAME_ONLY'
    });

    Meteor.startup(function(){
        React.render(<App />,document.getElementById("render-target"));
    });
}

Meteor.methods({
    addTask(text){
        if(!Meteor.userId()){
            throw new Meteor.Error("not-authenrized");
        }
        Tasks.insert({
            text:text,
            createdAt:new Date(),
            owner:Meteor.userId(),
            username:Meteor.user().username
        });
    }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
