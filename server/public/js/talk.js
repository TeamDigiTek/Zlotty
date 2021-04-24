// !!Største delen af denne kode er fra "https://teachablemachine.withgoogle.com".
// !!Vores kode ligger inde i recognizer.listen funktionen.

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/hTSO5lj1U/";

async function createModel() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        checkpointURL,
        metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}

async function init() {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    const labelContainer = document.getElementById("label-container");
    for (let i = 0; i < classLabels.length; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(result => {

        // !! START - Vores kode!!
        // For at tilgår modellens data, bliver vi nød til at tilgå resultaterne direkte.
        // Samtidig bliver vi nød til at sikre os at vi kun tager den værdi kan siges at være den mest præcise.
        // Derfor tager vi kun de resultater hvor scoren er over 0.75.
        // Når dette er fundet, så finder vi index af svaret i results for at få hvilket ord modellen opfangede.
        let word = result.scores.find(element => element > 0.75)
        let index = result.scores.indexOf(word)

        // Inde i konsollen kan du se hvilket index modellen opfangede.
        // For hjælp til hvilket index er hvilket ord. Tjek readme filen.
        console.log(index)

        // Swtich-case statement til at bestemme hvilket tal der skal sendes til Arduinoen.
        let data;
        if (index === 0) {
            data = 0
            console.log("Case 0")
        }else if (index === 1) {
            data = 1
            console.log("Case 1")
        }else if (index === 2) {
            data = 2
            console.log("Case 2")
        }else if (index === 3) {
            data = 3
            console.log("Case 3")
        }else if (index === 4) {
            data = 4
            console.log("Case 4")
        }else if (index === 5) {
            data = 5
            console.log("Case 5")
        }else if (index === 6) {
            data = 6
            console.log("Case 6")
        }else if (index === 7) {
            data = 7
            console.log("Case 7")
        }else if (index === 8) {
            data = 8
            console.log("Case 8")
        }

        // Når vi har fundet tallet der er tættest på ordet modellen fangede, så indsæt der her og dan et json object.
        let json = {"sensor": data}

        // Her bruger vi Jquery AJAX til at sende JSON objektet til arduinoTalk så vi kan opdatere værdien i arduinoGet.
        $.ajax({
            url: "https://zlotty.herokuapp.com/arduinoTalk",
            type: "POST",
            data: json
        });
        // !! SLUT - Vores kode!!

        // const scores = result.scores; // probability of prediction for each class
        // // render the probability scores per class
        // for (let i = 0; i < classLabels.length; i++) {
        //     labelContainer.childNodes[i].innerHTML = classLabels[i] + ": " + result.scores[i].toFixed(2);
        // }
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });

    // Stop the recognition in 3 seconds.
    setTimeout(() => recognizer.stopListening(), 3000);
}