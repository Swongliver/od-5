status1="";
objects=[];
function preload(){
  

}
function setup(){
canvas=createCanvas(400,400)
canvas.position(480,175)
video=createCapture(VIDEO)
video.hide()
objectDetector=ml5.objectDetector("cocossd", modelLoaded)
document.getElementById("detect_status").innerHTML="Status: Detecting Objects"
}
function modelLoaded(){
    status1=true
    console.log('model is loaded')
    objectDetector.detect(video, gotResult)
}
function draw(){
    image(video, 0,0,400,400)
    
    if (status1 != "") {
        document.getElementById("detect_status").innerHTML="Status: Objects Detected"
        
        for ( i=0 ;i < objects.length; i++) {
            fill("red")   
            percentage=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percentage+"%",objects[i].x, objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)         
        }
    }
    
}
function gotResult(error,results){
    if (error) {
        console.log(error)
    }else{
console.log(results)
objects=results;
document.getElementById("detect_objects_status").innerHTML="Number of objects detected:"+objects.length
    }
}