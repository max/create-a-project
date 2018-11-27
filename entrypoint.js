const ProjectCreator = require(".");

const projectCreator = new ProjectCreator();
projectCreator.go().then(project => {
  console.log(`Created project ${project.data.name}`);
});
