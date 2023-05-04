// Route/ Branches.js
// /branches
// /branches/:branchID
// /branches/:branchID/counters #展示所有counter
// /branches/:branchID/counters/: countersID #展示当前counter

// /branches/:branchID/bizQueue
// /branches/:branchID/bizQueue/push 
// /branches/:branchID/bizQueue/insert #取号


var express = require('express');
var CallNumber = require('../data/counterCall');
var router = express.Router();
var dataengine = require('../data/dataset');


// /branches
const getbranch  = function(req,res,next){
    console.log('get all branches id and name')
    const result =dataengine.getBranch()
    console.log(result)
    res.json(result)

}
router.get('',getbranch)

// /branches/:branchID
const getbranchinfo  = function(req,res,next){
    console.log(`Get a branch${req.params.branchID}'s infomation`)
    const result =dataengine.getbranchinfo(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID',getbranchinfo)

// /branches/:branchID/counters #展示所有counter
const showallcounter  = function(req,res,next){
    console.log(`get branch${req.params.branchID}'s all counter infomation`)
    const result =dataengine.showallcounter(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/counters',showallcounter)

// /branches/:branchID/counters/:countersID #当前counter叫一个号
const countercall = function(req,res,next){
    console.log(`branch${req.params.branchID}'s counter${req.params.countersID} call a client`)
    // console.log(dataengine.showallcounter(req.params.branchID))
    const result = dataengine.countercall(req.params.branchID,req.params.countersID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/counters/:countersID',countercall)



// /branches/:branchID/reschedule #
const reschedule = function(req,res,next){
    
    const result = dataengine.reschedule(req.params.branchID,req.params.originalID)//originalID需要传进来,能够实现
    console.log(result)
    res.json(result)
}
router.get('/:branchID/reschedule/:originalID',reschedule)

// /branches/:branchID/missingQueue
const missingQueue= function(req,res,next){
    
    const result = dataengine.missingQueue(req.params.branchID)//originalID需要传进来,能够实现
    console.log(result)
    res.json(result)
}
router.get('/:branchID/missingQueue',missingQueue)

// /branches/:branchID/bizQueue
const getbizq = function(req,res,next){
    console.log(`get${req.params.branchID} bizqueue infomation`)
    const result = dataengine.getbizq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/bizQueue',getbizq)

// /branches/:branchID/bizQueue/push 
const pushbizq = function(req,res,next){
    console.log(`push a data to business queue of branch${req.params.branchID}`)
    const result = dataengine.pushbizq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/bizQueue/push',pushbizq)

// /branches/:branchID/bizQueue/insert #从business queue里面shift出来一个号
const shiftbizq = function(req,res,next){
    console.log(`shift a data from business queue of branch${req.params.branchID}`)
    const result = dataengine.shiftbizq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/bizQueue/insert',shiftbizq)



////////////////////////////////////////////////////////
// /branches/:branchID/priQueue
const getpriq = function(req,res,next){
    console.log(`get branch ${req.params.branchID}'s priqueue infomation`)
    const result = dataengine.getpriq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/priQueue',getpriq)

// /branches/:branchID/priQueue/push 
const pushpriq = function(req,res,next){
    console.log(`push a data to private queue of branch${req.params.branchID}`)
    const result = dataengine.pushpriq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/priQueue/push',pushpriq)

// /branches/:branchID/priQueue/insert #从business queue里面shift出来一个号
const shiftpriq = function(req,res,next){
    console.log(`Shift a data from branch${req.params.branchID}'s private queue`)
    const result = dataengine.shiftpriq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/priQueue/insert',shiftpriq)





////////////////////////////////////////////////////////
// /branches/:branchID/senQueue
const getsenq = function(req,res,next){
    console.log(`get branch${req.params.branchID}'s senqueue infomation`)
    const result = dataengine.getsenq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/senQueue',getsenq)

// /branches/:branchID/priQueue/push 
const pushsenq = function(req,res,next){
    console.log(`Push a data to branch${req.params.branchID}'s senior queue`)
    const result = dataengine.pushsenq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/senQueue/push',pushsenq)

// /branches/:branchID/senQueue/insert #从business queue里面shift出来一个号
const shiftsenq = function(req,res,next){
    console.log(`Shift a data from branch${req.params.branchID}'s senior queue`)
    const result = dataengine.shiftsenq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/senQueue/insert',shiftsenq)


// /branches/:branchID/senQueue/stop
const stopsenq = function(req,res,next){
    console.log(`stop ${req.params.branchID}'s senior queue`)
    const result = dataengine.stopsenq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/senQueue/stop',stopsenq)

// /branches/:branchID/priQueue/stop
const stoppriq = function(req,res,next){
    console.log(`stop ${req.params.branchID}'s private queue`)
    const result = dataengine.stoppriq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/priQueue/stop',stoppriq)

// /branches/:branchID/bizQueue/stop
const stopbizq = function(req,res,next){
    console.log(`stop ${req.params.branchID}'s business queue`)
    const result = dataengine.stopbizq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/bizQueue/stop',stopbizq)

// /branches/:branchID/senQueue/start
const startsenq = function(req,res,next){
    console.log(`start ${req.params.branchID}'s senior queue`)
    const result = dataengine.startsenq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/senQueue/start',startsenq)

// /branches/:branchID/priQueue/start
const startpriq = function(req,res,next){
    console.log(`start ${req.params.branchID}'s private queue`)
    const result = dataengine.startpriq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/priQueue/start',startpriq)

// /branches/:branchID/bizQueue/start
const startbizq = function(req,res,next){
    console.log(`start ${req.params.branchID}'s business queue`)
    const result = dataengine.startbizq(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/bizQueue/start',startbizq)

// /branches/:branchID/nowserving
const nowserving=function(req,res,next){
    console.log(`get ${req.params.branchID}'s nowserving and toserving data`)
    const result = dataengine.nowServing(req.params.branchID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/nowserving',nowserving)
module.exports = router;


//set type
// branches/setTypeP/counter/:branchID/:counterID
const setTypeP = function(req,res,next){
    console.log("the current type is private")
    const result = dataengine.setTypeP(req.params.branchID,req.params.counterID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/setTypeP/counter/:counterID',setTypeP)


//branches/setTypeB/counter/:branchID/:counterID
const setTypeB = function(req,res,next){
    console.log("the current type is private")
    const result = dataengine.setTypeB(req.params.branchID,req.params.counterID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/setTypeB/counter/:counterID',setTypeB)


//branches/:branchID/setTypeS/counter/:counterID
const setTypeS = function(req,res,next){
    console.log("the current type is senior")
    console.log("the id is ",req.params.branchID,req.params.counterID)
    const result = dataengine.setTypeS(req.params.branchID,req.params.counterID)
    console.log(result)
    res.json(result)
}
router.get('/:branchID/setTypeS/counter/:counterID',setTypeS)
