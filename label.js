//this is for localization helper
let th = require("./src/assets/th-TH.json")
let en = require("./src/assets/en-US.json")
const readline = require("readline")
const fs = require("fs")
//ความคิดเห็น/ข้อเสนอแนะเพิ่มเติม
th.comment = "ความคิดเห็น/ข้อเสนอแนะเพิ่มเติม"
en.comment = "Comment/Suggestion"
//แอปพลิเคชันขัดข้อง
th.report_1 = "แอปพลิเคชันขัดข้อง"
en.report_1 = "Application error"
//แอปพลิเคชันค้างหรือไม่ตอบสนอง
th.report_2 = "แอปพลิเคชันค้างหรือไม่ตอบสนอง"
en.report_2 = "Application hang or not responding"
//การทำงานของแอปพลิเคชันไม่เสถียร
th.report_3 = "การทำงานของแอปพลิเคชันไม่เสถียร"
en.report_3 = "Application unstable"
//แอปพลิเคชันแสดงผลไม่ถูกต้อง
th.report_4 = "แอปพลิเคชันแสดงผลไม่ถูกต้อง"
en.report_4 = "Application display incorrectly"
//แอปพลิเคชันไม่มีการอัปเดตข้อมูล
th.report_5 = "แอปพลิเคชันไม่มีการอัปเดตข้อมูล"
en.report_5 = "Application not update data"
//ข้อมูลข่าวประชาสัมพันธ์ไม่ถูกต้อง
th.report_6 = "ข้อมูลข่าวประชาสัมพันธ์ไม่ถูกต้อง"
en.report_6 = "News data is incorrect"
//ข้อมูลคลังความรู้ไม่ถูกต้อง
th.report_7 = "ข้อมูลคลังความรู้ไม่ถูกต้อง"
en.report_7 = "Knowledge base data is incorrect"

fs.writeFileSync("./src/assets/th-TH.json", JSON.stringify(th, null, 4))
fs.writeFileSync("./src/assets/en-US.json", JSON.stringify(en, null, 4))

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
//
// rl.question('Enter a key: ', key => {
//   rl.question('Enter TH word: ', thvalue => {
//     rl.question('Enter EN word: ', envalue => {
//       th[key] = thvalue;
//       en[key] = envalue;
//       fs.writeFileSync('./src/assets/th-TH.json', JSON.stringify(th, null, 4));
//       fs.writeFileSync('./src/assets/en-US.json', JSON.stringify(en, null, 4));
//       rl.close();
//     });
//   });
// });
