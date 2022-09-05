harrypotter_theme = "";
avengers_theme = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
variable_song = "";
function preload(){
    harrypotter_theme = loadSound("Hedwigs_Theme.mp3");
    avengers_theme = loadSound("Avengers_Theme.mp3");
}
function setup(){
    canvas = createCanvas(550, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("posenet is initialized .");
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    
    hp_status = harrypotter_theme.isPlaying();
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        avengers_theme.stop();
        if(hp_status == false){
            harrypotter_theme.play();
            document.getElementById("song_name").value = "Hedwig's Theme";
        }
    }

    av_status = avengers_theme.isPlaying();
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        harrypotter_theme.stop();
        if(av_status == false){
            avengers_theme.play();
            document.getElementById("song_name").value = "Avengers' Theme";
        }
    }
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score right wrist = " + scoreLeftWrist)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left - "+leftWristX + ", " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right - " + rightWristX + ", " + rightWristY);
    }
}