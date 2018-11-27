const { Toolkit } = require("actions-toolkit");

class ProjectCreator {
  constructor() {
    this.tools = new Toolkit();
  }

  async go() {
    const octokit = this.tools.createOctokit();

    return octokit.projects.createForRepo(
      this.tools.context.repo({
        name: "My project title",
        body: "My project body"
      })
    );
  }
}

module.exports = ProjectCreator;
