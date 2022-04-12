
<script>
//import axios from 'axios';
//import {AdaptorFileCreator} from "./adaptorFileCreator";
import {getData} from "./backendAPI";

let trans = "";
let suggest = "";
let filePath ="";
//const adaptor = AdaptorFileCreator()

function microphoneOnAndOff(e) {

      var x = document.getElementsByClassName("outline")[0];
      if (x.style.display === "none") {
        x.style.display = "block";
      } 
      setTimeout(()=>{
        x.style.display = "none"
      },4000);

  ;(async () => {
    try {
      // const response = await axios.get('http://localhost:8080/begin-pipeline');
      const response = await getData();
      console.log(response.transcription);

      // filePath = response.data.code_modification[0].file

      // var finalFilePath = filePath.replace(/\\/g, "/");

      //console.log("Correct file path - " + finalFilePath);

     //adaptor.createFolderUsingAdapter(finalFilePath);

      trans = response.transcription;
    } catch (error) {
      console.error(error);
    }
  })()
}
</script>
<div class="box">
  <h1 style="text-align:center; font-family:American Typewriter, serif;"> - V e n i c - </h1>
  <br/><br/><br/><br/>
    <div class="object">
           <div class="outline" style="display: none;"></div>
           <div class="outline" id="delayed" style="display: none;"></div>
           <div class="buttonStyle"></div>
           <div class="buttonStyle" id="circlein" on:click={microphoneOnAndOff}>
                  <svg class="mic-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" style="fill:#1E2D70">
                    <g><path d="M500,683.8c84.6,0,153.1-68.6,153.1-153.1V163.1C653.1,78.6,584.6,10,500,10c-84.6,0-153.1,68.6-153.1,153.1v367.5C346.9,615.2,415.4,683.8,500,683.8z M714.4,438.8v91.9C714.4,649,618.4,745,500,745c-118.4,0-214.4-96-214.4-214.4v-91.9h-61.3v91.9c0,141.9,107.2,258.7,245,273.9v124.2H346.9V990h306.3v-61.3H530.6V804.5c137.8-15.2,245-132.1,245-273.9v-91.9H714.4z"/></g>
                  </svg>
           </div>
    </div> 

    <div class="button1">
      <button class="btn-hover color-9"> {trans} </button>
    </div>
  
    <div class="button2">
        <button class="btn-hover color-10">{trans}</button>
    </div>

    <div class="button3">
        <button class="btn-hover color-11">{trans} </button>
    </div>

</div>

  

