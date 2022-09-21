import { pushKeywords } from ".";
let arr = [{ keyword: "drugs" }, { keyword: "weapons" }, { keyword: "dark" }];
pushKeywords(arr).then(() => console.log("done"));
