status="";
input_text="";
objects=[];

function setup(){
    canvas=createCanvas(510,380);
    canvas.position(510,250);
    video=createCapture(VIDEO);
    video.size=(510,380);
    video.hide()
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    input_text=document.getElementById("input_id").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}

function draw(){
    image(video,0,0,510,380);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            console.log(objects.length);
            fill("#ff0000")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].height);
            noFill()
            stroke("#ff0000")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if (objects[i].label == input_text){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text + "Found";
                var synth = window.speechSynthesis
                var tterThis = new SpeechSynthesisUtterance(input_text + "found")
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input_text + "Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}