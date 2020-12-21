const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log("Hell o world! 뜨고,");
  console.log("팀원 이름이 뜨면 리스닝포트 열린 상태입니다: 백도현,이준희,김민국,함승균");
  console.log(`Example app listening at http://localhost:${port}`)
})