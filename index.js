const { Toolkit } = require("actions-toolkit");
const fm = require("front-matter");

class ProjectCreator {
  constructor(template) {
    this.template = template || ".github/PROJECT_TEMPLATE.taskpaper";
    this.tools = new Toolkit();
  }

  async go() {
    const file = this.tools.getFile(this.template);
    const { attributes } = fm(file);

    const octokit = this.tools.createOctokit();

    return octokit.projects.createForRepo(
      this.tools.context.repo({
        name: attributes.title,
        body: attributes.description
      })
    );
  }
}

module.exports = ProjectCreator;
