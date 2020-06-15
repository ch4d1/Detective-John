self.addEventListener('message', function(e) {
    start(e.data[0],e.data[1]);
}, false);

function getData(studio,url) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let res = new Array(studio, JSON.parse(this.responseText));
            self.postMessage(res);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function start(studio,delay){
    if(delay){
        getData(studio,"../get_json.php?f="+studio+"&s=1");
    }else{
        getData(studio,"../get_json.php?f="+studio);
    }
}


