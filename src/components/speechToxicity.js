require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');
import store from '@/store'

let identifier = ["identity_attack","insult","sexual_explicit","threat","toxicity"]

let toxicityClassification = (threshold,speech) => {
    toxicity.load(threshold, identifier).then(model => {
        console.log(speech)
        model.classify(speech).then(predictions => {
            console.log(predictions)

            // Identity Attack Identifier
            if(!predictions[0].results[0].match){
                if(predictions[0].results[0].probabilities[1] > 0.1){
                   store.commit('updateIdentityAttackFlag',true)
                }else{
                    store.commit('updateIdentityAttackFlag',false)
                }
            }else{
                store.commit('updateIdentityAttackFlag',predictions[0].results[0].match)
            }

            // Insult Identifier
            if(!predictions[1].results[0].match){
                if(predictions[1].results[0].probabilities[1] > 0.1){
                    store.commit('updateInsultFlag',true)
                }
                else{
                    store.commit('updateInsultFlag',false)
                }
            }else{
                store.commit('updateInsultFlag',predictions[1].results[0].match)
            }


            // Sexual Explicit Identifier
            if(!predictions[2].results[0].match){
                if(predictions[2].results[0].probabilities[1] > 0.1){
                    store.commit('updateSexualExplicitFlag',true)
                }
                else{
                    store.commit('updateSexualExplicitFlag',false)
                }
            }else{
                store.commit('updateSexualExplicitFlag',predictions[2].results[0].match)
            }

            // Threat Identifier
            if(!predictions[3].results[0].match){
                if(predictions[3].results[0].probabilities[1] > 0.1){
                    store.commit('updateThreatFlag',true)
                }
                else{
                    store.commit('updateThreatFlag',false)
                }
            }else{
                store.commit('updateThreatFlag',predictions[3].results[0].match)
            }

            // Toxicity Identifier
            if(!predictions[4].results[0].match){
                if(predictions[4].results[0].probabilities[1] > 0.1){
                    store.commit('updateToxicityFlag',true)
                }
                else{
                    store.commit('updateToxicityFlag',false)
                }
            }else{
                store.commit('updateToxicityFlag',predictions[4].results[0].match)
            }
        })
    })
}

export {toxicityClassification}
