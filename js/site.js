let worker = new Worker('js/studio_worker.js');

worker.addEventListener('message', function(e) {
    if(typeof e.data =='object'){
        dataPARSE(e.data[0],e.data[1]);
        let studio = $("#nav li a.active")[0].attributes[2].value;
        studio = studio.replace("#","");
        if(e.data[0] == studio){
            askWorker(true);
        }
    }else{
        //console.log('Worker said: ', e.data);
    }
}, false);
function askWorker(delay=false){
    let studio = $("#nav li a.active")[0].attributes[2].value;
    studio = studio.replace("#","");
    //console.log([studio,delay]);
    worker.postMessage([studio,delay]);
}

function setStatus(studio, type, level, percentage, people=0, maxpeople=0) {
    switch(level){
        case "CLOSED":
            $("#"+studio+"_level_"+type).removeClass("alert-info alert-warning alert-danger alert-secondary").addClass("alert-secondary").text("CLOSED");
            $("#"+studio+"_percentage_"+type).removeClass("bg-info bg-warning bg-danger bg-secondary").addClass("bg-secondary");
            break;
        case "LOW":
            $("#"+studio+"_level_"+type).removeClass("alert-info alert-warning alert-danger alert-secondary").addClass("alert-info").text("low utilization\n");
            $("#"+studio+"_percentage_"+type).removeClass("bg-info bg-warning bg-danger bg-secondary").addClass("bg-info");
            break;
        case "NORMAL":
            $("#"+studio+"_level_"+type).removeClass("alert-info alert-warning alert-danger alert-secondary").addClass("alert-warning").text("average utilization\n");
            $("#"+studio+"_percentage_"+type).removeClass("bg-info bg-warning bg-danger bg-secondary").addClass("bg-warning");
            break;
        case "HIGH":
            $("#"+studio+"_level_"+type).removeClass("alert-info alert-warning alert-danger alert-secondary").addClass("alert-danger").text("Corona Party");
            $("#"+studio+"_percentage_"+type).removeClass("bg-info bg-warning bg-danger bg-secondary").addClass("bg-danger");
            break;
    }
    $("#"+studio+"_percentage_"+type).css("width", percentage+"%").attr("aria-valuenow", percentage).text(percentage+"% "+people+"/"+maxpeople);
}

function dataPARSE(studio,json){
    $.each(json.items, function(i, key){
        if(key.isCurrent == true){
            //{"startTime":"06:00:00","endTime":"00:00:00","items":[{"startTime":"06:00:00","endTime":"07:00:00","percentage":3,"level":"LOW","isCurrent":false},{"startTime":"07:00:00","endTime":"08:00:00","percentage":8,"level":"LOW","isCurrent":false},{"startTime":"08:00:00","endTime":"09:00:00","percentage":13,"level":"LOW","isCurrent":false},{"startTime":"09:00:00","endTime":"10:00:00","percentage":20,"level":"LOW","isCurrent":false},{"startTime":"10:00:00","endTime":"11:00:00","percentage":30,"level":"LOW","isCurrent":false},{"startTime":"11:00:00","endTime":"12:00:00","percentage":31,"level":"LOW","isCurrent":false},{"startTime":"12:00:00","endTime":"13:00:00","percentage":29,"level":"LOW","isCurrent":false},{"startTime":"13:00:00","endTime":"14:00:00","percentage":37,"level":"LOW","isCurrent":false},{"startTime":"14:00:00","endTime":"15:00:00","percentage":40,"level":"LOW","isCurrent":false},{"startTime":"15:00:00","endTime":"16:00:00","percentage":37,"level":"LOW","isCurrent":true},{"startTime":"16:00:00","endTime":"17:00:00","percentage":0,"level":"LOW","isCurrent":false},{"startTime":"17:00:00","endTime":"18:00:00","percentage":0,"level":"LOW","isCurrent":false},{"startTime":"18:00:00","endTime":"19:00:00","percentage":0,"level":"LOW","isCurrent":false},{"startTime":"19:00:00","endTime":"20:00:00","percentage":0,"level":"LOW","isCurrent":false},{"startTime":"20:00:00","endTime":"21:00:00","percentage":0,"level":"LOW","isCurrent":false},{"startTime":"21:00:00","endTime":"22:00:00","percentage":0,"level":"LOW","isCurrent":false},{"startTime":"22:00:00","endTime":"23:00:00","percentage":0,"level":"LOW","isCurrent":false},{"startTime":"23:00:00","endTime":"00:00:00","percentage":0,"level":"LOW","isCurrent":false}]}
            /*console.log(key.level);
            console.log(key.percentage)*/
            let maxpeople, currentpeople, realmax, feelpercentage, feellevel;
            switch(studio){
                case "john":
                    maxpeople = 150;
                    realmax = 90;
                    currentpeople = Math.round(maxpeople/100 * key.percentage);
                    feelpercentage = Math.round(100/realmax * currentpeople);
                    if (feelpercentage >= 100){
                        feelpercentage = 100;
                    }
                    if(feelpercentage < 40){
                        feellevel = "LOW";
                    }else if(feelpercentage <80){
                        feellevel = "NORMAL";
                    }else{
                        feellevel = "HIGH";
                    }
                    setStatus(studio,"org", key.level, key.percentage, currentpeople, maxpeople);
                    setStatus(studio,"feel", feellevel, feelpercentage, currentpeople, realmax);
                    break;
                case "mcfit":
                    maxpeople = 150;
                    realmax = 100;
                    currentpeople = Math.round(maxpeople/100 * key.percentage);
                    feelpercentage = Math.round(100/realmax * currentpeople);
                    if (feelpercentage >= 100){
                        feelpercentage = 100;
                    }
                    if(feelpercentage < 40){
                        feellevel = "LOW";
                    }else if(feelpercentage <80){
                        feellevel = "NORMAL";
                    }else{
                        feellevel = "HIGH";
                    }
                    setStatus(studio,"org", key.level, key.percentage, currentpeople, maxpeople);
                    setStatus(studio,"feel", feellevel, feelpercentage, currentpeople, realmax);
                    break;
            }
            return false;
        }
        setStatus(studio,"org", "CLOSED", 0);
        setStatus(studio,"feel", "CLOSED", 0);
    })
}
askWorker();

$('#nav').on('shown.bs.tab', function (e) {
    askWorker();
})