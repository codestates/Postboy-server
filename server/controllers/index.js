//import Model from "../models/init-models";
const { Models } = require("../models/init-models");
//const models = Models(sequelize);
const { request } = require("../models");
const { user } = require("../models");
const { history } = require("../models");
//const { init-models } = require("../models");

module.exports = {
  
  historyGetController: (req,res) =>{
    
    history.findAll({
      where:{
        user_id:req.session.userid
      },
    })
      .then(result => {
        if (!result) {
          res.status(401).send("Unauthorized or invalid ID");
        } else if(result) {
                    
          connection.query(`
            select h.request_id , h.status, h.type, h.createdAt, r.url, r.methodType
            from history AS h, request AS r
            where h.user_id=${user_id} AND h.request_id=${user_id}
            ;` , function(err,rows,fields){
            if(!err){
              res.status(200).send(
                {
                  id: result.id,
                  email: result.email,
                  nickname: result.password,
                  createdAt: result.createdAt,
                  updatedAt: result.updatedAt,
                  rows //order by createdAt으로 자동정렬된 상태
                },
                
              );
            }
            else{
              res.status(404).send('not found in: '+user_id);
            }
          })

        }
        else{
          res.status(500).send('internal server error');
        }
      })
      .catch(err=>console.log(err));
  },

  signInController: (req, res) => {
    // 로그인. 요구 필드 : email, password.
    // 회원정보를 데이터베이스에서 확인하고, 회원의 id는 session에 들어감.
    // 분기는 3개. 200, 401, 500
    //let data = req.body;
    //console.log(req.body);
      /*
      {
      include: [
        {
          model: history,
          attributes: [createdAt,status],
        },
      ],
      where: {
         email: req.body.email,
         password: req.body.password
      }
    }
    */
    user.findOne({
      where:{
        email:req.body.email,
        password:req.body.password
      },
    })
      .then(result => {
        if (!result) {
          res.status(401).send("Invalid user or Wrong password");
        } else if(result) {
          console.log('로그인 성공. 데이터 응답 클라이언트에 전송');
          req.session.userid = result.id;
          console.log(result.dataValues);
          res.status(200).send(
            {
              id: result.id,
              email: result.email,
              nickname: result.password,
              createdAt: result.createdAt,
              updatedAt: result.updatedAt,
            }
          );
        }
        else{
          res.status(500).send('internal server error');
        }
      })
      .catch(err=>console.log(err));
  },
  
  getTestController: (req,res) =>{
    //GET 요청 테스트 - 작동됨 확인
    let data = req.body;
    //console.log(req);
    user.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
      .then(result => {
          console.log('데이터가 있으면 날라온다.');
          req.session.userid = result.id;
          res.status(200).send({
             result: result,
             message:'Method:get is successful',
            });
        })

  },
  
  
  signUpController: (req, res) => {
    // 회원정보를 first 스키마에 저장
    // API상 req.body 파라미터는 email, password, nickname
    if (Object.keys(req.body).length !== 3) {
      res.status(422).send("all signup form is required");
    } else {
      let data = req.body;
      user.findOrCreate({
        where: {
          email: data.email
        },
        defaults: { 
          email: data.email, /////////////////
          password: data.password, /////////////////
          nickname: data.nickname,
        },
      })
        .then(async ([result, created]) => {
          if (!created) {
            res.status(409).send("This email is already exists");
          } else {
            console.log(`admin: 회원가입 신청정보입니다.`);
            console.log(result.dataValues); //React는 dataValues에 저장
            console.log(`-----------------------`);
            await res.status(201).send({result:result.dataValues.id});
          }
        })
    }
  },
  

  signOutController: (req, res) => {
    //로그아웃 요청 및 응답
    // 유저가 로그아웃했을 때, session 정보를 destroy
    // 분기 축소 예정
    if(req){
      req.session.destroy();
      res.status(205).send("Logged out successfully");
    }

    
  },

  historyAddController: (req,res) =>{
    //
    //models.sequelize.transaction
    /*
    history.create({
      where: {
        id: req.session.userid
      },
      defaults: { 
        email: data.email, /////////////////
        password: data.password, /////////////////
        nickname: data.nickname,
      },
    })
    */

    //
  },
  //API 확정에 따른 simple destroy all로 변경
  //add개발이 완료되면 single delete API 추가예정
  historyDelController: (req,res) =>{
    /*
    if(req.param('action') ===clear){
      // localhost:3000/history?action=clear
      //
    }
    */
    history.destroy({
      where:{
        user_id: req.session.userid
      }

    })
    .then(result=>{
      console.log(result);
      res.status(200).send(`deleted`);
      /*
      if(!result){
        res.status(200).send(`deleted`);
      }
      else{
        res.status(404).send('there is no data');
      }
      */
    })
    .catch(err=>console.log(err));

  },
  /*
  redirect: async function (req, res) {
    //const { url } = req.body;
    let result = await ???.findOne({ //req.body에서 뽑아내지 말고 client에서 요청 받은 url에서 받아서 사용
      where:{id:req.params.id}
    });
    await result.increment('');
    res.status(302).redirect(result.???);
    //res.redirect('/');

  },

  */

};
