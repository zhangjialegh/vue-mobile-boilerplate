export const tokenName = "TBSAccessToken";
export const loginPage = "https://agent.2boss.cn/login?from=morningpaper";
export const shareDomin = "https://agent.2boss.cn";
export const marketUrl = "https://m.2boss.cn/market";
export const defaultShareImgUrl = "https://share.2boss.cn/images/sharelogo.png";
export let baseDomin;

const href = location.href;
if (href.includes("dev.2boss.cn")) {
  baseDomin = "https://dev.2boss.cn";
} else if (href.includes("agent.2boss.cn")) {
  baseDomin = "https://agent.2boss.cn";
  baseDomin = "https://agent.2boss.cn/api";
} else {
  baseDomin = "https://localhost:8080/api";
}
