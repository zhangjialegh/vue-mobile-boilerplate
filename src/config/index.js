export let tokenName = "TBSAccessToken";
export let loginPage = "https://m.2boss.cn/login";
export let shareDomin = "https://m.2boss.cn";
export let baseDomin;
export let defaultShareImgUrl = "https://m.2boss.cn/market";
const href = location.href;
if (href.includes("m.2boss.cn")) {
  baseDomin = "https://m.2boss.cn";
} else {
  baseDomin = "http://localhost:8080";
}
