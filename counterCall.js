// next button
exports.CallNumber=function (branchID,counterID){
    counterID=counterID-1
    branchID=branchID-1

    //1. get currentID
    // S>B>P
    CounterType = branchs[branchID].branchCounter[counterID].Type  //'B'

    BizQLen=branchs[branchID].businessQueue.length
    SenQLen=branchs[branchID].seniorQueue.length
    PriQLen=branchs[branchID].privateQueue.length

    if (CounterType == "B"){
        if(BizQLen ==0 ){
            if (SenQLen ==0){
                if (PriQLen==0) {
                    branchs[branchID].branchCounter[counterID].currentID = " "
                    CounterType == " "
                }else {
                    branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].privateQueue[0]
                    CounterType = 'P' //Biz为空,优先Senior, Senior也为空就 到private queue取到currentID
                }
            }else{
                branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].seniorQueue[0]
                CounterType = 'S'     //servicetype
            } //Biz为空,优先Senior, 优先Senior 到senior queue取到currentID
        }else{branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].businessQueue[0]}} //Bissness不为空，就到bisiness取currentID
    
    if (CounterType == "S"){
        if(SenQLen ==0 ){
            if (BizQLen ==0){
                if(PriQLen==0){
                    branchs[branchID].branchCounter[counterID].currentID = " "
                    CounterType == " "//Senior空,优先Biz, Biz也为空就 到private queue取到currentID
                }else {
                    branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].privateQueue[0]
                    CounterType == "P" //Senior空,优先Biz, Biz也为空就 到private queue取到currentID
                }
                branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].privateQueue[0]
                CounterType == "P" //Senior空,优先Biz, Biz也为空就 到private queue取到currentID
            }else{
                branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].businessQueue[0]
                CounterType = 'B'
            } //Senior空，优先Biz, Biz不为空, 到Biz queue取到currentID
        }else{branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].seniorQueue[0]}} //Bissness不为空，就到bisiness取currentID
        

    if (CounterType == "P"){
        if(PriQLen ==0 ){
            if (SenQLen ==0){
                if(BizQLen==0){
                    branchs[branchID].branchCounter[counterID].currentID = " "
                    CounterType == " "//pri为空，优先senior,senior也为空，到biz取currentID
                }else {
                    branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].businessQueue[0]
                    CounterType == "S" //pri为空，优先senior,senior也为空，到biz取currentID
                }
            }else{
                branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].businessQueue[0]
                CounterType == "B"
            } //pri为空，优先senior,senior不为空，到senior取currentID
        }else{branchs[branchID].branchCounter[counterID].currentID = branchs[branchID].seniorQueue[0]}} //pri不为空，到private取currentID

        
    //2. we see whether we need to call a missing queue, compare the currentID and rescheduleID
    // console.log(branchs[branchID].missingQueue)
    originalID = 0
    for (var i=0;i < branchs[branchID].missingQueue.length;i++){ 
        if (branchs[branchID].missingQueue[i][1]==branchs[branchID].branchCounter[counterID].currentID){

            originalID =branchs[branchID].missingQueue[i][0] //originalID
            branchs[branchID].missingQueue.splice(i,1)
            branchs[branchID].branchCounter[counterID].counterServing="*"+ originalID
            // send
            console.log("missingQueue is working",originalID+"Please go to"+counterID)
            break
        }
    }

    //3. if we donot need to call a missing queue, we call the currentID
    if (!originalID) {     //如果orginalID还是0的话，说明missingQueue没有被执行，就直接执行
        // send
        console.log("Normal Queue is woring", branchs[branchID].branchCounter[counterID].currentID + "Please go to"+counterID)
        if (CounterType == "B"){branchs[branchID].branchCounter[counterID].counterServing=branchs[branchID].businessQueue.shift()}
        if (CounterType == "P"){branchs[branchID].branchCounter[counterID].counterServing=branchs[branchID].privateQueue.shift()}
        if (CounterType == "S"){branchs[branchID].branchCounter[counterID].counterServing=branchs[branchID].seniorQueue.shift()}
        if (CounterType == " "){branchs[branchID].branchCounter[counterID].counterServing=" "}
    } 
}


