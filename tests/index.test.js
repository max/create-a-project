const ProjectCreator = require("..");

describe("create-a-project", () => {
  let projectCreator, github;

  beforeEach(() => {
    projectCreator = new ProjectCreator();
    github = { projects: { create: jest.fn() } };

    projectCreator.tools.workspace = path.join(__dirname, "fixtures");
    projectCreator.tools.context.payload = {
      repository: { owner: { login: "max", name: "waddup" } }
    };
    projectCreator.tools.createOctokit = jest.fn(() => github);
  });

  it("creates a new project", async () => {
    await projectCreator.go();
    expect(github.projects.createForRepo).toHaveBeenCalled();
    expect(github.issues.create.mock.calls).toMatchSnapshot();
  });
});
