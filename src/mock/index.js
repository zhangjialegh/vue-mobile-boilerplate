const Mock = require("mockjs");
const v = 1;
Mock.mock(
  `/rabbit/${v}/app/front/daily-quotes`,
  "get",
  require("./json/daily-quotes.json")
);

Mock.mock(
  `/rabbit/${v}/city-home/choice/only-reports`,
  "get",
  require("./json/only-reports.json")
);

Mock.mock(
  `/superior/${v}/superior/getSuperiorInfo`,
  "get",
  require("./json/agent-info.json")
);

Mock.mock(
  `/superior/${v}/superior/saveMemo`,
  "post",
  require("./json/agent-memo.json")
);

Mock.mock(
  `/superior/${v}/superior/saveHeadUrl`,
  "post",
  require("./json/agent-headUrl.json")
);
