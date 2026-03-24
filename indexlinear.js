import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // Commit dari 84 hari lalu sampai hari ini, berurutan
  const date = moment()
    .subtract(84 - n, "d")
    .format();

  const data = { date };

  console.log(`Committing for: ${date}`);

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(84);
