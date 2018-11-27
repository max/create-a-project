const path = require("path");
const ProjectCreator = require("..");

const FIXTURE_WORKSPACE = path.join(__dirname, "fixtures");

describe("create-a-project", () => {
  let projectCreator, github;

  beforeEach(() => {
    projectCreator = new ProjectCreator();
    github = { projects: { createForRepo: jest.fn() } };

    projectCreator.tools.workspace = FIXTURE_WORKSPACE;
    projectCreator.tools.context.payload = {
      repository: { owner: { login: "max" }, name: "waddup" }
    };
    projectCreator.tools.createOctokit = jest.fn(() => github);
  });

  it("creates a new project", async () => {
    await projectCreator.go();
    expect(github.projects.createForRepo).toHaveBeenCalled();
    expect(github.projects.createForRepo.mock.calls).toMatchSnapshot();
  });

  it("creates a new project from a different template", async () => {
    projectCreator = new ProjectCreator(".github/different-template.taskpaper");
    projectCreator.tools.workspace = FIXTURE_WORKSPACE;
    projectCreator.tools.context.payload = {
      repository: { owner: { login: "max" }, name: "waddup" }
    };
    projectCreator.tools.createOctokit = jest.fn(() => github);

    await projectCreator.go();
    expect(github.projects.createForRepo).toHaveBeenCalled();
    expect(github.projects.createForRepo.mock.calls[0][0].name).toBe(
      "My Different Fantastic Project Board"
    );
  });
});
