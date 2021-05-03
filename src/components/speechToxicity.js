require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');

let identifier = ["identity_attack","insult","sexual_explicit","threat","toxicity"]

let toxicityClassification = (threshold,speech) => {
    toxicity.load(threshold, identifier).then(model => {
        console.log(speech)
        model.classify(speech).then(predictions => {
            console.log(predictions)
        })
    })
}

export {toxicityClassification}
