export let tokenName = "TBSAccessToken";
export let loginPage = "https://agent.2boss.cn/login";
export let shareDomin = "https://agent.2boss.cn";
export const fls = "https://localhost:8080";
export let baseDomin;
export const marketUrl = "https://m.2boss.cn/market";
export let defaultShareImgUrl = "https://share.2boss.cn/images/sharelogo.png";
const href = location.href;
if (href.includes("agent.2boss.cn")) {
  baseDomin = "https://ta.2boss.cn";
} else {
  baseDomin = "https://localhost:8080/api";
}
