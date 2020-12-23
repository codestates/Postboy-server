const { user } = require("../models");
module.exports = {
  signInController: (req, res) => {
    // 로그인. 요구 필드 : email, password.
    // 회원정보를 데이터베이스에서 확인하고, 회원의 id는 session에 들어감.
    // 분기는 3개. 200, 401, 500
    let data = req.body;
    user.findOne({
      where: {
        email: data.email,
        password: data.password
      }
    })
      .then(result => {
        if (!result) {
          res.status(401).send("Invalid user or Wrong password");
        } else if(result) {
          console.log('로그인 성공. 데이터 응답 클라이언트에 전송');
          req.session.userid = result.id;
          res.status(200).send({ id: result.id });
        }
        else{
          res.status(500).send('internal server error');
        }
      })
  },
  signOutController: (req, res) => {
    //로그아웃 요청 및 응답
    // 유저가 로그아웃했을 때, session 정보를 destroy
    // 분기는 3개. (???)
    if(req){
      req.session.destroy();
      res.status(205).send("Logged out successfully");
    }
    /* DB, 회원가입 로직 확정 후 개발예정
       req.session에 권한부여 데이터에 따라... 
       또는 그냥 주소를 잘못 입력한 상태로 req를 날리면 보낸다.
    else if(req.session.???){
      res.status(400).send("Bad Request");
    }
    */
    
  },

};