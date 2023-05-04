// blog.js文件

// var branchs = [
// 	{"branchID":1, "branchName":"Jurong East","branchCounter":[{'counterID':1,'counterServing':'','type':''},{'counterID':2,'counterServing':'','type':''}],"businessQueue":["B-1","B-2","B-3"],
//     "privateQueue":["P-1","P-2","P-3"],"seniorQueue":["S-1","S-2","S-3"],'missingQueue':[],'status':[]} ,
// 	{"branchID":2, "branchName":"Jurong East","branchCounter":[{'counterID':1,'counterServing':'','type':''},{'counterID':2,'counterServing':'','type':''}],"businessQueue":["B-1","B-2","B-3"],
//         "privateQueue":["P-1","P-2","P-3"],"seniorQueue":["S-1","S-2","S-3"],'missingQueue':[],'status':[]}	
// ]

//实现通过读取json文件进行数据的初始化
const callfun=require('./counterCall')
const fs = require('fs');
exports.initdata = function(path){
	fs.readFile(path, 'utf-8', (err, data) => {
		if (err) {
		  console.error(err);
		  return;
		}
		branchs = JSON.parse(data);
		// Do something with the JSON data
	  });
}
exports.savedata = function(path){
	fs.writeFile(path, JSON.stringify(branchs), (err) => {
		if (err) {
		console.error(err);
		return;
		}
		console.log('Data saved to data.json');
	});
}
exports.emptydata= function(emptpath,topath){
 fs.readFile(emptpath, (err, data) => {
  if (err) throw err;

  fs.writeFile(topath, data, (err) => {
    if (err) throw err;
    console.log('Data overwritten successfully.');
  });
});
}

// Route/ Branches.js
// /branches
// /branches/:branchID
// /branches/:branchID/counters #展示所有counter
// /branches/:branchID/counters/: countersID #展示当前counter

// /branches/:branchID/bizQueue
// /branches/:branchID/bizQueue/push 
// /branches/:branchID/bizQueue/insert #取号

// /branches 返回所有的branche
exports.getBranch = function (){
	var result=[]
    for(var i=0; i < branchs.length; i++){
		result.push(branchs[i].branchID,branchs[i].branchName)
    }
	return result
}

// /branches/:branchID
exports.getbranchinfo = function (id){
   for(var i=0; i < branchs.length; i++){
      if(branchs[i].branchID == id) return branchs[i];
   }
}

// /branches/:branchID/counters #展示所有counter
getbranchinfo = function (id){
	for(var i=0; i < branchs.length; i++){
	   if(branchs[i].branchID == id) return branchs[i];
	}
 }
exports.showallcounter = function(id){
	var brinfo=getbranchinfo(id)
	return brinfo.branchCounter
}

// /branches/:branchID/counters/: countersID #当前counter叫一个号
const clientassign = function(branchID,counterID){
	for(var i=0; i < branchs.length; i++){
		if(branchs[i].branchID == branchID) {branchindex=i};
	 }
	for(var i=0; i < branchs[branchindex].branchCounter.length; i++){
		if(branchs[branchindex].branchCounter[i].counterID == counterID) {counterindex=i};
	}
	// if (parseInt(branchs[branchindex].businessQueue[0].substr(2), 10)<=parseInt(branchs[branchindex].privateQueue[0].substr(2), 10)){
	// 	var displayTicket1 = branchs[branchindex].businessQueue.shift()
	// 	branchs[branchindex].branchCounter[counterindex].counterServing=displayTicket1
	// }else if


	if(branchs[branchindex].businessQueue.length > 0) { 
		var displayTicket1 = branchs[branchindex].businessQueue.shift()
		branchs[branchindex].branchCounter[counterindex].counterServing=displayTicket1
	} else if(branchs[branchindex].privateQueue.length > 0) {
		var displayTicket1 = branchs[branchindex].privateQueue.shift()
		branchs[branchindex].branchCounter[counterindex].counterServing=displayTicket1
	} else if(branchs[branchindex].seniorQueue.length > 0) {
		var displayTicket1 = branchs[branchindex].seniorQueue.shift()
		branchs[branchindex].branchCounter[counterindex].counterServing=displayTicket1
	} else {
		console.log('No one in this branch')
	}
	return branchs[branchindex]

}

exports.countercall = function(branchid,countersID){
	callfun.CallNumber(branchid,countersID)
	getbranchinfo(branchid).nowserve.shift()
	getbranchinfo(branchid).nowserve.push({"counterID":countersID,"servenumber": getbranchinfo(branchid).branchCounter[countersID-1].counterServing})
	return getbranchinfo(branchid).branchCounter[countersID-1].counterServing
}

// exports.counterskip = function(branchid,countersID){
// 	callfun.SkipID(branchid,countersID)
// 	return getbranchinfo(branchid)
// }

// /branches/:branchID/bizQueue
exports.getbizq = function (id){
	for(var i=0; i < branchs.length; i++){
	   if(branchs[i].branchID == id) return branchs[i].businessQueue;
	}
 }

// /branches/:branchID/bizQueue/push
exports.pushbizq = function (id){
 for(var i=0; i < branchs.length; i++){
    if(branchs[i].branchID == id) {
  // queue++
  if(branchs[i].status.biz==1){
  branchs[i].queuenumber.biznumber=branchs[i].queuenumber.biznumber+1
        branchs[i].businessQueue.push(`B-${branchs[i].queuenumber.biznumber}`)
        return branchs[i].businessQueue;
  }else{return 'This queue is not serving now'}
    }
 	}
 }


// /branches/:branchID/bizQueue/insert #取号
exports.shiftbizq = function (id){
	for(var i=0; i < branchs.length; i++){
	   if(branchs[i].branchID == id) {
		const displayTicket1 = branchs[i].businessQueue.shift()
        return branchs[i];
	   }
	}
 }

/////////////////////////////////////////////////////////////////////////////////////
 // /branches/:branchID/priQueue
exports.getpriq = function (id){
	for(var i=0; i < branchs.length; i++){
	   if(branchs[i].branchID == id) return branchs[i].privateQueue;
	}
 }
 // /branches/:branchID/priQueue/push 


 // /branches/:branchID/priQueue/push
exports.pushpriq = function (id){
 for(var i=0; i < branchs.length; i++){
    if(branchs[i].branchID == id) {
  if (branchs[i].status.pri==1){
   branchs[i].queuenumber.prinumber=branchs[i].queuenumber.prinumber+1
         branchs[i].privateQueue.push(`P-${branchs[i].queuenumber.prinumber}`)
         return branchs[i];
  }else{return 'This queue is not serving now'}
    }
 }
 }
// /branches/:branchID/priQueue/insert #取号
exports.shiftpriq = function (id){
	for(var i=0; i < branchs.length; i++){
	   if(branchs[i].branchID == id) {
		const displayTicket1 = branchs[i].privateQueue.shift()
        return branchs[i];
	   }
	}
 }


/////////////////////////////////////////////////////////////////////////////////////
// /branches/:branchID/senQueue
exports.getsenq = function (id){
	for(var i=0; i < branchs.length; i++){
	   if(branchs[i].branchID == id) return branchs[i].seniorQueue;
	}
 }

 // /branches/:branchID/senQueue/push
exports.pushsenq = function (id){
 for(var i=0; i < branchs.length; i++){
    if(branchs[i].branchID == id) {
  if (branchs[i].status.sen==1){
   branchs[i].queuenumber.senmber=branchs[i].queuenumber.senmber+1
         branchs[i].seniorQueue.push(`S-${branchs[i].queuenumber.senmber}`)
         return branchs[i];
  }else{return 'This queue is not serving now'}
    }
 }
 }


// /branches/:branchID/senQueue/insert #取号
exports.shiftsenq = function (id){
	for(var i=0; i < branchs.length; i++){
	   if(branchs[i].branchID == id) {
		const displayTicket1 = branchs[i].seniorQueue.shift()
        return branchs[i];
	   }
	}
 }

// /branches/:branchID/senQueue/stop
exports.stopsenq = function (id){
	for(var i=0; i < branchs.length; i++){
		if(branchs[i].branchID == id) {
		branchs[i].status.sen=0
		 return branchs[i];
		}
}
}
// /branches/:branchID/priQueue/stop
exports.stoppriq = function (id){
	for(var i=0; i < branchs.length; i++){
		if(branchs[i].branchID == id) {
		branchs[i].status.pri=0
		 return branchs[i];
		}
}
}
// /branches/:branchID/bizQueue/stop
exports.stopbizq = function (id){
	for(var i=0; i < branchs.length; i++){
		if(branchs[i].branchID == id) {
		branchs[i].status.biz=0
		 return branchs[i];
		}
}
}

// /branches/:branchID/senQueue/start
exports.startsenq = function (id){
    for(var i=0; i < branchs.length; i++){
        if(branchs[i].branchID == id) {
        branchs[i].status.sen=1
         return branchs[i];
        }
}
}
// /branches/:branchID/priQueue/start
exports.startpriq = function (id){
    for(var i=0; i < branchs.length; i++){
        if(branchs[i].branchID == id) {
        branchs[i].status.pri=1
         return branchs[i];
        }
}
}
// /branches/:branchID/bizQueue/start
exports.startbizq = function (id){
    for(var i=0; i < branchs.length; i++){
        if(branchs[i].branchID == id) {
        branchs[i].status.biz=1
         return branchs[i];
        }
}
}
// /branches/:branchID/nowserving
const contcatarry = function(queue1,queue2){
 const numElements = 5;
 if(queue1.length<=5){
	 queue2 = queue1.slice(0, numElements).concat(Array(numElements - queue1.length).fill(' '));
 }else {
	 queue2 = queue1.slice(0, numElements)
 }
 return queue2
}
exports.nowServing=function(branchid){

 var toserve={'biztoserve':[],'pritoserve':[],'sentoserve':[]}
 toserve.biztoserve=contcatarry(branchs[branchid-1].businessQueue,toserve.biztoserve)
 toserve.pritoserve=contcatarry(branchs[branchid-1].privateQueue,toserve.pritoserve)
 toserve.sentoserve=contcatarry(branchs[branchid-1].seniorQueue,toserve.sentoserve)
 var result={'nowserve':branchs[branchid-1].nowserve,'toserve':toserve}
 return result
 }



 //reschedule
 getbranchinfo = function (id){
	for(var i=0; i < branchs.length; i++){
	   if(branchs[i].branchID == id) return branchs[i];
	}
 }

exports.missingQueue = function(id){
	var brinfo=getbranchinfo(id)
	return brinfo.missingQueue}

	
exports. reschedule = function(branchID,originalID){

	for(var j=0; j < branchs.length; j++){
		if(branchs[j].branchID == branchID) {

    
    type = originalID[0]
	missingReID = []
	for (let i = 0; i < branchs[j].missingQueue.length; i++) {
		missingReID.push(branchs[j].missingQueue[i][1])
	}

	if(type!='B'&&type!='P'&&type!='S') {

		originalID = "WRONG" 
		recheduleNew = "INPUT"
 
		return [originalID,recheduleNew]

	}else{

    if (type=='B'){

		if (branchs[j].businessQueue.length == 0){
			originalID = "Empty"
			recheduleNew = "BizQue"
			return [originalID,recheduleNew]
			
		}else{
        currentID = branchs[j].businessQueue[0] 
        lastIDinQueue = branchs[j].businessQueue.at(-1)   
		lastNum = parseInt(lastIDinQueue.slice(2))
        rescheduleID = currentID.slice(0,2)+(parseInt(currentID.slice(2))+2)  

		while (missingReID.includes(rescheduleID))
		{rescheduleID = rescheduleID.slice(0,2)+(parseInt(rescheduleID.slice(2))+1)}
		
		if(parseInt(rescheduleID.slice(2)) > parseInt(lastNum)) {
			branchs[j].businessQueue.push(rescheduleID)
			}else{branchs[j].missingQueue.push([originalID,rescheduleID])} 
	}}

    if (type=='P'){

		if (branchs[j].privateQueue.length == 0){
			originalID = "Empty"
			recheduleNew = "PriQue"
			return [originalID,recheduleNew]
		}else{
        currentID = branchs[j].privateQueue[0] //B-1    B-2 
        lastIDinQueue = branchs[j].privateQueue.at(-1)   //B-3    B-3
		lastNum = parseInt(lastIDinQueue.slice(2))
        rescheduleID = currentID.slice(0,2)+(parseInt(currentID.slice(2))+2)  //B-3   B-4

		while (missingReID.includes(rescheduleID))
		{rescheduleID = rescheduleID.slice(0,2)+(parseInt(rescheduleID.slice(2))+1)}
		
		if(parseInt(rescheduleID.slice(2)) > parseInt(lastNum)) {
			branchs[j].privateQueue.push(rescheduleID)
			}else{branchs[j].missingQueue.push([originalID,rescheduleID])} 
    }}


    if (type=='S'){

		if (branchs[j].seniorQueue.length == 0){
			originalID = "Empty"
			recheduleNew = "SenQue"
			return [originalID,recheduleNew]
		}else{
        currentID = branchs[j].seniorQueue[0] //B-1    B-2 
        lastIDinQueue = branchs[j].seniorQueue.at(-1)   //B-3    B-3
		lastNum = parseInt(lastIDinQueue.slice(2))
        rescheduleID = currentID.slice(0,2)+(parseInt(currentID.slice(2))+2)  //B-3   B-4

		while (missingReID.includes(rescheduleID))
		{rescheduleID = rescheduleID.slice(0,2)+(parseInt(rescheduleID.slice(2))+1)}
		
		if(parseInt(rescheduleID.slice(2)) > parseInt(lastNum)) {
			branchs[j].seniorQueue.push(rescheduleID)
			}else{branchs[j].missingQueue.push([originalID,rescheduleID])} 
    }}

	recheduleNew = "*" + originalID
 
	return [originalID,recheduleNew]
	
	}}
}}









 //set counter type
 // /branches/:branchID/setTypeP
exports.setTypeP= function (branchid,counterid){
    for(var i=0; i < branchs.length; i++){
		if(branchs[i].branchID == branchid) { //index=0
		for (var j=0; j < branchs[i].branchCounter.length; j++){
			
			if (branchs[i].branchCounter[j].counterID == counterid){
				branchs[i].branchCounter[j].Type = 'P'
				console.log(branchs[i].branchCounter[j].Type)
				return branchs[i].branchCounter[j].Type
				}
			}
        }
  	}
}

// /branches/:branchID/setTypeB
exports.setTypeB= function (branchid,counterid){
    for(var i=0; i < branchs.length; i++){
		if(branchs[i].branchID == branchid) { //index=0
		for (var j=0; j < branchs[i].branchCounter.length; j++){

			if (branchs[i].branchCounter[j].counterID == counterid){
				branchs[i].branchCounter[j].Type = 'B'
				console.log(branchs[i].branchCounter[j].Type)
				return branchs[i].branchCounter[j].Type
			}
				}
			}
        }
  	}



// /branches/:branchID/setTypeS
exports.setTypeS= function (branchid,counterid){
    for(var i=0; i < branchs.length; i++){
		if(branchs[i].branchID == branchid) { //index=0
		for (var j=0; j < branchs[i].branchCounter.length; j++){

			if (branchs[i].branchCounter[j].counterID == counterid){
				branchs[i].branchCounter[j].Type = 'S'
				console.log(branchs[i].branchCounter[j].Type)
				return branchs[i].branchCounter[j].Type}
			}
		}
	}
}