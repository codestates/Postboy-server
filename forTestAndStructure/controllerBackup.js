//import Model from "../models/init-models";
const { Models } = require("../models/init-models");
//const models = Models(sequelize);
const { request } = require("../models");
const { user } = require("../models");
const { history } = require("../models");
//const { init-models } = require("../models");

module.exports = {
  
  /*
  testCon1: (req,res) =>{
    let resData = {
      id: '',
      email: '',
      password: '',
      nickname: '',
      createdAt: '',
      updatedAt: '',
    };
    user.findOne({
      where:{
        email:req.body.email,
        password:req.body.password
      },
    }
    )
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
              password: result.password,
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
  testCon2: (req,res) =>{

  },
  testCon3: (req,res) =>{

  },
  */

  signInController2: (req,res) =>{
    
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
          
          let mysql = require('mysql2');
          let connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'0000',
            port:3306,
            database:'first',
          });
          connection.connect();
          //let data = req.body;
          let user_id = req.session.userid;//req.session.userid;
          /*
          select h.request_id , h.status, h.type, h.createdAt, r.url, r.methodType
          from history AS h
          left JOIN request AS r
          ON h.request_id=h.user_id
          where h.user_id=${user_id}
          group by h.request_id
          ;
          */
          //MySQL 설정까지 바꿔줘야 한다
          //SET @@SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
          //원래 상태 첨부:  SET @@SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
                  password: result.password,
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

    /*  //각기 다른 모델 조인  //////////////////fail
    user.findAll({
      include: [
        {model: request, include: [ //as: 'request',
          {model: history}
        ]}
      ]
    }).then(users => {
      console.log(JSON.stringify(users));
    });
    */
/*
`select u.id, u.email, u.password, u.nickname, u.createdAt, u.updatedAt, h.createdAt AS historyCreatedAt, h.status, r.url, r.methodType
from user AS u, history AS h, request AS r
where u.id=? AND h.user_id=? AND r.id=?
;`
*/

    /*
    //GET 요청 테스트 - 작동됨 확인
    let data = req.body;
    //console.log(req);
    let resData = {
      id:'',email:'',password:'',nickname:'',createdAt:'',updatedAt:'',historyCreatedAt:'',requestUrl:'',requestMethodType:'',historyStatus:''
    };

    user.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
      .then(result => {
          console.log('response');
          req.session.userid = result.id;

          
          resData.id= result.id,
          resData.email= result.email,
          resData.password= result.password,
          resData.nickname= result.password,
          resData.createdAt= result.createdAt,
          resData.updatedAt= result.updatedAt,
          
          res.status(200).send('user query fin');

      });
    
    history.findAll({
      where: {user_id: resData.id}
    })
    .then(result=>{
      console.log('response');
        resData.type= result.type,
        resData.status= result.status,
      
      res.status(200).send('history query fin');

    });
    
    res.status(201).send(resData);
    */

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
              password: result.password,
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

  historyAddController: (req,res) =>{
    //
    models.sequelize.transaction
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
                  
        let mysql = require('mysql2');
        let connection = mysql.createConnection({
          host:'localhost',
          user:'root',
          password:'0000',
          port:3306,
          database:'first',
        });
        connection.connect();
        //let data = req.body;
        let user_id = req.session.userid;//req.session.userid;
        /*
        select h.request_id , h.status, h.type, h.createdAt, r.url, r.methodType
        from history AS h
        left JOIN request AS r
        ON h.request_id=h.user_id
        where h.user_id=${user_id}
        group by h.request_id
        ;
        */
        //MySQL 설정까지 바꿔줘야 한다
        //SET @@SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
        //원래 상태 첨부:  SET @@SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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



};
