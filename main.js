objects=[]
function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocoSSD',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}
function modelLoaded() {
    console.log("modelLoaded");
    status=true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function preload() {
    song=loadSound("intruder_alert.mp3");
}
function draw() {
    image(video,0,0,380,380);
    if(status!= "") {
        for(i = 0; i < objects.length; i++) {
            song.play();
            document.getElementById("status").innerHTML="Status: object detected";
            document.getElementById("baby").innerHTML="Baby not found";
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    else {
        document.getElementById("status").innerHTML="Status: object detected";
        document.getElementById("baby").innerHTML="Baby found";
    }
}