Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

    Accounts.ui.config({
        passwordSignupFields:'USERNAME_ONLY'
    });

    Meteor.startup(function(){
        React.render(<App />,document.getElementById("render-target"));
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
